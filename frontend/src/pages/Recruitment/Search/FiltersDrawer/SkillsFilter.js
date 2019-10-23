import React, { useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import Select from 'components/inputs/Select';

import SkillsFilterItem from './SkillsFilterItem';

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

const SkillsFilter = ({ skills, addSkill, removeSkill, editSkill }) => {
    const classes = useStyles();

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
        <React.Fragment>
            <Select label="Choose a skill" options="skill" onChange={handleAdd} />
            <Box className={classes.items}>{renderSkills()}</Box>
        </React.Fragment>
    );
};

export default SkillsFilter;
