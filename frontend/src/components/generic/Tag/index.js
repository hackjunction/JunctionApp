import React from 'react'
import PropTypes from 'prop-types'
import { Chip, Avatar } from '@mui/material'
import clsx from 'clsx'

const getColorClass = color => {
    return {
        backgroundColor: color,
    }
}

const propTypes = {
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}

const defaultProps = {
    color: 'lightgrey',
}

const Tag = ({ color, label }) => {
    const avatarStyle = getColorClass(color)

    return (
        <Chip
            avatar={
                <Avatar className="bg-current" style={avatarStyle}>
                    {''}
                </Avatar>
            }
            className="text-xs font-bold"
            size="small"
            label={label}
        />
    )
}

Tag.propTypes = propTypes
Tag.defaultProps = defaultProps

export default Tag
