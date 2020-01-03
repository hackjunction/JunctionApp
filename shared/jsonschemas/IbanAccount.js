// TODO: Proper regex validation for accountNumber and swift

module.exports = {
    $id: '/IbanAccount',
    title: 'IBAN Account Details',
    description: `IBAN account details including bank name and SWIFT/BIC`,
    type: 'object',
    properties: {
        accountNumber: {
            type: 'string',
        },
        bankName: {
            type: 'string',
        },
        swift: {
            type: 'string',
        },
    },
    required: ['accountNumber', 'bankName', 'swift'],
}
