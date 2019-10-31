import React, { useCallback, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { Auth } from '@hackjunction/shared';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Divider } from '@material-ui/core';
import RequiresPermission from 'hocs/RequiresPermission';

import CenteredContainer from 'components/generic/CenteredContainer';
import PageHeader from 'components/generic/PageHeader';
import TextInput from 'components/inputs/TextInput';
import Button from 'components/generic/Button';

import * as AuthSelectors from 'redux/auth/selectors';

import { usePromise } from 'hooks/apiHooks';

import UserProfilesService from 'services/userProfiles';
import EventsService from 'services/events';
import SearchResults from './SearchResults';

const RecruitmentAdminPage = ({ idToken }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const recruiters = usePromise(() => UserProfilesService.getRecruiters(idToken));
    const searchResults = usePromise(terms => UserProfilesService.queryUsers(idToken, terms));
    const events = usePromise(() => EventsService.getPublicEvents());

    useEffect(() => {
        recruiters.fetch();
        events.fetch();
    }, []);

    const updateSearchResults = useCallback(() => {
        searchResults.fetch(searchQuery);
    }, [searchResults, searchQuery]);

    return (
        <CenteredContainer>
            <PageHeader heading="Recruitment admin" subheading="Manage access to recruitment dashboard" />
            <Typography variant="h6">Add recruiters</Typography>
            <Box display="flex" flexDirection="row" alignItems="flex-end" mb={1}>
                <TextInput label="Search users by name or email" value={searchQuery} onChange={setSearchQuery} />
                <Box p={1} />
                <Button
                    disabled={searchQuery.length === 0}
                    color="primary"
                    variant="contained"
                    onClick={updateSearchResults}
                >
                    Search
                </Button>
            </Box>
            <SearchResults events={events.data} results={searchResults.data} loading={searchResults.loading} />
            <Box mt={5} />
            <Typography variant="h6" paragraph>
                Manage recruiters
            </Typography>
            {recruiters.data && events.data && recruiters.data.length > 0 ? (
                <List style={{ backgroundColor: 'white' }}>
                    {recruiters.data.map((user, index) => [
                        index !== 0 ? <Divider /> : null,
                        <ListItem>
                            <ListItemText
                                primary={`${user.firstName} ${user.lastName}, ${user.recruiterOrganisation}`}
                                secondary={
                                    'Can access: ' +
                                    events.data
                                        .filter(event => {
                                            return user.recruiterEvents.indexOf(event.slug) !== -1;
                                        })
                                        .map(event => event.name)
                                        .join(', ')
                                }
                            />
                            <ListItemSecondaryAction>
                                <Button color="secondary">Revoke access</Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ])}
                </List>
            ) : (
                <Typography>No recruiters found</Typography>
            )}
        </CenteredContainer>
    );
};

const mapState = state => ({
    idToken: AuthSelectors.getIdToken(state)
});

export default RequiresPermission(connect(mapState)(RecruitmentAdminPage), [Auth.Permissions.MANAGE_RECRUITMENT]);
