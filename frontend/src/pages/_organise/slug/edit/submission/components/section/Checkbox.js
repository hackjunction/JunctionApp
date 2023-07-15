// CheckboxList.js
import React from 'react'

const Checkbox = ({ options, selectedOptions, onChange }) => (
    <div>
        {options.map(option => (
            <label key={option}>
                <input
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
                {option}
            </label>
        ))}
    </div>
)

export default Checkbox
