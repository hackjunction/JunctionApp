import React, { useState } from 'react'

const EditableOptions = ({
    options,
    handleAddOption,
    handleEdit,
    handleDelete,
}) => {
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

    const handleDeleteOption = index => {
        handleDelete(index)
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
                                onBlur={handleSave}
                                type="text"
                                value={editText}
                                onChange={e => setEditText(e.target.value)}
                                className="tw-text-gray-800 tw-font-bold tw-text-sm tw-border-solid tw-border-2 tw-border-gray-400 tw-rounded-lg tw-p-2"
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
                                className="tw-text-gray-800 tw-font-bold tw-text-sm tw-cursor-pointer hover:tw-text-blue-500 tw-border-solid tw-border-2 tw-border-gray-400 tw-rounded-lg tw-p-2 tw-transition-all tw-duration-400 hover:tw-bg-gray-100"
                            >
                                {option}
                            </span>
                            <svg
                                onClick={handleDeleteOption}
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
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
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
