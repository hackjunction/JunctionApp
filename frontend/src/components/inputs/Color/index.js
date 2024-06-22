import React, { useState } from 'react'
import { CompactPicker } from 'react-color'

const ColorSelect = ({ onChange = color => {}, value = '' }) => {
    const [isOpen, setIsOpen] = useState(false)

    const togglePicker = () => {
        setIsOpen(!isOpen)
    }

    const onColorChange = color => {
        onChange(color.hex)
        togglePicker()
    }

    return (
        <div>
            <div className="flex items-center">
                <span
                    className="h-7 w-7 border border-lightgray rounded-full mr-2 cursor-pointer"
                    style={{ backgroundColor: value }}
                    onClick={togglePicker}
                />
                <span
                    className="px-4 py-2 bg-lightgray rounded-md cursor-pointer"
                    onClick={togglePicker}
                >
                    {value}
                </span>
            </div>
            {isOpen && (
                <div className="absolute z-50">
                    <div
                        className="fixed top-0 left-0 right-0 bottom-0"
                        onClick={togglePicker}
                    />
                    <CompactPicker
                        color={value}
                        onChangeComplete={onColorChange}
                        className="shadow-md"
                    />
                </div>
            )}
        </div>
    )
}

export default ColorSelect
