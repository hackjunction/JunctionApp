import React, { useState, useCallback } from 'react'

import Upload from 'antd/es/upload'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, CircularProgress } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import VisibilityIcon from '@material-ui/icons/Visibility'

import * as AuthSelectors from 'redux/auth/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'gray',
    },
    emptyWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    emptyWrapperText: {
        textAlign: 'center',
        color: 'white',
        userSelect: 'none',
    },
    image: ({ resizeMode }) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: resizeMode || 'contain',
    }),
    imageOverlay: {
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
        cursor: 'pointer',
    },
    imageOverlayButton: {
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '&:hover': {
            background: 'rgba(255,255,255,0.2)',
        },
    },
}))

export default ({ value, onChange, uploadUrl, resizeMode = 'contain' }) => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const classes = useStyles({ resizeMode })
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
                    SnackbarActions.error('Please upload a .jpg or .png file')
                )
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                dispatch(
                    SnackbarActions.error('Upload size cannot be more than 2MB')
                )
            }
            return isJpgOrPng && isLt2M
        },
        [dispatch]
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
        [dispatch, onChange]
    )

    const handleRemove = useCallback(
        e => {
            e.stopPropagation()
            onChange()
        },
        [onChange]
    )

    const renderLoading = () => {
        return (
            <Box className={classes.emptyWrapper}>
                <CircularProgress size={24} style={{ color: 'white' }} />
            </Box>
        )
    }
    const renderImage = () => {
        return (
            <Box className={classes.imageWrapper}>
                <img className={classes.image} src={value.url} alt="upload" />
                <Box className={classes.imageOverlay}>
                    <Box
                        className={classes.imageOverlayButton}
                        onClick={handleRemove}
                    >
                        <DeleteIcon style={{ color: 'white' }} />
                        <Box p={1} />
                        <Typography
                            variant="button"
                            style={{ color: 'white', userSelect: 'none' }}
                        >
                            Remove image
                        </Typography>
                    </Box>
                    <Box
                        className={classes.imageOverlayButton}
                        onClick={() => window.open(value.url, '_blank')}
                    >
                        <VisibilityIcon style={{ color: 'white' }} />
                        <Box p={1} />
                        <Typography
                            variant="button"
                            style={{ color: 'white', userSelect: 'none' }}
                        >
                            View original
                        </Typography>
                    </Box>
                </Box>
            </Box>
        )
    }

    const renderEmpty = () => {
        return (
            <Box className={classes.emptyWrapper}>
                <Typography className={classes.emptyWrapperText}>
                    Click or drag a file to upload
                </Typography>
            </Box>
        )
    }

    return (
        <Box className={classes.wrapper}>
            <Upload
                name="image"
                listType="picture"
                className={classes.uploader}
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
