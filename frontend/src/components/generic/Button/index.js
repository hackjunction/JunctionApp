import React from 'react'
import { Button as MuiButton, CircularProgress } from '@mui/material'

const getButtonClasses = (color, variant, strong) => {
    const baseClasses = [
        'rounded-[13px]',
        'px-6',
        'py-2',
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
        primary: 'text-white bg-primary-main border-2 border-primary-main',
        secondary:
            'text-white bg-secondary-main border-2 border-secondary-main',
        // Add more color mappings as needed
    }

    const variantClasses = {
        contained: `${colorClasses[color]} hover:bg-opacity-75`,
        containedNew:
            'text-white underline uppercase text-center hover:no-underline',
        applicationsClosed:
            'text-primary-main uppercase text-lg text-center mt-6',
        containedCard:
            'text-white bg-primary-main rounded-[16px_0_15px] uppercase opacity-75 text-xs hover:opacity-100',
        outlined: `bg-transparent text-white border-2 border-${color}-dark`,
        outlinedNew: `bg-transparent text-white border-2 border-${color}-dark rounded-[28px] h-[3em] w-[13em] m-3`,
        outlinedSmall: `bg-transparent text-white border-2 border-${color}-dark rounded-[28px] h-[2em] w-[10em] text-[10px] m-3`,
        containedLarge: `${colorClasses[color]} h-[3em] text-[1.5em] hover:bg-opacity-75`,
        containedEventImage: `${colorClasses[color]} h-[2.6em] rounded-[28px] text-[1.3em] m-2 hover:bg-opacity-75`,
        jOutlined: `bg-transparent text-white border-2 border-${color}-dark rounded-lg px-4 py-2`,
        jIconText: `bg-transparent text-${color}-main px-4 py-2 font-normal text-sm`,
        jContained: `${colorClasses[color]} rounded-lg px-4 py-2 hover:bg-${color}-dark hover:border-${color}-dark`,
        jOutlinedBox: `bg-${color}-main text-white border border-${color}-lightBorder rounded p-2 w-full`,
    }

    return baseClasses.join(' ') + ' ' + (variantClasses[variant] || '')
}

const Button = ({
    color = 'primary',
    strong = false,
    loading = false,
    ...props
}) => {
    const buttonClasses = getButtonClasses(color, props.variant, strong)

    // These are the only variants offered by MUIbutton
    if (!['text', 'outlined', 'contained'].includes(props.variant)) {
        delete props.variant
    }

    return (
        <MuiButton
            {...props}
            className={buttonClasses}
            disabled={loading || props.disabled}
        >
            {loading ? <CircularProgress size={20} /> : props.children}
        </MuiButton>
    )
}

export default Button
