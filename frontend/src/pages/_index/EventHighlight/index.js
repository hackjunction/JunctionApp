import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Typography, Box } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import Image from 'components/generic/Image'
import Button from 'components/generic/Button'
import PageWrapper from 'components/layouts/PageWrapper'
import { useHighlightedEvents } from 'graphql/queries/events'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
        // padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            alignItems: 'stretch',
            height: '465px',
            padding: 0,
        },
    },
    left: {
        height: '465px',
        position: 'relative',
        width: '100%',
        // padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            flex: 1,
            height: '100%',
        },
        [theme.breakpoints.down('md')]: {
            maxHeight: '200px',
        },
    },
    leftImage: {
        background: theme.palette.theme_lightgray.main,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        [theme.breakpoints.down('md')]: {
            objectFit: 'contain',
        },
    },
}))

export default () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { t } = useTranslation()

    // const [events, loading] = useHighlightedEvents({
    //     limit: 1,
    // })
    // console.log('events :>> ', events)
    // const event = events?.[0] ?? null
    // if (!event) return null
    return (
        <PageWrapper>
            <div className={classes.wrapper}>
                <div className={classes.left}>
                    <Image
                        className={classes.leftImage}
                        // publicId={
                        //     event.coverImage ? event.coverImage.publicId : ''
                        // }
                        transformation={{
                            width: '100%',
                        }}
                        defaultImage={require('assets/images/default_cover_image.png')}
                    />
                </div>
            </div>
        </PageWrapper>
    )
}
