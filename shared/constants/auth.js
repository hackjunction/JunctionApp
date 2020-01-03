const Roles = {
    SUPER_ADMIN: 'SuperAdmin',
    ORGANISER: 'Organiser',
    ASSISTANT_ORGANISER: 'AssistantOrganiser',
    RECRUITER: 'Recruiter',
    RECRUITER_ADMIN: 'RecruiterAdmin',
    DEVELOPER: 'Developer',
}

const Permissions = {
    CREATE_EVENT: 'create:event',
    MANAGE_EVENT: 'manage:event',
    DELETE_EVENT: 'delete:event',
    ACCESS_RECRUITMENT: 'access:recruitment',
    MANAGE_RECRUITMENT: 'manage:recruitment',
    ACCESS_DOCS: 'access:docs',
}

module.exports = {
    Roles,
    Permissions,
}
