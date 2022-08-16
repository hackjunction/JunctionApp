const { Auth } = require('@hackjunction/shared')
const DataLoader = require('dataloader')
const Meeting = require('./model')
const PermissionUtils = require('../../utils/permissions')
const Event = require('../event/model')
const UsersController = require('../user-profile/controller')
const {
    createGoogleEvent,
    deleteGoogleEvent,
} = require('../../common/services/google-calendar/google-calendar')

async function batchGetMeetingsByIds(ids) {
    const results = await Meeting.find({
        _id: {
            $in: ids,
        },
    }).lean()
    const resultsMap = results.reduce((map, current) => {
        map[current._id] = current
        return map
    }, {})
    return ids.map(_id => resultsMap[_id] || null)
}

class MeetingContorller {
    constructor(requestingUser, overrideChecks = false) {
        this.requestingUser = requestingUser
        this.overrideChecks = overrideChecks
        this.meetingIdLoader = new DataLoader(batchGetMeetingsByIds)

        this.isChallengePartner =
            overrideChecks ||
            PermissionUtils.userHasPermission(
                requestingUser,
                Auth.Permissions.MANAGE_EVENT,
                // TODO fix this to check for approriate right, ie partner rights
            )
    }

    async getMeetings(eventId, challengeId, from, to) {
        const queryParams = {
            challenge: challengeId,
            event: eventId,
            startTime: { $gte: from, $lt: to },
        }
        return this._clean(Meeting.find(queryParams))
        // {createdAt:{$gte:ISODate("2021-01-01"),$lt:ISODate("2020-05-01"}}
    }

    async create(meeting) {
        if (!(this.isChallengePartner && meeting.event && meeting.challenge))
            return null
        const event = await Event.findOne({ _id: meeting.event })
        if (!(event && event.challenges.length > 0)) return null
        const challenge = event.challenges.find(
            c => c._id.toString() === meeting.challenge,
        )

        if (!(challenge && challenge.partnerEmail)) return null
        const newMeetingSlot = new Meeting({
            event: meeting.event,
            challenge: meeting.challenge,
            organizerEmail: challenge.partnerEmail,
            location: meeting.location || '',
            title:
                meeting.title || `Junction: ${challenge.name} partner meeting`,
            description:
                meeting.description ||
                `Junction: ${challenge.name}\nmeeting between participants and partner, ${challenge.partner}. `,
            attendees: [],
            startTime: meeting.startTime,
            endTime: meeting.endTime,
            timeZone: meeting.timeZone || 'Europe/Helsinki',
        })
        return this._cleanOne(newMeetingSlot.save())
    }

    async bookMeeting(meetingId, attendees) {
        if (!(meetingId && attendees && attendees.length > 0)) return null
        const meetingToBook = await Meeting.findOne({ _id: meetingId })
        // return null if meeting already has attendees (already booked)
        if (meetingToBook.attendees.length !== 0) return null
        const attendeeProfiles = await UsersController.getUserProfiles(
            attendees,
        )

        const googleEvent = {
            title: meetingToBook.title,
            description: meetingToBook.description,
            location: meetingToBook.location,
            start: {
                dateTime: meetingToBook.startTime,
                timeZone: meetingToBook.timeZone,
            },
            end: {
                dateTime: meetingToBook.endTime,
                timeZone: meetingToBook.timeZone,
            },
            attendees: [
                ...attendeeProfiles.map(attendee => ({
                    email: attendee.email,
                    responseStatus: 'needsAction',
                    organizer: false,
                })),
                {
                    email: meetingToBook.organizerEmail,
                    responseStatus: 'needsAction',
                    organizer: true,
                },
            ],
            meetingId,
        }

        // create google calednar event and meets link
        createGoogleEvent(googleEvent)

        return this._cleanOne(
            Meeting.findOneAndUpdate(
                { _id: meetingId },
                { ...meetingToBook.toObject(), attendees },
                { new: true },
            ),
        )
    }

    async cancelMeeting(meetingId) {
        if (!meetingId) return null
        const meetingToCancel = await Meeting.findOne({ _id: meetingId })

        // remove google calendar event
        deleteGoogleEvent(meetingToCancel.googleEventId)
        meetingToCancel.attendees = []
        meetingToCancel.googleEventId = ''
        meetingToCancel.googleMeetLink = ''

        return this._cleanOne(meetingToCancel.save())
    }

    getById(meetingId) {
        return this._clean(this.eventIdLoader.load(meetingId))
    }

    async _clean(promise) {
        const result = await promise
        if (Array.isArray(result)) {
            const results = result.map(item => {
                return this._cleanOne(item)
            })
            return results.filter(item => item !== null)
        }
        return this._cleanOne(result)
    }

    _cleanOne(meeting) {
        if (!meeting) {
            return null
        }
        if (this.isChallengePartner) {
            return meeting
        }
        return meeting
    }
}

module.exports = MeetingContorller
