import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@mui/styles'
import { Chip, Avatar } from '@mui/material'

const useStyles = makeStyles(theme => ({
    label: ({ color }) => ({
        ...theme.typography.overline,
    }),
    avatar: ({ color }) => ({
        backgroundColor: color,
    }),
}))

const propTypes = {
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}

const defaultProps = {
    color: 'lightgrey',
}

const Tag = ({ color, label }) => {
    const classes = useStyles({ color })
    return (
        <Chip
            avatar={<Avatar classes={{ root: classes.avatar }}>{''}</Avatar>}
            classes={classes}
            size="small"
            label={label}
        />
    )
}

Tag.propTypes = propTypes
Tag.defaultProps = defaultProps

export default Tag
