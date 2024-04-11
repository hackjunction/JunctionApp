import React, { useEffect } from 'react'

const typeToClass = {
    heading: 'tw-text-xl tw-font-bold',
    subheading: 'tw-text-lg tw-font-bold',
    paragraph: 'tw-text-base',
    default: 'tw-text-gray-500 tw-italic',
}

const EditableText = ({ value, save, className = '', type = 'default' }) => {
    const [isEditable, setIsEditable] = React.useState(false)
    const [currentValue, setCurrentValue] = React.useState(value)

    const handleBlur = () => {
        save(currentValue)
        setIsEditable(false)
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            handleBlur()
        }
    }

    useEffect(() => {
        setCurrentValue(value)
    }, [value])

    const displayClass = typeToClass[type] || typeToClass.default

    return isEditable ? (
        <input
            type="text"
            value={currentValue}
            onChange={e => setCurrentValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`tw-rounded-lg tw-w-full tw-bg-gray-300 tw-border-gray-400 tw-px-2 tw-py-2 tw-items-start tw-justify-start tw-text-gray-800 tw-border-solid ${className}`}
        />
    ) : (
        <span
            onClick={() => setIsEditable(true)}
            className={`tw-w-full tw-items-start tw-justify-start tw-text-gray-800 tw-cursor-pointer ${displayClass}`}
        >
            {currentValue || 'Click to edit'}
        </span>
    )
}

export default EditableText
