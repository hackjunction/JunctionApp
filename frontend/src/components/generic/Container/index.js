import React from 'react'
import clsx from 'clsx'

const Container = ({
    wrapperClass = null,
    className = null,
    small = false,
    center = false,
    children,
}) => {
    return (
        <div className={clsx('px-8', wrapperClass)}>
            <div
                className={clsx(
                    'mx-auto w-full max-w-[1120px]',
                    small && 'w-3/5 md:w-4/5',
                    center && 'text-center',
                    className,
                )}
            >
                {children}
            </div>
        </div>
    )
}

export default Container
