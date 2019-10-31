import React, { useCallback } from 'react';

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import { useArray } from 'hooks/customHooks';
import Select from 'components/inputs/Select';
import * as RecruitmentSelectors from 'redux/recruitment/selectors';
import * as RecruitmentActions from 'redux/recruitment/actions';

import RolesFilterItem from './RolesFilterItem';
import FilterItem from './FilterItem';

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '400px',
        minHeight: '400px'
    },
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

const RolesFilter = ({ filters, setFilters }) => {
    const classes = useStyles();
    const [roles, addRole, removeRole, editRole] = useArray([]);

    const handleSubmit = useCallback(() => {
        setFilters(roles);
    }, [roles, setFilters]);

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
        <FilterItem label="Roles" active={roles.length > 0} onClose={handleSubmit}>
            <Box className={classes.wrapper}>
                <Select label="Add a role" options="role" onChange={handleAdd} />
                <Box className={classes.items}>{renderRoles()}</Box>
            </Box>
        </FilterItem>
    );
};

const mapState = state => ({
    filters: RecruitmentSelectors.filters(state).roles || []
});

const mapDispatch = dispatch => ({
    setFilters: value => dispatch(RecruitmentActions.setFiltersField('roles', value))
});

export default connect(
    mapState,
    mapDispatch
)(RolesFilter);
