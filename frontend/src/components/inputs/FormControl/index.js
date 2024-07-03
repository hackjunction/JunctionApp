import React from 'react'
import { Box, Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'

const FormControl = ({ label, hint, touched, error, children }) => {
    const hasError = touched && error

    const renderHintOrError = () => {
        if (!touched || !error) {
            return hint
        }

        if (typeof error === 'string') {
            return `${hint} \n \n${error}`
        }

        if (Object.keys(error).length > 0) {
            return Object.keys(error)
                .map(key => error[key])
                .join(', ')
        }

        return hint
    }

    return (
        <Box className="flex flex-col flex-1">
            <Typography className="font-bold text-lg" variant="h6">
                {label}
            </Typography>
            <ReactMarkdown
                children={renderHintOrError()}
                components={{
                    p: ({ children }) => (
                        <Typography
                            className={clsx('mt-1', {
                                'text-red-500': hasError,
                                'text-gray-700': !hasError,
                            })}
                            variant="subtitle2"
                            paragraph
                        >
                            {children}
                        </Typography>
                    ),
                }}
            />
            {children}
        </Box>
    )
}

export default FormControl
