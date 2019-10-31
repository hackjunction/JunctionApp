import React, { useCallback } from 'react';

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import { useArray } from 'hooks/customHooks';
import Select from 'components/inputs/Select';
import * as RecruitmentSelectors from 'redux/recruitment/selectors';
import * as RecruitmentActions from 'redux/recruitment/actions';

import FilterItem from './FilterItem';
import SkillsFilterItem from './SkillsFilterItem';

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

const SkillsFilter = ({ filters, setFilters }) => {
    const [skills, addSkill, removeSkill, editSkill] = useArray([]);
    const classes = useStyles();

    const handleSubmit = useCallback(() => {
        setFilters(skills);
    }, [skills, setFilters]);

    const handleAdd = useCallback(
        skill => {
            addSkill({
                skill,
                levels: []
            });
        },
        [addSkill]
    );

    const renderSkills = () => {
        if (!skills.length) {
            return (
                <Typography variant="subtitle1" className={classes.itemsEmpty}>
                    No skills selected
                </Typography>
            );
        }
        return skills.map((item, index) => (
            <SkillsFilterItem
                {...item}
                key={item.skill}
                onEdit={item => editSkill(index, item)}
                onRemove={() => removeSkill(index)}
            />
        ));
    };

    return (
        <FilterItem label="Skills" active={skills.length > 0} onClose={handleSubmit}>
            <Box className={classes.wrapper}>
                <Select label="Add a skill" options="skill" onChange={handleAdd} />
                <Box className={classes.items}>{renderSkills()}</Box>
            </Box>
        </FilterItem>
    );
};

const mapState = state => ({
    filters: RecruitmentSelectors.filters(state).skills || []
});

const mapDispatch = dispatch => ({
    setFilters: value => dispatch(RecruitmentActions.setFiltersField('skills', value))
});

export default connect(
    mapState,
    mapDispatch
)(SkillsFilter);
