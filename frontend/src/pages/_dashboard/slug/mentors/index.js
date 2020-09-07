import React, { useState, useEffect } from 'react'
import { Box, Typography, Divider, Grid } from '@material-ui/core'
import { useRouteMatch } from 'react-router'

import MentorDetail from 'components/mentors/MentorDetail'
import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'

import MentorsService from 'services/mentors'

export default () => {
    const [mentors, setMentors] = useState([])
    const match = useRouteMatch()

    const slug = match.path.slice(11).split('/')[0].toString()

    useEffect(() => {
        console.log('Match', match)
        console.log('Slug in Dashboard', slug)
        MentorsService.getMentorsBySlug(slug).then(mentors => {
            if (mentors) setMentors(mentors)
        })
    }, [match, slug])

    return (
        <>
            <PageHeader heading="Mentors" />
            <PageWrapper loading={false}>
                <Divider variant="middle" />
                <Grid container direction="row" spacing={2}>
                    {mentors.map(mentor => (
                        <MentorDetail mentor={mentor} redeemable={true} />
                    ))}
                </Grid>
            </PageWrapper>
        </>
    )
}
