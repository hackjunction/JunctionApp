import React from 'react'
import { Box } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import clsx from 'clsx'

const getBackgroundColor = type => {
    switch (type) {
        case 'success':
            return 'bg-primary-main'
        case 'error':
            return 'bg-red-500'
        case 'warning':
            return 'bg-orange-500'
        case 'info':
            return 'bg-gray-500'
        default:
            return 'bg-gray-500'
    }
}

const getIcon = type => {
    switch (type) {
        case 'success':
            return <CheckCircleOutlinedIcon className="text-white text-4xl" />
        case 'error':
            return <ErrorOutlineOutlinedIcon className="text-white text-4xl" />
        case 'warning':
            return <ReportProblemOutlinedIcon className="text-white text-4xl" />
        case 'info':
            return <InfoOutlinedIcon className="text-white text-4xl" />
        default:
            return <InfoOutlinedIcon className="text-white text-4xl" />
    }
}

const IconHeader = ({ type }) => {
    return (
        <Box
            className={clsx(
                'p-4 flex flex-col items-center justify-center',
                getBackgroundColor(type),
            )}
        >
            {getIcon(type)}
        </Box>
    )
}

export const SuccessHeader = props => <IconHeader type="success" {...props} />
export const ErrorHeader = props => <IconHeader type="error" {...props} />
export const WarningHeader = props => <IconHeader type="warning" {...props} />
export const InfoHeader = props => <IconHeader type="info" {...props} />

export default IconHeader
