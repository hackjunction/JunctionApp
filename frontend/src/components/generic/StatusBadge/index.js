import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { makeStyles, lighten } from '@material-ui/core/styles'
import { Chip } from '@material-ui/core'

import { RegistrationStatuses } from '@hackjunction/shared'

const useStyles = makeStyles(theme => ({
    root: ({ color }) => ({
        backgroundColor: lighten(color, 0.33),
        borderColor: color,
        borderWidth: 2,
    }),
    label: ({ color }) => ({
        ...theme.typography.overline,
        fontWeight: 'bold',
        color: 'white',
    }),
}))

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
    const classes = useStyles(params)
    if (!params) return <Chip size="small" label="???" />
    return (
        <Chip
            classes={classes}
            variant="outlined"
            size="small"
            label={params.label}
        />
    )
}

StatusBadge.propTypes = propTypes
StatusBadge.defaultProps = defaultProps

export default StatusBadge
