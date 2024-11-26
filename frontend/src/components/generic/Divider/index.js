import React from 'react'
import clsx from 'clsx'

const Spacer = ({ size = 1 }) => {
    const sizeClass = `w-${size * 4} h-${size * 4}`

    return <div className={clsx(sizeClass)} />
}

export default Spacer
