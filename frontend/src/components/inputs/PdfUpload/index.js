import React, { useCallback, useState } from 'react'
import {
    Box,
    Typography,
    CircularProgress,
    IconButton,
    Tooltip,
} from '@mui/material'
import { Upload } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import ClearIcon from '@mui/icons-material/Clear'
import { useTranslation } from 'react-i18next'
import * as AuthSelectors from 'reducers/auth/selectors'
import * as SnackbarActions from 'reducers/snackbar/actions'

const PDFUploader = ({
    value,
    onChange,
    uploadUrl,
    resizeMode = 'contain',
}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const [loading, setLoading] = useState(false)

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
        [dispatch, t],
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
        [dispatch, onChange, t],
    )

    return (
        <Box className="flex flex-col items-stretch">
            {value && value.url ? (
                <Box className="flex flex-row items-start">
                    <Box className="flex-1">
                        <a
                            href={value.url}
                            className="text-blue-500 hover:underline"
                        >
                            {value.url}
                        </a>
                    </Box>
                    <Box className="ml-2">
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
                    className="bg-gray-500 w-full cursor-pointer"
                    showUploadList={false}
                    action={uploadUrl}
                    headers={{
                        Authorization: `Bearer ${idToken}`,
                    }}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    <Box className="w-full h-24 flex flex-col justify-center items-center p-6">
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <Typography className="text-white text-center">
                                {t('Click_or_drag_')}
                            </Typography>
                        )}
                    </Box>
                </Upload.Dragger>
            )}
        </Box>
    )
}

export default PDFUploader
