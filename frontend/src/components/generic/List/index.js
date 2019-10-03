import React from 'react';

import objectPath from 'object-path';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}));

const _List = ({
    data = [],
    rowKey,
    renderPrimary = () => {},
    renderSecondary = () => {},
    emptyView = null,
    onDelete,
    hasDividers = true
}) => {
    const classes = useStyles();
    if (data.length === 0) {
        return emptyView;
    }

    return (
        <List className={classes.root}>
            {data.map((item, index) => (
                <React.Fragment key={objectPath.get(item, rowKey)}>
                    {index !== 0 && <Divider />}
                    <ListItem>
                        <ListItemText primary={renderPrimary(item)} secondary={renderSecondary(item)} />
                        {onDelete && (
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item, index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        )}
                    </ListItem>
                </React.Fragment>
            ))}
        </List>
    );
};

export default _List;
