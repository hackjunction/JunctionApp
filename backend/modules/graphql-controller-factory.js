const UserProfileController = require('./user-profile/graphql-controller')
const RegistrationController = require('./registration/graphql-controller')
const EventController = require('./event/graphql-controller')

function buildController(key, context) {
    const user = context.req && context.req.user
    switch (key) {
        case 'UserProfile':
            return new UserProfileController(user)
        case 'Registration':
            return new RegistrationController(user)
        case 'Event':
            return new EventController(user)
        default: {
            throw new Error(`No controller specified for key ${key}!`)
        }
    }
}

/** This way we can have easy access to all of our controllers in the
 *  context without having to instantiate ALL controllers for every request.
 */
module.exports = function buildGetController() {
    const store = new Map()

    return function factory(key) {
        /** If we already have an instance of the controller, return it */
        if (store.has(key)) {
            return store.get(key)
        }
        /** Otherwise create it, and add it to the map for later use.
         * This refers to the context of the graphql query */
        const controller = buildController(key, this)
        store.set(key, controller)
        return controller
    }
}
