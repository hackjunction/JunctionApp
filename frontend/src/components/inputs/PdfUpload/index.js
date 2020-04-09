import React, { useCallback, useState } from 'react'

import {
    Box,
    Typography,
    CircularProgress,
    IconButton,
    Tooltip,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Upload } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import ClearIcon from '@material-ui/icons/Clear'
import { useTranslation } from 'react-i18next'
import * as AuthSelectors from 'redux/auth/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'

const useStyles = makeStyles(theme => ({
    uploader: {
        background: 'gray',
        width: '100%',
        cursor: 'pointer',
    },
    uploaderInner: {
        width: '100%',
        height: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(3),
    },
    uploadText: {
        color: 'white',
        textAlign: 'center',
    },
}))

export default ({ value, onChange, uploadUrl, resizeMode = 'contain' }) => {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const [loading, setLoading] = useState(false)
    const classes = useStyles()

    const beforeUpload = useCallback(
        file => {
            const isPDF = file.type === 'application/pdf'
            if (!isPDF) {
                dispatch(SnackbarActions.show(t('Upload_pdf_')))
            }
            const isLt10M = file.size / 1024 / 1024 < 10
            if (!isLt10M) {
                dispatch(SnackbarActions.show(t('Upload_size_ten_')))
            }
            return isPDF && isLt10M
        },
        [dispatch]
    )

    const handleRemove = useCallback(() => {
        onChange()
    }, [onChange])

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
                    info?.file?.response?.message ?? t('Something_went_wrong_')
                dispatch(SnackbarActions.error(message))
                setLoading(false)
            }
        },
        [dispatch, onChange]
    )

    return (
        <Box display="flex" flexDirection="column" alignItems="stretch">
            {value && value.url ? (
                <Box
                    flex="1"
                    display="flex"
                    flexDirection="row"
                    alignItems="flex-start"
                >
                    <Box flex="1">
                        <a href={value.url}>{value.url}</a>
                    </Box>
                    <Box ml={2}>
                        <Tooltip title="Remove">
                            <IconButton onClick={handleRemove}>
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            ) : (
                <Upload.Dragger
                    name="pdf"
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
                    <Box className={classes.uploaderInner}>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <Typography className={classes.uploadText}>
                                {t('Click_or_drag_')}
                            </Typography>
                        )}
                    </Box>
                </Upload.Dragger>
            )}
        </Box>
    )
}
