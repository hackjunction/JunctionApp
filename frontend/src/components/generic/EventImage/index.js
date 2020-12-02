import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import Image from 'components/generic/Image'

import { Image as CloudinaryImage, Transformation } from 'cloudinary-react'
import Button from 'components/generic/Button'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
const useStyles = makeStyles(theme => ({
    root: {
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
        zIndex: 2,
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    inner: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))

const EventImage = ({
    className,
    publicId,
    transformation = {},
    alt,
    url,
    defaultImage,
    buttons,
}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    console.log('buttons :>> ', buttons)
    if (publicId) {
        return (
            <div className={classes.wrapper}>
                <Image
                    className={classes.root}
                    publicId={publicId}
                    defaultImage={require('assets/images/default_cover_image.png')}
                />
                <div className={classes.inner}>
                    {buttons?.map(button => (
                        <Button
                            variant="containedEventImage"
                            strong
                            color="theme_blue"
                            className={classes.buttons}
                            onClick={() => dispatch(push(button.push))}
                        >
                            {button.text}
                        </Button>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className={classes.wrapper}>
            <img
                src={url ?? defaultImage ?? ''}
                alt={alt}
                className={clsx(classes.root, className)}
                width={transformation.width}
                height={transformation.height}
            />

            <div className={classes.inner}>
                {buttons?.map(button => (
                    <Button
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
