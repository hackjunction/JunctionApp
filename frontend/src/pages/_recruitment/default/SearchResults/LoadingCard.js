import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Paper, Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: theme.spacing(2),
    },
}))

const LoadingCard = () => {
    const classes = useStyles()
    return (
        <Paper elevation={0} style={{ marginTop: '3px', flex: 1 }}>
            <Box className={classes.wrapper}>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Skeleton
                        variant="rect"
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                        }}
                    />
                </Box>
                <Box
                    padding={2}
                    flex="1"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Skeleton height={24} width="60%" />
                    <Skeleton height={12} width="40%" />
                    <Skeleton height={12} width="80%" />
                    <Skeleton height={12} width="80%" />
                    <Skeleton height={12} width="80%" />
                </Box>
            </Box>
        </Paper>
    )
}

export default LoadingCard
