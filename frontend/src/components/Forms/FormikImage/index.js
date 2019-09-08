import React, { useState } from 'react';
import './style.scss';

import { connect } from 'react-redux';

import { Upload, message, Progress } from 'antd';
import * as AuthSelectors from 'redux/auth/selectors';

const FormikImage = ({ name, value, onChange, aspectRatio = { w: 16, h: 9 }, fileTypes, uploadUrl, idToken }) => {
    const [percent, setPercent] = useState(null);

    function handleUploadStart() {
        setPercent(0);
    }

    function handleChange(info) {
        const status = info.file.status;
        if (status === 'uploading') {
            setPercent(info.file.percent);
        } else if (status === 'done') {
            onChange(info.file.response);
            setPercent(null);
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    function handleRemove() {
        onChange(null);
    }

    const paddingTop = (aspectRatio.h / aspectRatio.w) * 100 + '%';
    const hasImage = value && value !== null;
    const isUploading = percent !== null;

    return (
        <div className="FormikImage" style={{ paddingTop }}>
            <Upload.Dragger
                className="FormikImage--uploader"
                name="image"
                action={uploadUrl}
                headers={{
                    Authorization: `Bearer ${idToken}`
                }}
                beforeUpload={handleUploadStart}
                onChange={handleChange}
                onRemove={handleRemove}
                showUploadList={false}
            >
                <img
                    className="FormikImage--image"
                    alt="Cover"
                    src={hasImage ? value.url : require('../../../assets/images/default_cover_image.png')}
                />
                <div className="FormikImage--overlay">
                    {!isUploading ? (
                        <div className="FormikImage--overlay__content">
                            <p className="FormikImage--overlay__title">Click or drag file to this area to upload</p>
                            <p className="FormikImage--overlay__hint">
                                The uploaded image will be cropped to {aspectRatio.w}:{aspectRatio.h} aspect ratio.
                                Accepted file types: {fileTypes.join(', ')}
                            </p>
                        </div>
                    ) : (
                        <div className="FormikImage--overlay__content">
                            <Progress percent={percent} format={p => Math.floor(p) + '%'} />
                        </div>
                    )}
                </div>
            </Upload.Dragger>
        </div>
    );
};

const mapStateToProps = state => ({
    idToken: AuthSelectors.getIdToken(state)
});

export default connect(mapStateToProps)(FormikImage);
