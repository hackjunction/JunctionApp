import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { push } from 'connected-react-router'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Box } from '@material-ui/core'
import Button from 'components/generic/Button'
import FixedLayout from 'components/layouts/FixedLayout'

import * as AuthActions from 'redux/auth/actions'

const useStyles = makeStyles(theme => ({
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(3),
        background: 'black',
        color: 'white',
    },
    logo: {
        width: '200px',
        height: '200px',
    },
    title: {
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    subtitle: {
        color: 'white',
        textAlign: 'center',
    },
    error: {
        color: theme.palette.error.main,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(0.5, 1),
    },
}))

export default () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const location = useLocation()
    useEffect(() => {
        dispatch(AuthActions.clearSession())
    }, [dispatch])

    const error = location?.state?.error

    return (
        <FixedLayout
            background={require('assets/images/default_cover_image.png')}
            backgroundOpacity={0.2}
        >
            <Box
                width="100%"
                maxWidth="600px"
                margin="0 auto"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <img
                    className={classes.logo}
                    src={require('../../assets/logos/emblem_white.png')}
                    alt="logo"
                />
                <Typography variant="h6" className={classes.title}>
                    Oh-oh, something went wrong
                </Typography>
                {error ? (
                    <Typography variant="body1" className={classes.error}>
                        {error}
                    </Typography>
                ) : null}
                <Typography variant="subtitle2" className={classes.subtitle}>
                    If this problem persists, it might be a problem on our end.
                    In this case, please reach out to us via email at
                    dev@hackjunction.com for further support.
                </Typography>
                <Box mt={2}>
                    <Button color="primary" onClick={() => dispatch(push('/'))}>
                        Back to home page
                    </Button>
                </Box>
            </Box>
        </FixedLayout>
    )
}
