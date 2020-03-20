import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { push } from 'connected-react-router'

import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import Divider from 'components/generic/Divider'
import LineDivider from 'components/generic/LineDivider/'
import ExternalLink from 'components/generic/ExternalLink'
import Footer from 'components/layouts/Footer'
import PageWrapper from 'components/layouts/PageWrapper'

import CenteredContainer from 'components/generic/CenteredContainer'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import config from 'constants/config'

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
        <PageWrapper
            header={() => <GlobalNavBar />}
            footer={() => <Footer hide_contact={true} />}
            render={() => (
                <>
                    <CenteredContainer wrapperClass={classes.backButtonWrapper}>
                        <Button onClick={() => dispatch(push('/'))}>
                            <ArrowBackIosIcon style={{ color: 'black' }} />
                            <Typography
                                variant="button"
                                style={{ color: 'black' }}
                            >
                                Back
                            </Typography>
                        </Button>
                    </CenteredContainer>
                    <CenteredContainer>
                        <h2>Contact {config.PLATFORM_OWNER_NAME}?</h2>
                    </CenteredContainer>
                </>
            )}
        />
    )
}
