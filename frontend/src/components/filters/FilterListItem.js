import React from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { FilterTypes } from '@hackjunction/shared';

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline'
    }
}));

const FilterListItem = ({ filter = {}, onRemove }) => {
    const classes = useStyles();
    const getType = () => {
        const params = FilterTypes.filterTypes[filter.type];
        return params ? params.label : filter.type;
    };

    return (
        <ListItem>
            <ListItemText
                primary={filter.label}
                secondary={
                    <React.Fragment>
                        <Typography variant="body2" className={classes.inline} color="textPrimary">
                            {getType()}
                        </Typography>{' '}
                        {filter.value}
                    </React.Fragment>
                }
            />
            {typeof onRemove === 'function' && (
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={onRemove}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            )}
        </ListItem>
    );
};

export default FilterListItem;
