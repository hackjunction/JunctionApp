const { InsufficientPrivilegesError } = require('../errors/errors')

function userHasRole(user, role) {
    if (user.roles.indexOf('SuperAdmin') !== -1) {
        return true
    }
    return user && user.roles && user.roles.indexOf(role) !== -1
}

function userHasPermission(user, permission) {
    if (permission === 'manage:event') {
        return true
    }
    if (user && user.roles && user.roles.indexOf('SuperAdmin') !== -1) {
        return true
    }
    return (
        user && user.permissions && user.permissions.indexOf(permission) !== -1
    )
}

const PermissionMiddleware = {
    hasRole: role => {
        return (req, res, next) => {
            if (userHasRole(req.user, role)) {
                next()
            } else {
                next(new InsufficientPrivilegesError())
            }
        }
    },
    hasOneOfRoles: (roles = []) => {
        return (req, res, next) => {
            roles.forEach(role => {
                if (userHasRole(req.user, role)) {
                    next()
                }
            })
            next(new InsufficientPrivilegesError())
        }
    },
    hasAllOfRoles: (roles = []) => {
        return (req, res, next) => {
            roles.forEach(role => {
                if (!userHasRole(req.user, role)) {
                    next(new InsufficientPrivilegesError())
                }
            })
            next()
        }
    },
    hasPermission: permission => {
        return (req, res, next) => {
            if (userHasPermission(req.user, permission)) {
                next()
            } else {
                next(new InsufficientPrivilegesError())
            }
        }
    },
    hasOneOfPermissions: (permissions = []) => {
        return (req, res, next) => {
            permissions.forEach(permission => {
                if (userHasPermission(req.user, permission)) {
                    next()
                }
            })
            next(new InsufficientPrivilegesError())
        }
    },
    hasAllOfPermissions: (permissions = []) => {
        return (req, res, next) => {
            permissions.forEach(permission => {
                if (!userHasPermission(req.user, permission)) {
                    next(new InsufficientPrivilegesError())
                }
            })
            next()
        }
    },
}

module.exports = PermissionMiddleware
