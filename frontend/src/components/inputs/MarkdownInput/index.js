import React, { useState } from 'react'
import { Typography, Box, FormControlLabel, Switch } from '@mui/material'
import Markdown from 'components/generic/Markdown'
import TextAreaInput from 'components/inputs/TextAreaInput'

const MarkdownInput = ({
    name,
    value,
    placeholder,
    onChange,
    onBlur,
    maxLength,
}) => {
    const [isPreview, setIsPreview] = useState(false)

    return (
        <Box>
            <Box className="flex flex-wrap justify-between mb-4">
                <Typography variant="body1">
                    This field supports{' '}
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
                        className="text-blue-500 hover:underline"
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
                    <Markdown
                        source={value}
                        className="min-h-full bg-gray-100 p-4"
                    />
                ) : (
                    <TextAreaInput
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        maxLength={maxLength}
                    />
                )}
            </Box>
        </Box>
    )
}

export default MarkdownInput
