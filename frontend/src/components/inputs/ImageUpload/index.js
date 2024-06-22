import React, { useState, useCallback } from 'react'
import Upload from 'antd/es/upload'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, CircularProgress } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import * as AuthSelectors from 'reducers/auth/selectors'
import * as SnackbarActions from 'reducers/snackbar/actions'
import clsx from 'clsx'

const ImageUpload = ({
    value,
    onChange,
    uploadUrl,
    resizeMode = 'contain',
}) => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const [loading, setLoading] = useState(false)

    if (!uploadUrl) {
        throw new Error('ImageUpload component must be supplied an upload url')
    }

    const beforeUpload = useCallback(
        file => {
            const isJpgOrPng =
                file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJpgOrPng) {
                dispatch(
                    SnackbarActions.error('Please upload a .jpg or .png file'),
                )
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                dispatch(
                    SnackbarActions.error(
                        'Upload size cannot be more than 2MB',
                    ),
                )
            }
            return isJpgOrPng && isLt2M
        },
        [dispatch],
    )

    const handleChange = useCallback(
        info => {
            if (info.file.status === 'uploading') {
                setLoading(true)
                return
            }
            if (info.file.status === 'done') {
                onChange(info.file.response)
                setLoading(false)
            }

            if (info.file.status === 'error') {
                const message =
                    info?.file?.response?.message ??
                    'Something went wrong... Please try again'
                dispatch(SnackbarActions.error(message))
                setLoading(false)
            }
        },
        [dispatch, onChange],
    )

    const handleRemove = useCallback(
        e => {
            e.stopPropagation()
            onChange()
        },
        [onChange],
    )

    const renderLoading = () => (
        <Box className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center cursor-pointer bg-gray-200">
            <CircularProgress size={24} className="text-black" />
        </Box>
    )

    const renderImage = () => (
        <Box className="relative w-full h-full">
            <img
                className={clsx(
                    'absolute top-0 left-0 w-full h-full object-contain',
                    {
                        'object-contain': resizeMode === 'contain',
                        'object-cover': resizeMode === 'cover',
                    },
                )}
                src={value.url}
                alt="upload"
            />
            <Box className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 transition-opacity duration-200 hover:opacity-100 cursor-pointer">
                <Box
                    className="flex flex-row items-center p-2 hover:bg-white hover:bg-opacity-20"
                    onClick={handleRemove}
                >
                    <DeleteIcon className="text-white" />
                    <Box p={1} />
                    <Typography
                        variant="button"
                        className="text-white select-none"
                    >
                        Remove image
                    </Typography>
                </Box>
                <Box
                    className="flex flex-row items-center p-2 hover:bg-white hover:bg-opacity-20"
                    onClick={() => window.open(value.url, '_blank')}
                >
                    <VisibilityIcon className="text-white" />
                    <Box p={1} />
                    <Typography
                        variant="button"
                        className="text-white select-none"
                    >
                        View original
                    </Typography>
                </Box>
            </Box>
        </Box>
    )

    const renderEmpty = () => (
        <Box className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center cursor-pointer bg-gray-200">
            <Typography className="text-center text-black select-none">
                Click or drag a file to upload
            </Typography>
        </Box>
    )

    return (
        <Box className="relative w-full h-full bg-gray-100">
            <Upload
                name="image"
                listType="picture"
                showUploadList={false}
                action={uploadUrl}
                headers={{
                    Authorization: `Bearer ${idToken}`,
                }}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {loading && renderLoading()}
                {value && renderImage()}
                {!loading && !value && renderEmpty()}
            </Upload>
        </Box>
    )
}

export default ImageUpload
