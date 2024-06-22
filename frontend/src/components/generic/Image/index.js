import React from 'react'
import clsx from 'clsx'
import { Image as CloudinaryImage, Transformation } from 'cloudinary-react'

const Image = ({
    className = null,
    publicId = null,
    transformation = {},
    alt = null,
    url = null,
    defaultImage = null,
}) => {
    return publicId ? (
        <CloudinaryImage
            className={clsx('max-w-full relative overflow-hidden', className)}
            publicId={publicId}
        >
            <Transformation
                crop="fill"
                format="auto"
                quality="auto"
                {...transformation}
            />
        </CloudinaryImage>
    ) : (
        <img
            src={url ?? defaultImage ?? ''}
            alt={alt}
            className={clsx('max-w-full relative overflow-hidden', className)}
            width={transformation?.width}
            height={transformation?.height}
        />
    )
}

export default Image
