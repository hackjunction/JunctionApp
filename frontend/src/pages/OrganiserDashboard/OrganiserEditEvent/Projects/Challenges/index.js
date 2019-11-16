import React, { useState, useMemo, useCallback, forwardRef } from 'react';
import { connect } from 'react-redux';
import { Paper, Grid } from '@material-ui/core';
import { withSnackbar } from 'notistack';

import Select from 'components/inputs/Select';
import Button from 'components/generic/Button';
import MaterialTable from 'components/generic/MaterialTable';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';
import * as AuthSelectors from 'redux/auth/selectors';

import ProjectsService from 'services/projects';

const ChallengesTab = ({ event, projects, projectsLoading, idToken, enqueueSnackbar }) => {
    const [challenge, setChallenge] = useState(event.challenges[0].slug);
    const [link, setLink] = useState('');
    const [linkLoading, setLinkLoading] = useState(false);

    const filtered = useMemo(() => {
        return projects.filter(project => {
            return project.challenges && project.challenges.indexOf(challenge) !== -1;
        });
    }, [projects, challenge]);

    const handleGenerateLink = useCallback(async () => {
        setLinkLoading(true);
        try {
            const link = await ProjectsService.generateChallengeLink(idToken, event.slug, challenge);
            setLink(link);
        } catch (err) {
            enqueueSnackbar('Oops, something went wrong...', { variant: 'error' });
        }
        setLinkLoading(false);
    }, [idToken, event, challenge, enqueueSnackbar]);

    console.log('DA LINK', link);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} style={{ position: 'relative', zIndex: 10000 }}>
                <Select
                    label="Choose challenge"
                    options={event.challenges.map(challenge => ({
                        label: `${challenge.name} (${challenge.partner})`,
                        value: challenge.slug
                    }))}
                    value={challenge}
                    onChange={setChallenge}
                />
            </Grid>
            <Grid item xs={12}>
                <MaterialTable
                    title="Projects"
                    showCount
                    isLoading={projectsLoading}
                    data={filtered}
                    // onRowClick={(e, row) => setEditing(row.user)}
                    // onSelectionChange={rows => setSelected(rows.map(r => r.user))}
                    // actions={
                    //     !minimal
                    //         ? [
                    //               {
                    //                   icon: forwardRef((props, ref) => <EmailIcon {...props} ref={ref} />),
                    //                   tooltip: 'Email selected',
                    //                   onClick: toggleBulkEmail
                    //               },
                    //               {
                    //                   icon: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
                    //                   tooltip: 'Edit selected',
                    //                   onClick: toggleBulkEdit
                    //               }
                    //           ]
                    //         : []
                    // }
                    options={{
                        exportButton: true,
                        selection: false,
                        showSelectAllCheckbox: false,
                        pageSizeOptions: [5, 25, 50],
                        debounceInterval: 500,
                        search: false,
                        paging: true
                    }}
                    localization={{
                        toolbar: {
                            searchPlaceholder: 'Search by name/email',
                            nRowsSelected: '{0} selected'
                        }
                    }}
                    components={{
                        Container: forwardRef((props, ref) => <Paper {...props} ref={ref} />)
                    }}
                    columns={[
                        {
                            title: 'Name',
                            field: 'name',
                            searchable: true
                        },
                        {
                            title: 'Location',
                            field: 'location',
                            searchable: true
                        },
                        {
                            title: 'Punchline',
                            field: 'punchline',
                            searchable: true
                        }
                    ]}
                />
            </Grid>
            <Grid item xs={12}>
                {link && link.link ? (
                    <a href={link.link} target="_blank" rel="noopener noreferrer">
                        {link.link}
                    </a>
                ) : (
                    <Button
                        onClick={handleGenerateLink}
                        loading={linkLoading}
                        color="theme_turquoise"
                        variant="contained"
                    >
                        Generate partner link
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    projects: OrganiserSelectors.projects(state),
    projectsLoading: OrganiserSelectors.projectsLoading(state),
    idToken: AuthSelectors.getIdToken(state)
});

export default withSnackbar(connect(mapState)(ChallengesTab));
