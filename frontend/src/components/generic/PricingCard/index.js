import React from 'react'

import { makeStyles } from '@mui/styles'
import { Box, Typography, Grid } from '@mui/material'

import CheckIcon from '@mui/icons-material/Check'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

const useStyles = makeStyles(theme => ({
    top: {
        height: '350px',
        position: 'relative',
        padding: theme.spacing(2),
    },
    bottom: {
        padding: theme.spacing(2),
    },
    wrapper: {
        background: '#fbfbfb',
        borderRadius: '16px',
        borderColor: '#232323',
        '&:hover': {
            borderColor: '#73F9EC',
        },
    },
    icon: {
        marginRight: 10,
    },
}))

const PricingItem = ({ topic, body, price }) => {
    const renderText = arr => {
        return arr.map(text => {
            return (
                <>
                    <ListItem>
                        <CheckIcon className={classes.icon} />
                        <Typography>{text}</Typography>
                    </ListItem>
                </>
            )
        })
    }

    const classes = useStyles()
    return (
        <Grid item xs={12} md={4} lg={4}>
            <Box border={2} className={classes.wrapper}>
                <Box className={classes.top}>
                    <Typography variant="h6" color="#AB3EB3">
                        {topic}
                    </Typography>
                    <List>{renderText(body)}</List>
                    <Box mt={1} />
                </Box>
                <Box className={classes.bottom}>
                    <Box display="flex" flexDirection="row" flexWrap="wrap">
                        <Typography variant="h6" strong>
                            {price}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}

export default PricingItem
