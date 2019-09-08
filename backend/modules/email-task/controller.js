const EmailTask = require('./model');
const SendgridService = require('../../common/services/sendgrid');
const EmailTypes = require('./types');
const controller = {};

controller.createTask = (msg, taskParams) => {
    const task = new EmailTask({
        message: msg,
        ...taskParams
    });

    return task.save().catch(err => {
        if (err.code === 11000) {
            //The task already exists, so it's ok
            return Promise.resolve();
        }
        // For other types of errors, we'll want to throw the error normally
        return Promise.reject();
    });
};

controller.sendEmail = (msg, taskParams) => {
    return SendgridService.send(msg).catch(message => {
        /** If sending the email fails, save a task to the DB and we can retry later */
        return controller.createTask(message, taskParams);
    });
};

controller.sendAcceptanceEmail = (event, user) => {
    const msgParams = {
        event_name: event.name
    };
    const msg = SendgridService.buildAcceptanceEmail(user.email, msgParams);
    const taskParams = {
        userId: user.userId,
        eventId: event._id,
        type: EmailTypes.registrationAccepted
    };
    return controller.sendEmail(msg, taskParams);
};

controller.sendRejectionEmail = (event, user) => {
    const msgParams = {
        event_name: event.name
    };
    const msg = SendgridService.buildRejectionEmail(user.email, msgParams);
    const taskParams = {
        userId: user.userId,
        eventId: event._id,
        type: EmailTypes.registrationRejected
    };
    return controller.sendEmail(msg, taskParams);
};

module.exports = controller;
