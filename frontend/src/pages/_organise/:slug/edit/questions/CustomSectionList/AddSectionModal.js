import React, { useState, useCallback, useEffect } from 'react'

import {
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControlLabel,
    Switch,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MarkdownInput from 'components/inputs/MarkdownInput'
import Button from 'components/generic/Button'
import TextInput from 'components/inputs/TextInput'

const useStyles = makeStyles(theme => ({
    label: {
        fontWeight: 'bold',
    },
}))

export default ({
    visible,
    onVisibleChange,
    onSubmit,
    onEditDone,
    onEditCancel,
    editing,
    reservedNames,
}) => {
    const classes = useStyles()
    const [data, setData] = useState({})
    const [isConditional, setIsConditional] = useState(false)

    useEffect(() => {
        if (editing) {
            setData(editing)
            setIsConditional(typeof editing.conditional !== undefined)
        }
    }, [editing])

    const reset = () => {
        setData({})
        setIsConditional(false)
    }

    const validate = () => {
        if (!data.label) {
            return 'Please give your section a title'
        }

        if (!data.name) {
            return 'Please give your section a machine name'
        }

        if (!editing) {
            if (reservedNames.indexOf(data.name) !== -1) {
                return `The machine-name ${data.name} is already taken, please use something else`
            }
        }

        if (isConditional && !data.conditional) {
            return 'Please give your section a conditional question, or set it to always visible'
        }
    }

    const handleAdd = () => {
        const error = validate()
        if (error) {
            window.alert(error)
        } else {
            onSubmit({
                ...data,
                conditional: isConditional ? data.conditional : undefined,
            })
            onVisibleChange(false)
            reset()
        }
    }

    const handleEdit = () => {
        const error = validate()
        if (error) {
            window.alert(error)
        } else {
            onEditDone({
                ...data,
                conditional: isConditional ? data.conditional : undefined,
            })
            reset()
        }
    }

    const handleCancel = () => {
        if (editing) {
            onEditCancel()
        } else {
            onVisibleChange(false)
        }
    }

    const handleChange = useCallback(
        (field, value) => {
            setData({
                ...data,
                [field]: value,
            })
        },
        [data]
    )

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={visible || editing}
            onClose={handleCancel}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                {editing ? `Edit ${editing.label}` : 'Add a new section'}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" className={classes.label}>
                    Section title
                </Typography>
                <TextInput
                    placeholder="My custom section"
                    value={data.label}
                    onChange={value => handleChange('label', value)}
                />
                <Typography variant="caption" gutterBottom>
                    The displayed name of your section
                </Typography>
                <Typography variant="body1" className={classes.label}>
                    Machine name
                </Typography>
                <TextInput
                    placeholder="my-custom-section"
                    value={data.name}
                    onChange={value => handleChange('name', value)}
                />
                <Typography variant="caption" gutterBottom>
                    A machine-readable name for the section
                </Typography>
                <Box p={1} />
                <Typography variant="body1" className={classes.label}>
                    Description
                </Typography>
                <MarkdownInput
                    value={data.description}
                    onChange={value => handleChange('description', value)}
                />
                <Box p={1} />
                <Typography variant="body1" className={classes.label}>
                    Visibility
                </Typography>
                <Typography variant="caption" width="100%" gutterBottom>
                    Do you want this section to be visible always, or have the
                    user answer a yes/no question to expand it?
                </Typography>
                <Box width="100%">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isConditional}
                                onChange={(e, value) => setIsConditional(value)}
                                color="primary"
                            />
                        }
                        label="Is this a conditional field?"
                    />
                </Box>
                {isConditional && (
                    <>
                        <Box p={1} />
                        <Typography variant="body1" className={classes.label}>
                            Conditional question
                        </Typography>
                        <Typography width="100%" variant="caption" gutterBottom>
                            What is the yes/no question you want to ask? When
                            choosing yes, the questions in this section will be
                            shown
                        </Typography>
                        <TextInput
                            placeholder="Do you want to also apply to My Awesome Side Event?"
                            value={data.conditional}
                            onChange={value =>
                                handleChange('conditional', value)
                            }
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCancel}
                    color="theme_lightgray"
                    variant="contained"
                >
                    Cancel
                </Button>
                <Box p={1} />
                <Button
                    onClick={editing ? handleEdit : handleAdd}
                    color="primary"
                    variant="contained"
                >
                    {editing ? 'Save edits' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
