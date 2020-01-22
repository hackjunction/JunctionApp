const PermissionsUtils = {
    userHasPermission: (user, requiredPermission) => {
        if (!user) return false
        return (
            user &&
            user.permissions &&
            user.permissions.indexOf(requiredPermission) !== -1
        )
    },
    userHasPermissions: (user, requiredPermissions) => {
        if (!user) return false
        try {
            requiredPermissions.forEach(permission => {
                if (!PermissionsUtils.userHasPermission(user, permission)) {
                    throw new Error(
                        `User does not have a required permission: ${permission}`
                    )
                }
            })
            return true
        } catch (e) {
            return false
        }
    },
}

module.exports = PermissionsUtils
