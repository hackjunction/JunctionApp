import React from 'react'

const Switch = ({ onChange, checked }) => {
    return (
        <div
            className={`${
                checked ? 'tw-bg-blue-500' : 'tw-bg-gray-300'
            } tw-relative tw-inline-block tw-w-12 tw-h-6 tw-transition-colors tw-duration-200 tw-ease-in tw-rounded-full tw-cursor-pointer`}
            onClick={() => onChange(!checked)}
        >
            <span
                className={`${
                    checked ? 'tw-translate-x-6' : 'tw-translate-x-0'
                } tw-absolute tw-inline-block tw-w-6 tw-h-6 tw-transition-transform tw-duration-200 tw-ease-in tw-transform tw-bg-white tw-rounded-full tw-shadow`}
            ></span>
        </div>
    )
}

export default Switch
