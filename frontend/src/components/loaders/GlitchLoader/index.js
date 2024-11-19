import React from 'react'
import clsx from 'clsx'
import SVG from 'react-inlinesvg'
import 'tailwindcss/tailwind.css'

const GlitchComponent = ({ size, title }) => {
    return (
        <div className="flex flex-col items-center">
            <div className={`relative w-${size} h-${size}`}>
                <SVG
                    src={require('assets/logos/emblem.svg')}
                    className={clsx(
                        'absolute top-0 left-0 w-full h-full animate-glitch1',
                    )}
                >
                    <img
                        src={require('assets/logos/emblem_white.png')}
                        alt="logo"
                    />
                </SVG>
                <SVG
                    src={require('assets/logos/emblem.svg')}
                    className={clsx(
                        'absolute top-0 left-0 w-full h-full animate-glitch2 fill-purple-700',
                    )}
                ></SVG>
                <SVG
                    src={require('assets/logos/emblem.svg')}
                    className={clsx(
                        'absolute top-0 left-0 w-full h-full animate-glitch3 fill-white',
                    )}
                ></SVG>
            </div>
            {title && (
                <div className="text-center mt-4">
                    <h3 className="text-white uppercase font-bold animate-glitch1">
                        {title}
                    </h3>
                    <h3 className="text-purple-700 uppercase font-bold animate-glitch2">
                        {title}
                    </h3>
                    <h3 className="text-white uppercase font-bold animate-glitch3">
                        {title}
                    </h3>
                </div>
            )}
        </div>
    )
}

export default GlitchComponent
