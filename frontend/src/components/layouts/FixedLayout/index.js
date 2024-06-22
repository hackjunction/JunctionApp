import React from 'react'

export default ({ background, backgroundOpacity = 1, children }) => {
    return (
        <div className="fixed top-0 w-full h-full flex bg-black">
            {background && (
                <img
                    className="absolute object-cover object-center top-0 left-0 w-full h-full filter blur-md"
                    style={{ opacity: backgroundOpacity }}
                    src={background}
                    alt="Background"
                />
            )}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center overflow-y-scroll md:p-5 z-3">
                {children}
            </div>
        </div>
    )
}
