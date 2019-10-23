import React, { useState, useCallback } from 'react';

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button, Typography } from '@material-ui/core';
import * as RecruitmentActions from 'redux/recruitment/actions';
import * as RecruitmentSelectors from 'redux/recruitment/selectors';

import Select from 'components/inputs/Select';

import { useArray } from 'hooks/customHooks';

import SkillsFilter from './SkillsFilter';
import RolesFilter from './RolesFilter';

const useStyles = makeStyles(theme => ({
    content: {
        flex: 1,
        overflow: 'auto',
        padding: theme.spacing(2)
    },
    title: {
        fontSize: '1.25rem',
        fontWeight: 'bold'
    },
    sectionTitle: {
        fontSize: '0.9rem'
    }
}));

const FiltersDrawer = ({ loading, onSubmit, filters, setFilters }) => {
    const classes = useStyles();

    const [skills, addSkill, removeSkill, editSkill] = useArray(filters.skills);
    const [roles, addRole, removeRole, editRole] = useArray(filters.roles);
    const [countries, setCountries] = useState(filters.countries);

    const handleSubmit = useCallback(() => {
        setFilters({
            skills,
            roles,
            countries
        });
        onSubmit();
    }, [onSubmit, setFilters, skills, roles, countries]);

    return (
        <Box flex="1" width="100%" display="flex" flexDirection="column">
            <Box className={classes.content}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="button" className={classes.title}>
                            Filter participants
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" className={classes.sectionTitle}>
                            By skillset
                        </Typography>
                        <SkillsFilter
                            skills={skills}
                            addSkill={addSkill}
                            removeSkill={removeSkill}
                            editSkill={editSkill}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" className={classes.sectionTitle}>
                            By role
                        </Typography>
                        <RolesFilter roles={roles} addRole={addRole} removeRole={removeRole} editRole={editRole} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" className={classes.sectionTitle}>
                            By country of residence
                        </Typography>
                        <Select options="country" value={countries} onChange={setCountries} isMulti={true} />
                    </Grid>
                </Grid>
            </Box>
            <Box p={2}>
                <Button disabled={loading} fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                    Search
                </Button>
            </Box>
        </Box>
    );
};

const mapState = state => ({
    loading: RecruitmentSelectors.searchResultsLoading(state),
    filters: RecruitmentSelectors.filters(state)
});

const mapDispatch = dispatch => ({
    setFilters: data => dispatch(RecruitmentActions.setFilters(data))
});

export default connect(
    mapState,
    mapDispatch
)(FiltersDrawer);
