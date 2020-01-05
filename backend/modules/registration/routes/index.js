module.exports = async fastify => {
    fastify.register(require('./get-user-registrations'))

    fastify.register(require('./get-registration'), {
        prefix: '/:slug',
    })

    fastify.register(require('./create-registration'), {
        prefix: '/:slug',
    })

    fastify.register(require('./edit-registration'), {
        prefix: '/:slug',
    })

    fastify.register(require('./get-registration-as-organiser'), {
        prefix: '/:slug/:registrationId',
    })

    fastify.register(require('./edit-registration-as-organiser'), {
        prefix: '/:slug/:registrationId',
    })

    fastify.register(require('./confirm-registration'), {
        prefix: '/:slug/confirm',
    })

    fastify.register(require('./cancel-registration'), {
        prefix: '/:slug/cancel',
    })

    fastify.register(require('./get-registrations-for-event'), {
        prefix: '/:slug/all',
    })

    fastify.register(require('./bulk-edit-registrations'), {
        prefix: '/:slug/bulk',
    })

    fastify.register(require('./bulk-accept-registrations'), {
        prefix: '/:slug/bulk/accept',
    })

    fastify.register(require('./bulk-reject-registrations'), {
        prefix: '/:slug/bulk/reject',
    })

    fastify.register(require('./assign-registrations-to-self'), {
        prefix: '/:slug/assign/self',
    })

    // TODO: This is not being used in frontend currently
    fastify.register(require('./assign-registration-to-user'), {
        prefix: '/:slug/assign/:userId/:registrationId',
    })
}

// router
//     .route('/:slug/:registrationId')
//     .get(
//         hasToken,
//         hasPermission(Auth.Permissions.MANAGE_EVENT),
//         isEventOrganiser,
//         getFullRegistration
//     )
//     .patch(
//         hasToken,
//         hasPermission(Auth.Permissions.MANAGE_EVENT),
//         isEventOrganiser,
//         editRegistration
//     )
