import React from 'react'

export const Dropdown = ({ value, onChange, placeholder, options }) => (
    <div className="tw-relative">
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className="tw-rounded-lg tw-py-2 tw-px-2 tw-items-start tw-justify-start tw-border-solid tw-cursor-pointer hover:tw-bg-gray-400 
            tw-w-full tw-bg-gray-300 tw-border-gray-400 tw-text-gray-800 tw-transition-all tw-duration-150 tw-outline-none tw-text-center tw-text-sm tw-font-bold"
        >
            <option value="" disabled>
                {placeholder}
            </option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
)

export default Dropdown
