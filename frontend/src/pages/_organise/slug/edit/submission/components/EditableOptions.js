import React, { useState } from 'react'

const EditableOptions = ({ options, setOptions }) => {
    const [editIndex, setEditIndex] = useState(null)
    const [editText, setEditText] = useState('')
    const [newOption, setNewOption] = useState('')

    const handleEdit = index => {
        setEditIndex(index)
        setEditText(options[index])
    }

    const handleSave = () => {
        const newOptions = [...options]
        newOptions[editIndex] = editText
        setOptions(newOptions)
        setEditIndex(null)
    }

    const handleAddOption = () => {
        if (newOption) {
            setOptions([...options, newOption])
            setNewOption('')
        }
    }

    return (
        <div className="tw-flex tw-flex-col tw-space-y-2">
            {options.map((option, index) => (
                <div
                    key={index}
                    className="tw-flex tw-items-center tw-space-x-2"
                >
                    {editIndex === index ? (
                        <>
                            <input
                                type="text"
                                value={editText}
                                onChange={e => setEditText(e.target.value)}
                                className="tw-border tw-p-2 tw-rounded"
                            />
                            <button
                                onClick={handleSave}
                                className="tw-bg-blue-500 tw-cursor-pointer tw-text-white tw-px-2 tw-py-1 tw-rounded hover:tw-bg-blue-700"
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <span className="tw-text-gray-800">{option}</span>
                            <button
                                onClick={() => handleEdit(index)}
                                className="tw-bg-blue-500 tw-cursor-pointer tw-text-white tw-px-2 tw-py-1 tw-rounded hover:tw-bg-blue-700"
                            >
                                Edit
                            </button>
                        </>
                    )}
                </div>
            ))}
            <div className="tw-flex tw-items-center tw-space-x-2">
                <input
                    type="text"
                    value={newOption}
                    onChange={e => setNewOption(e.target.value)}
                    className="tw-border tw-p-2 tw-rounded"
                />
                <button
                    onClick={handleAddOption}
                    className="tw-bg-green-500 tw-cursor-pointer tw-text-white tw-px-2 tw-py-1 tw-rounded hover:tw-bg-green-700"
                >
                    Add Option
                </button>
            </div>
        </div>
    )
}

export default EditableOptions
