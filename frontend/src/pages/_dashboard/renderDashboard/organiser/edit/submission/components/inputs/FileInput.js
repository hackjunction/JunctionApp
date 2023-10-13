import Button from 'components/generic/Button'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as DashboardActions from 'redux/dashboard/actions'

const FileInput = ({
    value = null,
    handleChange = arg => {},
    config = null,
}) => {
    const allowedFileTypes =
        config?.settings?.allowedTypes &&
        config.settings.allowedTypes.length > 0
            ? config.settings.allowedTypes.map(type => `.${type}`).join(',')
            : ''

    const dispatch = useDispatch()
    let parsedValue

    if (typeof value === 'string') {
        if (value !== '' && value !== '[object Object]') {
            parsedValue = JSON.parse(value)
        } else if (value === '[object Object]') {
            console.log('FileInput value is [object Object]')
            value = null
        }
    } else {
        parsedValue = value
    }

    const downloadFile = async () => {
        await dispatch(
            DashboardActions.getFileForProject(
                parsedValue.id,
                parsedValue.filename,
            ),
        )
    }

    const deleteFile = async () => {
        handleChange('')
        await dispatch(DashboardActions.deleteFileForProject(parsedValue.id))
    }

    return (
        <div className="tw-flex tw-items-center tw-justify-center tw-w-full">
            <label
                htmlFor="dropzone-file"
                className="hover:tw-bg-gray-100 tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-64 tw-border-2 tw-border-gray-300 tw-border-dashed tw-rounded-lg tw-cursor-pointer tw-bg-gray-50 dark:hover:tw-bg-gray-800 dark:tw-bg-gray-700 tw-hover:tw-bg-gray-100 dark:tw-border-gray-600 dark:hover:tw-border-gray-500 dark:hover:tw-bg-gray-600"
            >
                {!value && (
                    <>
                        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-pt-5 tw-pb-6">
                            <svg
                                aria-hidden="true"
                                className="tw-w-10 tw-h-10 tw-mb-3 tw-text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                            </svg>
                            <p className="tw-mb-2 tw-text-sm tw-text-gray-500 dark:tw-text-gray-400">
                                <span className="tw-font-semibold">
                                    Click to upload
                                </span>
                            </p>
                            <p className="tw-text-xs tw-text-gray-500 dark:tw-text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="tw-hidden"
                            accept={allowedFileTypes}
                            onChange={e => {
                                console.log('File details', e.target.files[0])
                                handleChange(e.target.files[0])
                            }}
                        />
                    </>
                )}
                {value && (
                    <div>
                        <Button variant="jContained" onClick={downloadFile}>
                            Download {parsedValue.filename}
                        </Button>
                        <Button onClick={deleteFile}>
                            Delete {parsedValue.filename}
                        </Button>
                    </div>
                )}
            </label>
        </div>
    )
}

export default FileInput
