import React, { useState } from 'react'

const EditableOptions = ({ options, handleAddOption, handleEdit }) => {
    const [editIndex, setEditIndex] = useState(null)
    const [editText, setEditText] = useState('')
    const [newOption, setNewOption] = useState('')

    const handleEditOption = index => {
        setEditIndex(index)
        setEditText(options[index])
    }

    const handleSave = () => {
        handleEdit(editIndex, editText)
        setEditIndex(null)
    }

    const handleAddNewOption = () => {
        if (newOption) {
            handleAddOption(newOption)
            setNewOption('')
        }
    }

    return (
        <div className="tw-flex tw-flex-col tw-my-2 tw-space-y-2">
            {options.map((option, index) => (
                <div
                    key={index}
                    className="tw-flex tw-items-center tw-space-x-2"
                >
                    {editIndex === index ? (
                        <>
                            <input
                                onKeyDown={e => {
                                    if (e.key === 'Enter') handleSave()
                                }}
                                type="text"
                                value={editText}
                                onChange={e => setEditText(e.target.value)}
                                className="tw-rounded-lg tw-bg-gray-300 tw-border-gray-400 tw-p-2 tw-items-start tw-justify-start tw-text-gray-800 tw-border-solid tw-transition-all tw-duration-400 tw-outline-none hover:tw-bg-gray-400"
                            />
                            <svg
                                onClick={handleSave}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="tw-w-6 tw-h-6 tw-cursor-pointer hover:tw-text-blue-500"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
                                />
                            </svg>
                        </>
                    ) : (
                        <>
                            <span
                                onClick={() => handleEditOption(index)}
                                className="tw-text-gray-800 tw-font-bold tw-text-sm tw-cursor-pointer hover:tw-text-blue-500"
                            >
                                {option}
                            </span>
                            <svg
                                onClick={() => handleEditOption(index)}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="tw-w-6 tw-h-6 tw-cursor-pointer hover:tw-text-blue-500"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                        </>
                    )}
                </div>
            ))}
            <div className="tw-flex tw-items-center tw-space-x-1">
                <input
                    onKeyDown={e => {
                        if (e.key === 'Enter') handleAddNewOption()
                    }}
                    type="text"
                    value={newOption}
                    onChange={e => setNewOption(e.target.value)}
                    className="tw-rounded-lg tw-bg-gray-300 tw-border-gray-400 tw-p-2 tw-items-start tw-justify-start tw-text-gray-800 tw-border-solid tw-transition-all tw-duration-400 tw-outline-none hover:tw-bg-gray-400"
                    placeholder="Add new option"
                />
                <svg
                    onClick={handleAddNewOption}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="tw-w-8 tw-h-8 tw-px-1 tw-py-1 tw-cursor-pointer tw-bg-blue-500 tw-text-white tw-rounded-sm hover:tw-bg-blue-600"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                </svg>
            </div>
        </div>
    )
}

export default EditableOptions
