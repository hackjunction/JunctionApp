
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

const updateRoomSlotReservedStatus = async (
    eventId,
    reserved,
    roomName,
    slotStartsAt,
) => {
    try {
        const event = await Event.findById(eventId)
        if (!event) return false
        const roomsClone = [...event.meetingRooms]
        const room = roomsClone.find(r => r.name === roomName)
        const slot = room.timeSlots.find(
            s => s.start.toString() === slotStartsAt.toString(),
        )
        if (room && slot) {
            // fails if we want to reserve the room but it is already reserved
            if (slot.reserved && reserved) return false
            slot.reserved = reserved
            event.meetingRooms = roomsClone
            event.markModified('meetingRooms')
            event.save()
            return true
        }
        return false
    } catch (err) {
        return false
    }
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
                Auth.Permissions.ACCESS_RECRUITMENT
                //Auth.Permissions.MANAGE_EVENT,
                // TODO fix this to check for approriate right, ie partner rights
            )
    }

    async getMeetings(eventId, challengeId, from, to) {
        const queryParams = {
            challenge: challengeId,
            event: eventId,
            startTime: { $gte: from, $lt: to },
        }
        return this._clean(Meeting.find(queryParams).sort({ startTime: 'asc' }))
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

    async deleteMany(meetings) {
        if (!(this.isChallengePartner && meetings.length > 0))
            return { acknowledged: false, deletedCount: 0 }

        meetings.forEach(async meetingId => {
            try {
                const meetingToCancel = await Meeting.findOne({
                    _id: meetingId,
                })
                if (!meetingToCancel) return null
                if (
                    meetingToCancel.location !== 'ONLINE' &&
                    meetingToCancel.location !== ''
                ) {
                    await updateRoomSlotReservedStatus(
                        meetingToCancel.event,
                        false,
                        meetingToCancel.location,
                        meetingToCancel.startTime,
                    )
                }
                if (meetingToCancel.googleEventId) {
                    deleteGoogleEvent(meetingToCancel.googleEventId)
                }
            } catch (err) {
                console.error(
                    `failed to delete googleEvent from meeting: ${meetingId}`,
                )
            }
            return 'useless return, to silence ESLint :D'
        })

        return Meeting.deleteMany({
            _id: {
                $in: meetings,
            },
        })
    }

    async createMany(meetings) {
        if (!(this.isChallengePartner && meetings.length > 0)) return []
        const event = await Event.findOne({ _id: meetings[0].event })
        if (!(event && event.challenges.length > 0)) return []
        const challenge = event.challenges.find(
            c => c._id.toString() === meetings[0].challenge,
        )

        if (!(challenge && challenge.partnerEmail))
            return new Error(
                `unable to find challenge: ${meetings[0].challenge}, or challenge is missing "partnerEmail"`,
            )
        const created = []
        for (let i = 0; i < meetings.length; i++) {
            const meeting = meetings[i]
            // eslint-disable-next-line no-await-in-loop
            const current = await Meeting.findOne({
                challenge: meeting.challenge,
                event: meeting.event,
                startTime: meeting.startTime,
                endTime: meeting.endTime,
            })
            if (!current) {
                const newMeetingSlot = new Meeting({
                    event: meeting.event,
                    challenge: meeting.challenge,
                    organizerEmail: challenge.partnerEmail,
                    location: '',
                    title:
                        meeting.title ||
                        `Junction: ${challenge.name} partner meeting`,
                    description:
                        meeting.description ||
                        `Junction: ${challenge.name}\nmeeting between participants and partner, ${challenge.partner}. `,
                    attendees: [],
                    startTime: meeting.startTime,
                    endTime: meeting.endTime,
                    timeZone: meeting.timeZone || 'Europe/Helsinki',
                })
                try {
                    // eslint-disable-next-line no-await-in-loop
                    await newMeetingSlot.save()
                    created.push(newMeetingSlot)
                } catch (err) {
                    console.log('Error while saving meeting slot', err)
                }
            }
        }
        return created
    }

    async bookMeeting(meetingId, attendees, location = 'ONLINE', partiComment) {
        if (!(meetingId && attendees && attendees.length > 0)) return null
        const meetingToBook = await Meeting.findOne({ _id: meetingId })
        // return null if meeting already has attendees (already booked)
        if (!meetingToBook || meetingToBook.attendees.length !== 0) return null
        const attendeeProfiles = await UsersController.getUserProfiles(
            attendees,
        )

        let roomBookedSuccessfully = false
        if (location !== '' && location !== 'ONLINE') {
            roomBookedSuccessfully = await updateRoomSlotReservedStatus(
                meetingToBook.event,
                true,
                location,
                meetingToBook.startTime,
            )
        }

        const newLocation =
            // eslint-disable-next-line no-nested-ternary
            location === 'ONLINE'
                ? 'ONLINE'
                : roomBookedSuccessfully
                    ? location
                    : ''

        const googleEvent = {
            title: meetingToBook.title,
            description: meetingToBook.description,
            location: newLocation,
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
            desc: partiComment,
        }

        // create google calednar event and meets link
        createGoogleEvent(googleEvent)

        return this._cleanOne(
            Meeting.findOneAndUpdate(
                { _id: meetingId },
                {
                    ...meetingToBook.toObject(),
                    attendees,
                    location: newLocation,
                },
                { new: true },
            ),
        )
    }

    async cancelMeeting(meetingId) {
        if (!meetingId) return null
        const meetingToCancel = await Meeting.findOne({ _id: meetingId })
        if (!meetingToCancel) return null
        if (
            meetingToCancel.location !== 'ONLINE' &&
            meetingToCancel.location !== ''
        ) {
            await updateRoomSlotReservedStatus(
                meetingToCancel.event,
                false,
                meetingToCancel.location,
                meetingToCancel.startTime,
            )
        }

        // remove google calendar event
        if (meetingToCancel.googleEventId) {
            deleteGoogleEvent(meetingToCancel.googleEventId)
        }
        meetingToCancel.attendees = []
        meetingToCancel.googleEventId = ''
        meetingToCancel.googleMeetLink = ''
        meetingToCancel.location = ''

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
