import React from 'react'
import HyperModal from 'react-hyper-modal'
import clsx from 'clsx'
import { Box, Typography } from '@mui/material'

const GenericModal = ({
    title,
    isOpen,
    handleClose,
    size,
    children,
    footer = null,
}) => {
    return (
        <HyperModal
            isOpen={isOpen}
            requestClose={handleClose}
            classes={{
                contentClassName: clsx(
                    'bg-white w-full max-w-xs md:max-w-2xl z-10 flex flex-col items-stretch',
                    {
                        'md:max-w-3xl': size === 'med',
                        'max-w-none h-full rounded-none': size === 'max',
                    },
                ),
                wrapperClassName: clsx('flex z-50', {
                    'p-4': size !== 'max',
                }),
            }}
        >
            {title && (
                <Box className="p-6 text-center">
                    <Typography variant="h6">{title}</Typography>
                </Box>
            )}
            <Box className="p-4 flex-1 overflow-auto">{children}</Box>
            {footer}
        </HyperModal>
    )
}

export default GenericModal
