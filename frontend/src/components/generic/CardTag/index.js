import React from 'react'
import PropTypes from 'prop-types'
import Chip from '@mui/material/Chip'

const getChipClasses = ({ color, strong }) => {
    const baseClasses = [
        'rounded-[13px]',
        'p-[2px]',
        'box-border',
        'text-[16px]',
        'tracking-[0.02em]',
        'leading-[22px]',
        'shadow-none',
        'font-bold',
    ]

    if (strong) {
        baseClasses.push('uppercase')
        baseClasses.push('font-sans')
    } else {
        baseClasses.push('font-body')
    }

    const colorClasses = {
        primary: 'text-white bg-primary-light',
        secondary: 'text-white bg-secondary-light',
        // Add more color mappings as needed
    }

    baseClasses.push(colorClasses[color] || colorClasses['primary'])

    return baseClasses.join(' ')
}

export default function CardTag({
    label,
    color = 'primary',
    strong = false,
    loading = false,
    ...props
}) {
    const chipClasses = getChipClasses({ color, strong })

    return (
        <Chip
            {...props}
            className={`${chipClasses} ${props.className}`}
            label={label}
        />
    )
}

CardTag.propTypes = {
    label: PropTypes.string.isRequired,
    color: PropTypes.string,
    strong: PropTypes.bool,
    loading: PropTypes.bool,
}
