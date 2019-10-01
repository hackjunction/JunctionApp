const EmailTask = require('./model');
const SendgridService = require('../../common/services/sendgrid');
const EmailTypes = require('./types');
const EventController = require('../event/controller');
const UserController = require('../user-profile/controller');
const RegistrationController = require('../registration/controller');
const shortid = require('shortid');
const Promise = require('bluebird');
const controller = {};

controller.createTask = (userId, eventId, type, params, schedule) => {
    const task = new EmailTask({
        user: userId,
        event: eventId,
        type: type
    });

    if (schedule) {
        task.schedule = schedule;
    }

    if (params) {
        task.params = params;
    }
    return task.save().catch(err => {
        if (err.code === 11000) {
            console.log('ALREADY EXISTS');
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
    if (task && deliverNow) {
        return controller.deliverEmailTask(task);
    }
    return task;
};

controller.createTravelGrantAcceptedTask = async (userId, eventId, deliverNow = false) => {
    const task = await controller.createTask(userId, eventId, EmailTypes.travelGrantAccepted);
    if (task && deliverNow) {
        return controller.deliverEmailTask(task);
    }
    return task;
};

controller.createTravelGrantRejectedTask = async (userId, eventId, deliverNow = false) => {
    const task = await controller.createTask(userId, eventId, EmailTypes.travelGrantRejected);
    if (task && deliverNow) {
        return controller.deliverEmailTask(task);
    }
    return task;
};

controller.createGenericTask = async (userId, eventId, uniqueId, msgParams, deliverNow = false) => {
    if (!uniqueId) {
        uniqueId = shortid.generate();
    }
    const task = await controller.createTask(userId, eventId, 'generic_' + uniqueId, msgParams);
    if (task && deliverNow) {
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
            await SendgridService.sendAcceptanceEmail(event, user);
            break;
        }
        case EmailTypes.registrationRejected: {
            await SendgridService.sendRejectionEmail(event, user);
            break;
        }
        case EmailTypes.registrationReceived: {
            await SendgridService.sendRegisteredEmail(event, user);
            break;
        }
        case EmailTypes.travelGrantAccepted: {
            const registration = await RegistrationController.getRegistration(task.user, task.event);
            await SendgridService.sendTravelGrantAcceptedEmail(event, user, registration);
            break;
        }
        case EmailTypes.travelGrantRejected: {
            const registration = await RegistrationController.getRegistration(task.user, task.event);
            await SendgridService.sendTravelGrantRejectedEmail(event, user, registration);
            break;
        }
        default: {
            await SendgridService.sendGenericEmail(user.email, task.params);
            break;
        }
    }

    /** Here we'll have success so we can set the task as delivered */
    task.deliveredAt = Date.now();
    return task.save();
};

controller.sendPreviewEmail = async (to, msgParams) => {
    return SendgridService.sendGenericEmail(to, msgParams).catch(err => {
        return;
    });
};

controller.sendBulkEmail = async (recipients, msgParams, event, uniqueId) => {
    const promises = recipients.map(recipient => {
        return controller.createGenericTask(recipient, event._id.toString(), uniqueId, msgParams, true);
    });
    return Promise.all(promises);
};

module.exports = controller;
