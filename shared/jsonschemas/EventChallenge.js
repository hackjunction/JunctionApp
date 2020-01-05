module.exports = {
    $id: '/EventChallenge',
    title: 'Event Challenge',
    description: 'A challenge within an Event',
    type: 'object',
    properties: {
        name: {
            type: 'string',
            description: 'The name of the challenge',
        },
        slug: {
            type: 'string',
            description:
                'A unique slug for the challenge, for use in e.g. URL paths',
        },
        partner: {
            type: 'string',
            description: 'The partner responsible for this challenge',
        },
    },
    required: ['name', 'slug', 'partner'],
}
