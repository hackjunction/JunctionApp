import React, { useState } from 'react';
import styles from './MarkdownInput.module.scss';

import { Typography, Box, FormControlLabel, Switch } from '@material-ui/core';
import Markdown from 'components/generic/Markdown';
import TextAreaInput from 'components/inputs/TextAreaInput';

const MarkdownInput = ({ name, value, placeholder, onChange, onBlur }) => {
    const [isPreview, setIsPreview] = useState(false);

    return (
        <Box>
            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">
                    This field supports{' '}
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
                    >
                        markdown
                    </a>
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isPreview}
                            onChange={(e, value) => setIsPreview(value)}
                            value="checkedB"
                            color="primary"
                        />
                    }
                    label="Preview"
                />
            </Box>
            <Box mt={2}>
                {isPreview ? (
                    <Markdown source={value} className={styles.preview} />
                ) : (
                    <TextAreaInput placeholder={placeholder} value={value} onChange={onChange} />
                )}
            </Box>
        </Box>
    );
};

export default MarkdownInput;
