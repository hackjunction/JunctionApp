
module.exports = {
    $id: '/EventTrack',
    title: 'Event Track',
    description: 'A track within an Event',
    type: 'object',
    properties: {
        name: {
            type: 'string',
            description: 'The name of the track', 
        },
        slug: {
            type: 'string',
            description: 'A unique slug for the track, for use in e.g. URL paths'
        }
    },
    required: ['name', 'slug']
};