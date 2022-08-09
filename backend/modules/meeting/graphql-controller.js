const { Auth } = require('@hackjunction/shared')
const DataLoader = require('dataloader')
const Meeting = require('./model')
const PermissionUtils = require('../../utils/permissions')
const Event = require('../event/model')
const UsersController = require('../user-profile/controller')
const {
    createGoogleEvent,
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

    async getMeetings(eventId, challengeId, from, dayRange) {
        const endDate = new Date(from)
        endDate.setDate(endDate.getDate() + dayRange)
        const queryParams = {
            challenge: challengeId,
            event: eventId,
            startTime: { $gte: from, $lt: endDate },
        }
        return this._clean(Meeting.find(queryParams))
        // {createdAt:{$gte:ISODate("2021-01-01"),$lt:ISODate("2020-05-01"}}
    }

    async create(meeting) {
        console.log('\n\nNEW createMeeting REQUEST')
        console.log(meeting)
        console.log('isChallengePartner', this.isChallengePartner)

        if (!(this.isChallengePartner && meeting.event && meeting.challenge))
            return null
        const event = await Event.findOne({ _id: meeting.event })
        console.log('here')
        if (!(event && event.challenges.length > 0)) return null
        console.log('here1')
        const challenge = event.challenges.find(
            c => c._id.toString() === meeting.challenge,
        )
        console.log(challenge)

        if (!(challenge && challenge.partnerEmail)) return null
        console.log('here2')
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
        console.log(meetingToBook)
        // return null if meeting already has attendees (already booked)
        // if (meetingToBook.attendees.length !== 0) return null
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

        console.log('google event to create', googleEvent)
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
