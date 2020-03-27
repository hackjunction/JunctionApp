import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { push } from 'connected-react-router'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next';
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
        const { t, i18n } = useTranslation();
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
          width='100%'
          maxWidth='600px'
          margin='0 auto'
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <img
            className={classes.logo}
            src={require('../../assets/logos/emblem_white.png')}
            alt='logo'
          />
          <Typography variant='h6' className={classes.title}>
            {t('Something_wrong_')}
          </Typography>
          {error ? (
            <Typography variant='body1' className={classes.error}>
              {error}
            </Typography>
          ) : null}
          <Typography variant='subtitle2' className={classes.subtitle}>
            {t('Problem_persists_')}
          </Typography>
          <Box mt={2}>
            <Button color='primary' onClick={() => dispatch(push('/'))}>
              {t('Back_to_home_page')}
            </Button>
          </Box>
        </Box>
      </FixedLayout>
    );
}
