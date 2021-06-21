import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import Image from 'components/generic/Image'

import { Image as CloudinaryImage, Transformation } from 'cloudinary-react'
import Button from 'components/generic/Button'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        maxWidth: '100%',
        position: 'relative',
        overflow: 'hidden',
        "&[src='']::after": {
            content: '',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'black',
            zIndex: 100,
        },
    },
    buttons: {
        color: 'white',
        background: 'black',
        zIndex: 2,
        border: 'none',
        '&:hover': {
            background: 'black',
            opacity: '70%',
        },
    },
    inner: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkText: {
        textDecoration: 'inherit',
        color: 'inherit',
        whiteSpace: 'pre',
    },
}))

const EventImage = ({
    className,
    publicId,
    transformation = {},
    alt = null,
    url = '',
    defaultImage,
    buttons,
}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    if (publicId) {
        return (
            <div className={classes.wrapper}>
                <Image
                    className={classes.image}
                    publicId={publicId}
                    defaultImage={require('assets/images/default_cover_image.png')}
                />
                <div className={classes.inner}>
                    {buttons?.map(button =>
                        button && button.push && button.push.startsWith('/') ? (
                            <Button
                                key={button._id}
                                variant="containedEventImage"
                                strong
                                color="theme_blue"
                                className={classes.buttons}
                                onClick={() => dispatch(push(button.push))}
                            >
                                <span className={classes.linkText}>
                                    {button.text}
                                </span>
                            </Button>
                        ) : (
                            <Button
                                key={button._id}
                                variant="containedEventImage"
                                strong
                                color="theme_blue"
                                className={classes.buttons}
                            >
                                <a
                                    className={classes.linkText}
                                    target="_blank"
                                    href={button.push}
                                >
                                    {button.text}
                                </a>
                            </Button>
                        ),
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className={classes.wrapper}>
            <img
                src={url ?? defaultImage ?? ''}
                alt={alt}
                className={clsx(classes.image, className)}
                width={transformation.width}
                height={transformation.height}
            />

            <div className={classes.inner}>
                {buttons?.map(button => (
                    <Button
                        key={button._id}
                        variant="containedEventImage"
                        strong
                        color="theme_blue"
                        className={classes.buttons}
                        onClick={() => dispatch(push('/'))}
                    >
                        {button.text}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default EventImage
