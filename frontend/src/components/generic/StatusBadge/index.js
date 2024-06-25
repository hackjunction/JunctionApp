import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Chip } from '@mui/material'
import { RegistrationStatuses } from '@hackjunction/shared'
import clsx from 'clsx'

const getStatusStyles = color => {
    const backgroundColor = `bg-${color}-200`
    const borderColor = `border-${color}-500`
    const textColor = `text-white`

    return clsx(backgroundColor, borderColor, textColor, 'border-2 font-bold')
}

const propTypes = {
    status: PropTypes.oneOf(RegistrationStatuses.ids).isRequired,
    hideSoftStatuses: PropTypes.bool,
}

const defaultProps = {
    hideSoftStatuses: false,
}

const StatusBadge = ({ status, hideSoftStatuses }) => {
    const params = useMemo(() => {
        if (hideSoftStatuses) {
            switch (status) {
                case RegistrationStatuses.asObject.softAccepted.id:
                case RegistrationStatuses.asObject.softRejected.id:
                    return RegistrationStatuses.asObject.pending
                default:
                    break
            }
        }
        return RegistrationStatuses.asObject[status]
    }, [hideSoftStatuses, status])

    if (!params) return <Chip size="small" label="???" />

    const statusClasses = getStatusStyles(params.color)

    return (
        <Chip
            className={statusClasses}
            variant="outlined"
            size="small"
            label={params.label}
        />
    )
}

StatusBadge.propTypes = propTypes
StatusBadge.defaultProps = defaultProps

export default StatusBadge
