import React from 'react'
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
}

const StatusBadge = ({ status }) => {
    const params = RegistrationStatuses.asObject[status]
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

export default StatusBadge
