import React from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import Image from 'components/generic/Image'
import Button from 'components/generic/Button'

const EventImage = ({
    className,
    publicId,
    transformation = {},
    alt = null,
    url = '',
    defaultImage,
    buttons,
}) => {
    return (
        <div className="flex justify-center items-center overflow-hidden relative">
            {publicId ? (
                <Image
                    className="max-w-full relative overflow-hidden"
                    publicId={publicId}
                    defaultImage={require('assets/images/default_cover_image.png')}
                />
            ) : (
                <img
                    src={url ?? defaultImage ?? ''}
                    alt={alt}
                    className={clsx(
                        'max-w-full relative overflow-hidden',
                        className,
                    )}
                    width={transformation.width}
                    height={transformation.height}
                />
            )}
            <div className="absolute flex justify-center items-center">
                {buttons?.map(button =>
                    button && button.push && button.push.startsWith('/') ? (
                        <Button
                            key={button._id}
                            variant="containedEventImage"
                            strong
                            color="theme_blue"
                            className="text-white bg-black z-2 border-none hover:opacity-70"
                            component={Link}
                            to={button.push}
                        >
                            <span className="no-underline text-white whitespace-pre">
                                {button.text}
                            </span>
                        </Button>
                    ) : (
                        <Button
                            key={button._id}
                            variant="containedEventImage"
                            strong
                            color="theme_blue"
                            className="text-white bg-black z-2 border-none hover:opacity-70"
                        >
                            <a
                                className="no-underline text-white whitespace-pre"
                                target="_blank"
                                rel="noopener noreferrer"
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

export default EventImage
