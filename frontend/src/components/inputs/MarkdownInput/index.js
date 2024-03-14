import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Typography, Box, FormControlLabel, Switch } from '@material-ui/core'
import Markdown from 'components/generic/Markdown'
import TextAreaInput from 'components/inputs/TextAreaInput'

const useStyles = makeStyles(theme => ({
    top: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(2),
    },
    preview: {
        minHeight: '100%',
        background: '#f8f8f8',
        padding: theme.spacing(2),
    },
}))

export default ({ name, value, placeholder, onChange, onBlur, maxLength }) => {
    const classes = useStyles()
    const [isPreview, setIsPreview] = useState(false)

    return (
        <Box>
            <Box className={classes.top}>
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
                    <Markdown source={value} className={classes.preview} />
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
