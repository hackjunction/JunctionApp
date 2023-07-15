import React from 'react'

const Switch = ({ onChange, checked, checkedText, uncheckedText }) => {
    return (
        <div className="tw-flex tw-items-center tw-space-x-4">
            <div
                className={`${
                    checked ? 'tw-bg-blue-500' : 'tw-bg-gray-300'
                } tw-relative tw-inline-block tw-w-12 tw-h-6 tw-transition-colors tw-duration-150 tw-ease-in tw-rounded-full tw-cursor-pointer 
                hover:tw-opacity-75 focus:tw-outline-none focus:tw-shadow-outline
                `}
                onClick={() => onChange(!checked)}
            >
                <span
                    className={`${
                        checked ? 'tw-translate-x-6' : 'tw-translate-x-0'
                    } tw-absolute tw-inline-block tw-w-6 tw-h-6 tw-transition-transform tw-duration-150 tw-ease-in tw-transform tw-bg-white tw-rounded-full tw-shadow`}
                ></span>
            </div>
            <span
                className="
                tw-text-gray-800
                tw-font-bold
                tw-text-sm
                tw-cursor-pointer
                hover:tw-text-blue-500
            "
                onClick={() => onChange(!checked)}
            >
                {checked ? checkedText : uncheckedText}
            </span>
        </div>
    )
}

export default Switch
