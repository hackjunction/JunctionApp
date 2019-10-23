import React, { useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import Select from 'components/inputs/Select';

import RolesFilterItem from './RolesFilterItem';

const useStyles = makeStyles(theme => ({
    items: {
        backgroundColor: '#fafafa',
        borderRadius: '7px',
        padding: theme.spacing(1)
    },
    itemsEmpty: {
        padding: theme.spacing(2),
        textAlign: 'center'
    }
}));

const RolesFilter = ({ roles, addRole, removeRole, editRole }) => {
    const classes = useStyles();

    const handleAdd = useCallback(
        role => {
            addRole({
                role,
                years: []
            });
        },
        [addRole]
    );

    const renderRoles = () => {
        if (!roles.length) {
            return (
                <Typography variant="subtitle1" className={classes.itemsEmpty}>
                    No roles selected
                </Typography>
            );
        }
        return roles.map((item, index) => (
            <RolesFilterItem
                {...item}
                key={item.role}
                onEdit={item => editRole(index, item)}
                onRemove={() => removeRole(index)}
            />
        ));
    };

    return (
        <React.Fragment>
            <Select label="Choose a role" options="role" onChange={handleAdd} />
            <Box className={classes.items}>{renderRoles()}</Box>
        </React.Fragment>
    );
};

export default RolesFilter;
