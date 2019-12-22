import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined'

const getBackgroundColor = (type, theme) => {
    switch (type) {
        case 'success':
            return theme.palette.primary.main
        case 'error':
            return theme.palette.error.light
        case 'warning':
            return 'orange'
        case 'info':
            return '#888'
        default:
            return '#888'
    }
}

const useStyles = makeStyles(theme => ({
    root: ({ type }) => ({
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: getBackgroundColor(type, theme),
    }),
    icon: {
        color: 'white',
        fontSize: '32px',
    },
}))

const IconHeader = ({ type }) => {
    const classes = useStyles({ type })
    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircleOutlinedIcon className={classes.icon} />
            case 'error':
                return <ErrorOutlineOutlinedIcon className={classes.icon} />
            case 'warning':
                return <ReportProblemOutlinedIcon className={classes.icon} />
            case 'info':
                return <InfoOutlinedIcon className={classes.icon} />
            default:
                return <InfoOutlinedIcon className={classes.icon} />
        }
    }

    return <Box className={classes.root}>{getIcon()}</Box>
}

export const SuccessHeader = props => {
    return <IconHeader type="success" {...props} />
}

export const ErrorHeader = props => {
    return <IconHeader type="error" {...props} />
}

export const WarningHeader = props => {
    return <IconHeader type="warning" {...props} />
}

export const InfoHeader = props => {
    return <IconHeader type="info" {...props} />
}

export default IconHeader
