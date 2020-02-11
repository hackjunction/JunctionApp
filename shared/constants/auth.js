const Roles = {
    SUPER_ADMIN: 'SuperAdmin',
    ORGANISER: 'Organiser',
    ASSISTANT_ORGANISER: 'AssistantOrganiser',
    RECRUITER: 'Recruiter',
}

const Permissions = {
    CREATE_EVENT: 'create:event',
    MANAGE_EVENT: 'manage:event',
    DELETE_EVENT: 'delete:event',
    ACCESS_RECRUITMENT: 'access:recruitment',
    MANAGE_RECRUITMENT: 'manage:recruitment',
}

module.exports = {
    Roles,
    Permissions,
}
