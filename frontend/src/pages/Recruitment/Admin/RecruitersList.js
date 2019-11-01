import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    CircularProgress
} from '@material-ui/core';
import Empty from 'components/generic/Empty';
import Button from 'components/generic/Button';

import * as RecruitmentActions from 'redux/recruitment/actions';
import * as RecruitmentSelectors from 'redux/recruitment/selectors';

const RecruitersList = ({ updateRecruiters, recruiters, events, loading, onRevoke }) => {
    useEffect(() => {
        updateRecruiters();
    }, []);

    if (loading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center">
                <CircularProgress size={24} />
            </Box>
        );
    }

    if (recruiters.length === 0) {
        return <Empty isEmpty emptyText="No recruiters" hideIfNotEmpty />;
    }
    return (
        <Box>
            <List style={{ backgroundColor: 'white' }}>
                {recruiters.map((user, index) => [
                    index !== 0 ? <Divider key={user.userId + 'divider'} /> : null,
                    <ListItem key={user.userId}>
                        <ListItemText
                            primary={`${user.firstName} ${user.lastName}, ${user.recruiterOrganisation}`}
                            secondary={
                                'Can access: ' +
                                events
                                    .filter(event => {
                                        return user.recruiterEvents.indexOf(event.slug) !== -1;
                                    })
                                    .map(event => event.name)
                                    .join(', ')
                            }
                        />
                        <ListItemSecondaryAction>
                            <Button color="secondary" onClick={() => onRevoke(user.userId)}>
                                Revoke access
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                ])}
            </List>
        </Box>
    );
};

const mapState = state => ({
    events: RecruitmentSelectors.events(state),
    recruiters: RecruitmentSelectors.adminRecruiters(state),
    loading: RecruitmentSelectors.adminRecruitersLoading(state)
});

const mapDispatch = dispatch => ({
    updateRecruiters: () => dispatch(RecruitmentActions.updateAdminRecruiters())
});

export default connect(
    mapState,
    mapDispatch
)(RecruitersList);
