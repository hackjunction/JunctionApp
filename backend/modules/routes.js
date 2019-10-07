const authRouter = require('./auth/routes');
const eventRouter = require('./event/routes');
const uploadRouter = require('./upload/routes');
const userProfileRouter = require('./user-profile/routes');
const recruitmentRouter = require('./recruitment/routes');
const registrationRouter = require('./registration/routes');
const newsletterRouter = require('./newsletter/routes');
const teamRouter = require('./team/routes');
const emailRouter = require('./email-task/routes');
const devToolsRouter = require('./devtools/routes');
const filterGroupRouter = require('./filter-group/routes');

module.exports = function(app) {
    app.get('/api', (req, res) => {
        res.status(200).json({
            message: 'Hello!'
        });
    });
    app.use('/api/auth', authRouter);
    app.use('/api/email', emailRouter);
    app.use('/api/newsletter', newsletterRouter);
    app.use('/api/upload', uploadRouter);

    /** Model related routes */
    app.use('/api/events', eventRouter);
    app.use('/api/filter-groups', filterGroupRouter);
    app.use('/api/registrations', registrationRouter);
    app.use('/api/teams', teamRouter);
    app.use('/api/user-profiles', userProfileRouter);
    app.use('/api/recruitment', recruitmentRouter);

    /** Admin tools (development only) */
    if (global.gConfig.DEVTOOLS_ENABLED) {
        app.use('/api/devtools', devToolsRouter);
    }
};
