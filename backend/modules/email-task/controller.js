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
        return Promise.reject(err);
    });
};

controller.createAcceptedTask = async (userId, eventId, deliverNow = false) => {
    const task = await controller.createTask(userId, eventId, EmailTypes.registrationAccepted);
    if (deliverNow) {
        return controller.deliverEmailTask(task);
    }
    return task;
};

controller.createRejectedTask = async (userId, eventId, deliverNow = false) => {
    const task = await controller.createTask(userId, eventId, EmailTypes.registrationRejected);
    if (deliverNow) {
        return controller.deliverEmailTask(task);
    }
    return task;
};

controller.createRegisteredTask = async (userId, eventId, deliverNow = false) => {
    const task = await controller.createTask(userId, eventId, EmailTypes.registrationReceived);
    if (deliverNow) {
        return controller.deliverEmailTask(task);
    }
    return task;
};

controller.deliverEmailTask = async task => {
    const [user, event] = await Promise.all([
        UserController.getUserProfile(task.user),
        EventController.getEventById(task.event)
    ]);
    switch (task.type) {
        case EmailTypes.registrationAccepted: {
            await SendgridService.sendAcceptanceEmail('juuso.lappalainen@hackjunction.com', event, user);
            break;
        }
        case EmailTypes.registrationRejected: {
            console.log('PERFORM REG REJECTED EMAIL');
            break;
        }
        case EmailTypes.registrationReceived: {
            console.log('PERFORM REG RECEIVED');
            break;
        }
        default: {
            console.log('PERFORM GENERIC EMAIL!');
            break;
        }
    }

    /** Here we'll have success so we can set the task as delivered */
    task.deliveredAt = Date.now();
    return task.save();
};

controller.sendPreviewEmail = async (to, msgParams) => {
    console.log('SENDING TEST TO', to);
    console.log('WITH PARAMS', msgParams);
    return SendgridService.sendGenericEmail(to, msgParams).catch(err => {
        console.log('DA ERR', err);
        return;
    });
};

module.exports = controller;
