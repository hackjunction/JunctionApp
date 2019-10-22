import React, { useCallback } from 'react';

import { Input, Select } from 'antd';
import { findIndex } from 'lodash-es';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Box,
    Divider,
    Grid,
    Button,
    Typography
} from '@material-ui/core';

import Tag from 'components/generic/Tag';

import { makeStyles } from '@material-ui/core/styles';
import { useFormField } from 'hooks/formHooks';

const COLORS = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];

const useStyles = makeStyles(theme => ({
    errorMessage: {
        color: theme.palette.error.main
    }
}));

const EventTagsForm = ({ value = [], fieldName, setFieldValue }) => {
    const classes = useStyles();
    const label = useFormField('', value => {
        if (!value || value.length === 0) {
            return 'Tag name is required';
        }
        if (value.length > 30) {
            return 'Tag name can be at most 30 characters';
        }
        if (findIndex(value, tag => tag.label === value) !== -1) {
            return `A tag with the name ${value} already exists`;
        }

        return;
    });
    const color = useFormField(undefined, value => {
        if (!value || value.length === 0) {
            return 'Tag color is required';
        }

        return;
    });
    const description = useFormField('', value => {
        if (!value || value.length === 0) {
            return 'Please give a short description for your tag';
        }

        if (value.length > 200) {
            return 'Tag description must be under 200 characters';
        }
    });

    const resetForm = useCallback(() => {
        label.reset();
        color.reset();
        description.reset();
    }, [label, color, description]);

    const handleAdd = useCallback(() => {
        const items = [label, color, description];
        let passing = true;
        items.forEach(item => {
            const err = item.validate(item.value);
            if (err) {
                item.setError(err);
                passing = false;
            }
        });

        if (!passing) {
            return;
        } else {
            setFieldValue(
                fieldName,
                value.concat({ label: label.value, color: color.value, description: description.value })
            );
            resetForm();
        }
    }, [value, fieldName, color, label, description, resetForm, setFieldValue]);

    const handleDelete = useCallback(
        label => {
            setFieldValue(fieldName, value.filter(tag => tag.label !== label));
        },
        [setFieldValue, fieldName, value]
    );

    const renderRows = () => {
        if (!value) return null;
        return value.map((item, index) => [
            index !== 0 ? <Divider /> : null,
            <ListItem>
                <ListItemText
                    primary={
                        <Box mb={0.5}>
                            <Tag color={item.color} label={item.label} />
                        </Box>
                    }
                    secondary={item.description}
                />
                <ListItemSecondaryAction>
                    <IconButton onClick={() => handleDelete(item.label)} edge="end" aria-label="comments">
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ]);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Input placeholder="Tag name" size="large" {...label} />
                <Typography variant="caption" className={classes.errorMessage}>
                    {label.error}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Choose color"
                    size="large"
                    value={color.value}
                    onChange={color.setValue}
                >
                    {COLORS.map(color => (
                        <Select.Option key={color} value={color}>
                            <Tag color={color} label={color} />
                        </Select.Option>
                    ))}
                </Select>
                <Typography variant="caption" className={classes.errorMessage}>
                    {color.error}
                </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
                <Input placeholder="Tag description" size="large" {...description} />
                <Typography variant="caption" className={classes.errorMessage}>
                    {description.error}
                </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                <Button fullWidth variant="contained" color="primary" onClick={handleAdd}>
                    Add
                </Button>
            </Grid>
            <Grid item xs={12}>
                <List>{renderRows()}</List>
            </Grid>
        </Grid>
    );
};

export default EventTagsForm;
