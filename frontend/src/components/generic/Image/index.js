import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Image as CloudinaryImage, Transformation } from 'cloudinary-react'

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
}))

const Image = ({
    className = null,
    publicId = null,
    transformation = {},
    alt = null,
    url = null,
    defaultImage = null,
}) => {
    const classes = useStyles()
    if (publicId) {
        return (
            <CloudinaryImage
                className={clsx(classes.root, className)}
                publicId={publicId}
            >
                <Transformation
                    crop="fill"
                    format="auto"
                    quality="auto"
                    {...transformation}
                />
            </CloudinaryImage>
        )
    }

    return (
        <img
            src={url ?? defaultImage ?? ''}
            alt={alt}
            className={clsx(classes.root, className)}
            width={transformation?.width}
            height={transformation?.height}
        />
    )
}

export default Image
