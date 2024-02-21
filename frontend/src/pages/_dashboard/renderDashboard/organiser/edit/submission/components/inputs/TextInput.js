import React, { useCallback, useState } from 'react'

const TextInput = React.memo(
    ({
        disabled,
        label,
        onBlur,
        onChange = () => {},
        placeholder = '',
        required = false,
        value = '',
        autoFocus,
        type = 'text',
        width = 'tw-w-full',
    }) => {
        // const [fieldPlaceholder, setFieldPlaceholder] = useState('placeholder')

        const handleChange = useCallback(
            e => {
                // console.log(e)
                // console.log(e.target)
                // console.log(e.target.value)
                onChange(e.target.value)
            },
            [onChange],
        )

        return (
            <div className="tw-flex tw-flex-col">
                {label && <label>{label}</label>}
                <input
                    autoFocus={autoFocus}
                    disabled={disabled}
                    onBlur={onBlur}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required}
                    value={value}
                    type={type}
                    className={`tw-rounded-lg ${width} tw-max-h-full tw-bg-gray-300 tw-border-gray-400 tw-px-2 tw-py-4 tw-items-start tw-justify-start tw-text-gray-800 tw-border-solid tw-transition-all tw-duration-400 tw-outline-none hover:tw-bg-gray-400 ${
                        disabled ? 'tw-opacity-50 tw-cursor-not-allowed' : ''
                    }`}
                />
            </div>
        )
    },
)

export default TextInput
