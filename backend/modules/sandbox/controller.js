const { AlreadyExistsError } = require("../../common/errors/errors")

const controller = {}

controller.updateMetadata = async (userId, updates) => {
    // const user = await auth0.getUser({ id: userId })
    // const metadata = { ...user.user_metadata, ...updates }
    // const updatedUser = await auth0.updateUserMetadata({ id: userId }, metadata)
    return "updatedUser"
}



module.exports = controller