const RegistrationFields = require('./RegistrationFields')

module.exports = {
    $id: '/RegistrationAnswers',
    title: 'Registration Answers',
    description: 'The answers a user has submitted in their registration',
    type: 'object',
    properties: {
        ...RegistrationFields,
    },
}
