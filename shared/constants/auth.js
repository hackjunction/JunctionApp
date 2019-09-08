const Roles = {
    SUPER_ADMIN: 'SuperAdmin',
    ORGANISER: 'Organiser',
    ASSISTANT_ORGANISER: 'AssistantOrganiser'
};

const Permissions = {
    CREATE_EVENT: 'create:event',
    MANAGE_EVENT: 'manage:event',
    DELETE_EVENT: 'delete:event'
};

module.exports = {
    Roles,
    Permissions
};
