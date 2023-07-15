import React from 'react'

const Checkbox = ({ options, selectedOptions, onChange }) => (
    <div className="tw-grid tw-grid-cols-3 md:tw-flex md:tw-flex-col">
        {options.map(option => (
            <label
                key={option}
                className="
                tw-text-gray-800
                tw-font-bold
                tw-text-sm
                tw-cursor-pointer
                hover:tw-text-blue-500
                tw-m-1
                tw-w-20
                "
            >
                <input
                    className="tw-text-blue-500 tw-cursor-pointer focus:tw-outline-none focus:tw-shadow-outline tw-h-4 tw-w-4"
                    type="checkbox"
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={event => {
                        if (event.target.checked) {
                            // Add the checked option to the selected options
                            onChange([...selectedOptions, event.target.value])
                        } else {
                            // Remove the unchecked option from the selected options
                            onChange(
                                selectedOptions.filter(
                                    item => item !== event.target.value,
                                ),
                            )
                        }
                    }}
                />
                <span className="tw-text-gray-700 tw-ml-2">{option}</span>
            </label>
        ))}
    </div>
)

export default Checkbox
