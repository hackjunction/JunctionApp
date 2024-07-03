import React from 'react'
import { IconButton as MuiButton, CircularProgress } from '@mui/material'
import clsx from 'clsx'

const baseStyles = strong => ({
    'rounded-md px-4 py-1.5 text-base tracking-wide leading-tight': true,
    'font-bold uppercase': strong,
    'font-normal normal-case': !strong,
})

const variantStyles = (variant, color) => {
    switch (variant) {
        case 'contained':
            return {
                'bg-current text-white border-2 border-current hover:bg-current': true,
                [`bg-${color}-600 border-${color}-600 hover:bg-${color}-700`]: true,
                'disabled:bg-current disabled:text-white disabled:opacity-50': true,
                [`disabled:bg-${color}-700`]: true,
            }
        case 'containedNew':
            return {
                'text-current underline uppercase text-center': true,
                'hover:no-underline': true,
                [`text-${color}-600`]: true,
                'disabled:bg-transparent disabled:opacity-50': true,
            }
        case 'applicationsClosed':
            return {
                'text-current mt-6 uppercase text-lg text-center': true,
                [`text-${color}-600`]: true,
                'hover:no-underline': true,
                'disabled:bg-transparent disabled:opacity-50': true,
            }
        case 'containedCard':
            return {
                'bg-current text-white rounded-tl-lg rounded-br-lg uppercase text-sm opacity-75 hover:opacity-100': true,
                [`bg-${color}-600`]: true,
                'disabled:bg-transparent disabled:opacity-100': true,
            }
        case 'outlined':
            return {
                'bg-transparent text-current border-2': true,
                [`text-${color}-600 border-${color}-800`]: true,
            }
        case 'outlinedNew':
            return {
                'bg-transparent text-current border-2 rounded-full h-12 w-52 mt-6': true,
                [`text-${color}-600 border-${color}-800`]: true,
            }
        case 'contained-large':
            return {
                'bg-current text-white border-2 border-current h-12 text-2xl': true,
                [`bg-${color}-600 border-${color}-600 hover:bg-${color}-700`]: true,
                'disabled:bg-current disabled:text-white disabled:opacity-50': true,
                [`disabled:bg-${color}-700`]: true,
            }
        case 'containedEventImage':
            return {
                'bg-current text-white border-2 border-current h-10 rounded-full text-lg mt-2': true,
                [`bg-${color}-600 border-${color}-600 hover:bg-${color}-700`]: true,
                'disabled:bg-current disabled:text-white disabled:opacity-50': true,
                [`disabled:bg-${color}-700`]: true,
            }
        case 'jOutlined':
            return {
                'bg-transparent text-current border-2 rounded-full px-4 py-1': true,
                [`text-${color}-600 border-${color}-800`]: true,
            }
        case 'jContained':
            return {
                'bg-current text-white border-2 border-current rounded-md px-4 py-1': true,
                [`bg-${color}-600 border-${color}-600 hover:bg-${color}-700 hover:border-${color}-700`]: true,
                'disabled:bg-current disabled:text-white disabled:opacity-50': true,
                [`disabled:bg-${color}-700`]: true,
            }
        case 'jOutlinedBox':
            return {
                'bg-current text-white border border-light rounded-md px-4 py-2 w-full': true,
                [`bg-${color}-600 border-${color}-200`]: true,
            }
        case 'roundedBlack':
            return {
                'bg-black text-current border-2 rounded-full px-4 py-1': true,
                [`text-${color}-600 border-${color}-600 hover:text-black hover:bg-${color}-700 hover:border-${color}-700`]: true,
                'disabled:bg-current disabled:text-white disabled:opacity-50': true,
                [`disabled:bg-${color}-700`]: true,
            }
        default:
            return {
                'rounded-none text-current': true,
                [`text-${color}-600`]: true,
            }
    }
}

const IconButton = ({
    color = 'primary',
    strong = false,
    loading = false,
    ...props
}) => {
    const baseClasses = baseStyles(strong)
    const variantClasses = variantStyles(props.variant, color)

    return (
        <MuiButton
            {...props}
            className={clsx(baseClasses, variantClasses)}
            disabled={loading || props.disabled}
        >
            {loading ? <CircularProgress size={20} /> : props.children}
        </MuiButton>
    )
}

export default IconButton
