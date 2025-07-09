import React, { useState, useCallback } from 'react'
import Upload from 'antd/es/upload'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Typography, CircularProgress } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { styled } from '@mui/material/styles'

import * as AuthSelectors from 'reducers/auth/selectors'
import * as SnackbarActions from 'reducers/snackbar/actions'

const EmptyWrapper = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})

const ButtonOverlay = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.6)',
    opacity: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'opacity 0.2s ease',
    '&:hover': {
        opacity: 1,
    },
    color: 'white',
})

const ImageButton = styled('div')({
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    '&:hover': {
        background: 'rgba(255,255,255,0.2)',
    },
})

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
        <EmptyWrapper>
            <CircularProgress size={24} />
        </EmptyWrapper>
    )

    const renderEmpty = () => (
        <EmptyWrapper>
            <Typography>Click or drag a file to upload</Typography>
        </EmptyWrapper>
    )

    const renderImage = () => (
        <>
            <Box
                component="img"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: resizeMode,
                }}
                src={value.url}
                alt="upload"
            />
            <ButtonOverlay>
                <ImageButton onClick={handleRemove}>
                    <DeleteIcon />
                    <Typography variant="button">Remove image</Typography>
                </ImageButton>
                <ImageButton onClick={() => window.open(value.url, '_blank')}>
                    <VisibilityIcon />
                    <Typography variant="button">View original</Typography>
                </ImageButton>
            </ButtonOverlay>
        </>
    )

    return (
        <Box
            sx={{
                backgroundColor: '#f7fafc',
                width: '100%',
                height: '100%',
                position: 'relative',
                cursor: 'pointer',
                userSelect: 'none',
            }}
        >
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
