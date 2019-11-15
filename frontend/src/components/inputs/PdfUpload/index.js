import React, { useCallback, useState } from 'react';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Upload } from 'antd';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';

import * as AuthSelectors from 'redux/auth/selectors';

const useStyles = makeStyles(theme => ({
    uploadButton: {
        background: 'black',
        borderRadius: '7px',
        cursor: 'pointer',
        width: '250px',
        display: 'flex'
    },
    uploadButtonText: {
        color: 'white',
        width: '100%',
        textAlign: 'center'
    }
}));

const PdfUpload = ({ value, onChange, uploadUrl, resizeMode = 'contain', enqueueSnackbar, idToken }) => {
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    console.log('VALUE', value);

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

    const handleChange = useCallback(
        info => {
            console.log('INFO', info);
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
        <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Upload
                name="pdf"
                listType="picture"
                // className={classes.uploader}
                showUploadList={false}
                action={uploadUrl}
                headers={{
                    Authorization: `Bearer ${idToken}`
                }}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                <Box p={2} className={classes.uploadButton}>
                    <Typography variant="button" className={classes.uploadButtonText}>
                        Upload .PDF
                    </Typography>
                </Box>
            </Upload>
        </Box>
    );
};

const mapState = state => ({
    idToken: AuthSelectors.getIdToken(state)
});

export default withSnackbar(connect(mapState)(PdfUpload));
