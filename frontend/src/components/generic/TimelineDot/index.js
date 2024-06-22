import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import clsx from 'clsx'

const TimelineDot = ({ active, completed, accentColor }) => {
    const dotClass = clsx(
        'w-3.5 h-3.5 border rounded-full flex items-center justify-center',
        {
            'border-current bg-transparent': active,
            'bg-current border-gray-300': !active,
        },
    )

    const dotStyle = active
        ? { borderColor: accentColor || '#19DDEA' }
        : { backgroundColor: accentColor || '#19DDEA' }

    return (
        <div className="w-3.5 h-3.5 flex items-center justify-center m-0">
            {completed ? (
                <CheckIcon color="primary" fontSize="small" />
            ) : (
                <div className={dotClass} style={dotStyle} />
            )}
        </div>
    )
}

export default TimelineDot
