const EmailTask = require('./model');
const SendgridService = require('../../common/services/sendgrid');
const EmailTypes = require('./types');
const EventController = require('../event/controller');
const UserController = require('../user-profile/controller');
const controller = {};

controller.createTask = (userId, eventId, type, message, schedule) => {
    const task = new EmailTask({
        user: userId,
        event: eventId,
        type: type
    });

    if (schedule) {
        task.schedule = schedule;
    }

    if (message) {
        task.message = message;
    }
    return task.save().catch(err => {
        if (err.code === 11000) {
            //The task already exists, so it's ok
            return Promise.resolve();
        }
        // For other types of errors, we'll want to throw the error normally
        return Promise.reject();
    });
};

controller.createAcceptedTask = (userId, eventId) => {
    return controller.createTask(userId, eventId, EmailTypes.registrationAccepted);
};

controller.createRejectedTask = (userId, eventId) => {
    return controller.createTask(userId, eventId, EmailTypes.registrationRejected);
};

controller.createRegisteredTask = (userId, eventId) => {
    return controller.createTask(userId, eventId, EmailTypes.registrationReceived);
};

// controller.sendEmail = (msg, taskParams) => {
//     return SendgridService.send(msg).catch(message => {
//         /** If sending the email fails, save a task to the DB and we can retry later */
//         return controller.createTask(message, taskParams);
//     });
// };

// controller.sendAcceptanceEmail = async (eventId, userId) => {
//     const event = await EventController.getEventById(eventId);
//     const user = await UserController.getUserProfile(userId);

//     const msgParams = {
//         event_name: event.name,
//         event_logo: event.logo.url
//     };

//     const msg = SendgridService.buildAcceptanceEmail('juuso.lappalainen@hackjunction.com', msgParams);
//     const taskParams = {
//         userId: user.userId,
//         eventId: event._id,
//         type: EmailTypes.registrationAccepted
//     };
//     return controller
//         .sendEmail(msg, taskParams)
//         .then(res => {
//             console.log('SENT EMAIL', res);
//         })
//         .catch(err => {
//             console.log('ERR SENDING EMAIL', err);
//         });
// };

// controller.sendRejectionEmail = (event, user) => {
//     const msgParams = {
//         event_name: event.name
//     };
//     const msg = SendgridService.buildRejectionEmail(user.email, msgParams);
//     const taskParams = {
//         userId: user.userId,
//         eventId: event._id,
//         type: EmailTypes.registrationRejected
//     };
//     return controller.sendEmail(msg, taskParams);
// };

module.exports = controller;
