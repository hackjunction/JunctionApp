import React, { useCallback, useState } from 'react';

import { Box, Typography, CircularProgress, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Upload } from 'antd';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';

import * as AuthSelectors from 'redux/auth/selectors';

const useStyles = makeStyles(theme => ({
    uploader: {
        background: 'gray',
        width: '100%',
        cursor: 'pointer'
    },
    uploaderInner: {
        width: '100%',
        height: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(3)
    },
    uploadText: {
        color: 'white',
        textAlign: 'center'
    }
}));

const PdfUpload = ({ value, onChange, uploadUrl, resizeMode = 'contain', enqueueSnackbar, idToken }) => {
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const beforeUpload = useCallback(
        file => {
            const isPDF = file.type === 'application/pdf';
            if (!isPDF) {
                enqueueSnackbar('Please upload a .pdf file');
            }
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isLt10M) {
                enqueueSnackbar('Upload size cannot be more than 10MB');
            }
            return isPDF && isLt10M;
        },
        [enqueueSnackbar]
    );

    const handleRemove = useCallback(() => {
        onChange();
    }, [onChange]);

    const handleChange = useCallback(
        info => {
            if (info.file.status === 'uploading') {
                setLoading(true);
                return;
            }
            if (info.file.status === 'done') {
                onChange(info.file.response);
                setLoading(false);
            }

            if (info.file.status === 'error') {
                if (info.file.response && info.file.response.message) {
                    enqueueSnackbar(info.file.response.message, { variant: 'error' });
                } else {
                    enqueueSnackbar('Something went wrong... Please try again', { variant: 'error' });
                }
                setLoading(false);
            }
        },
        [onChange, enqueueSnackbar]
    );

    return (
        <Box display="flex" flexDirection="column" alignItems="stretch">
            {value && value.url ? (
                <Box flex="1" display="flex" flexDirection="row" alignItems="flex-start">
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
                        Authorization: `Bearer ${idToken}`
                    }}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    <Box className={classes.uploaderInner}>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <Typography className={classes.uploadText}>Click or drag a file to upload</Typography>
                        )}
                    </Box>
                </Upload.Dragger>
            )}
        </Box>
    );
};

const mapState = state => ({
    idToken: AuthSelectors.getIdToken(state)
});

export default withSnackbar(connect(mapState)(PdfUpload));
