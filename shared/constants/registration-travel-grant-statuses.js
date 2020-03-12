const RegistrationTravelGrantStatuses = {
    not_submitted: {
        id: 'not_submitted',
        label: 'Not Submitted',
        description: 'The reimbursement form has not been submitted yet.',
        color: '#555555',
        allowAssign: true,
        allowEdit: true,
    },
    pending: {
        id: 'pending',
        label: 'Pending',
        description: 'Waiting for acceptance/rejection',
        color: '#555555',
        allowAssign: true,
        allowEdit: true,
    },
    accepted: {
        id: 'accepted',
        label: 'Accepted',
        description: 'Accepted and has been notified about it',
        color: '#33d068',
        allowAssign: false,
        allowEdit: false,
    },
    rejected: {
        id: 'rejected',
        label: 'Rejected',
        description: 'Rejected and has been notified about it',
        color: '#e2062c',
        allowAssign: false,
        allowEdit: false,
    },
}

module.exports = {
    ids: Object.keys(RegistrationTravelGrantStatuses),
    asObject: RegistrationTravelGrantStatuses,
    asArray: Object.keys(RegistrationTravelGrantStatuses).map(
        status => RegistrationTravelGrantStatuses[status]
    ),
}
