import React from 'react'

import { makeStyles } from '@mui/styles'
import { Box, Button, Typography } from '@mui/material'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#efefef',
    },
}))

const Empty = ({
    isEmpty,
    emptyText = 'No data',
    button,
    hideIfNotEmpty = false,
}) => {
    const classes = useStyles()

    const renderButton = () => {
        if (!button) return null
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={button.onClick}
            >
                {button.text}
            </Button>
        )
    }

    if (!isEmpty && !hideIfNotEmpty) {
        return (
            <Box
                pr={2}
                pb={2}
                pt={2}
                pl={2}
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
            >
                {renderButton()}
            </Box>
        )
    }

    return (
        <Box
            pt={10}
            pb={10}
            pl={3}
            pr={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            className={classes.root}
        >
            <InfoTwoToneIcon />
            <Box mt={2}>
                <Typography variant="body1">{emptyText}</Typography>
            </Box>
            {button && <Box mt={2}>{renderButton()}</Box>}
        </Box>
    )
}

export default Empty
