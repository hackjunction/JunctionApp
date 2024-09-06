import { faPlusCircle, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as SnackbarActions from 'redux/snackbar/actions'

//TODO modify component to return an array for all actions, instead of single values
const EditableOptions = ({
    options,
    handleAddOption,
    handleEdit,
    handleDelete,
    uniqueOptions = false,
}) => {
    const dispatch = useDispatch()
    const [optionsArr, setOptionsArr] = useState(options || [])
    const [editIndex, setEditIndex] = useState(null)
    const [editText, setEditText] = useState('')
    const [newOption, setNewOption] = useState('')

    const validateOptionUniqueness = newValue => {
        // Returns true if the new value is not unique
        let notUnique = false
        optionsArr.map(criteriaObject => {
            if (criteriaObject.toLowerCase() === newValue.toLowerCase()) {
                dispatch(SnackbarActions.error(`${newValue} already exist`))
                notUnique = true
            }
        })
        return notUnique
    }

    const handleEditOption = index => {
        setEditIndex(index)
        setEditText(optionsArr[index])
    }

    const handleSave = () => {
        if (editIndex !== null) {
            if (editText !== optionsArr[editIndex]) {
                if (uniqueOptions) {
                    if (validateOptionUniqueness(editText)) {
                        return
                    }
                }
                optionsArr[editIndex] = editText
                setOptionsArr([...optionsArr]) // Create a new array to trigger a re-render.
                handleEdit(editIndex, editText)
            }
            setEditIndex(null)
        }
    }

    const handleAddNewOption = () => {
        if (newOption) {
            if (uniqueOptions) {
                if (validateOptionUniqueness(newOption)) {
                    return
                }
            }
            setOptionsArr([...optionsArr, newOption])
            handleAddOption(newOption)
            setNewOption('')
        }
    }

    const handleDeleteOption = index => {
        const newOptionsArr = optionsArr.filter((value, i) => i !== index)
        setOptionsArr([...newOptionsArr])
        handleDelete(newOptionsArr)
    }

    return (
        <div className="tw-flex tw-flex-col tw-my-2 tw-space-y-2">
            {optionsArr &&
                Array.isArray(optionsArr) &&
                optionsArr.map((option, index) => (
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
                                <FontAwesomeIcon
                                    onClick={handleSave}
                                    icon={faSave}
                                    size="lg"
                                />
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
                                    onClick={() => handleDeleteOption(index)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="tw-w-6 tw-h-6 tw-cursor-pointer hover:tw-text-blue-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
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

                <FontAwesomeIcon
                    onClick={handleAddNewOption}
                    icon={faPlusCircle}
                    size="lg"
                    color="blue"
                />
            </div>
        </div>
    )
}

export default EditableOptions
