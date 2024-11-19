import React from 'react'
import GlitchLoader from 'components/loaders/GlitchLoader'

const LoadingOverlay = ({ text }) => {
    return (
        <div className="fixed top-0 w-full h-full flex items-center justify-center bg-black z-1000 p-20">
            <img
                className="absolute object-cover object-center top-0 left-0 w-full h-full filter blur-md opacity-50"
                src={require('assets/images/default_cover_image.png')}
                alt="background"
            />
            <GlitchLoader title={text} size={200} />
        </div>
    )
}

export default LoadingOverlay
