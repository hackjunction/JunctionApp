import React from 'react'

import { useSelector } from 'react-redux'

import * as OrganiserSelectors from 'reducers/organiser/selectors'

import PageWrapper from 'components/layouts/PageWrapper'
import TeamsTable from 'components/tables/TeamsTable'
import { List, ListItem, ListItemText, Typography } from '@mui/material'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const teams = useSelector(OrganiserSelectors.teams)
    const registrationsLoading = useSelector(
        OrganiserSelectors.registrationsLoading,
    )
    const challengeList = []
    const teamsLoading = useSelector(OrganiserSelectors.teamsLoading)
    if (event?.challenges && event?.challenges.length > 0) {
        challengeList.push(
            ...event?.challenges.map(challenge => ({
                ...challenge,
                teamCount: 0,
            })),
        )
        if (teams.length > 0) {
            teams.map(team => {
                challengeList.find(challenge => {
                    if (challenge._id === team.challenge) {
                        challenge.teamCount += 1
                    }
                })
            })
        }
    }

    return (
        <PageWrapper>
            {challengeList.length > 0 && (
                <>
                    <Typography
                        className="tw-font-normal tw-tracking-tight "
                        variant="subtitle1"
                    >
                        Breakdown of teams per challenge
                    </Typography>
                    <List>
                        {challengeList.map(challenge => (
                            <ListItem key={challenge._id} divider>
                                <ListItemText
                                    primary={`${challenge.name} - ${challenge.partner}`}
                                    secondary={`${challenge.teamCount} ${
                                        challenge.teamCount > 1
                                            ? 'teams'
                                            : 'team'
                                    }`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
            <TeamsTable
                loading={registrationsLoading || teamsLoading}
                teams={teams}
                simplifiedView={true}
            />
        </PageWrapper>
    )
}
