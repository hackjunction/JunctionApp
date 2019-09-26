import React, { useState, useEffect, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Menu, MenuItem, Paper, Box } from '@material-ui/core';

import FilterForm from './FilterForm';
import FilterList from './FilterList';
import FilterSaveForm from './FilterSaveForm';

const useStyles = makeStyles(theme => ({
    root: {},
}));

const FilterGroupMenu = ({ onChange }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [selected, setSelected] = useState();
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        if (selected) {
            setFilters(selected.filters);
        } else {
            setFilters([]);
        }
    }, [selected]);

    useEffect(() => {
        onChange(filters);
    }, [filters, onChange]);

    const handleFilterAdd = useCallback(
        filter => {
            setFilters(filters.concat(filter));
        },
        [filters]
    );

    const handleClickListItem = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = option => {
        if (option.isDefault) {
            setSelected();
        } else {
            setSelected(option);
        }
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const options = [
        {
            id: 'default',
            label: 'All participants',
            description: 'Show all participants',
            filters: [],
            isDefault: true
        },
        {
            id: 'terminal-accepted',
            label: 'Terminal accepted',
            description: 'Accepted to Terminal & confirmed participation',
            filters: [
                {
                    label: 'Tags',
                    path: 'tags',
                    type: 'CONTAINS',
                    value: 'Accepted to Terminal'
                },
                {
                    label: 'Status',
                    path: 'status',
                    type: 'EQUALS',
                    value: 'confirmed'
                }
            ]
        },
        {
            id: 'custom',
            label: 'Custom filter',
            description: 'Create a new custom filter group',
            filters: [],
            isAdd: true,
        }
    ];

    const activeItem = selected || options[0];

    return (
        <Paper className={classes.root}>
            <List component="nav" aria-label="Selected filter group">
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="when device is locked"
                    onClick={handleClickListItem}
                >
                    <ListItemText primary={activeItem.label} secondary={activeItem.description} />
                </ListItem>
            </List>
            <Menu id="lock-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                {options.map((option, index) => (
                    <MenuItem
                        key={option.id}
                        selected={option.id === activeItem.id}
                        onClick={() => handleMenuItemClick(option)}
                    >
                        <ListItemText primary={option.label} secondary={option.description} />
                    </MenuItem>
                ))}
            </Menu>
            {!activeItem.isDefault && (
                <Box p={2}>
                    <FilterForm onSubmit={handleFilterAdd} />
                    <FilterList filters={filters} onChange={setFilters} />
                    <FilterSaveForm filters={filters} activeItem={activeItem} />
                </Box>
            )}
        </Paper>
    );
};

export default FilterGroupMenu;
