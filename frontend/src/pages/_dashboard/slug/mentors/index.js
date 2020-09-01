import React, { useState, useEffect } from 'react'
import { Box, Typography, Divider } from '@material-ui/core'

import HackerpackDetail from 'components/hackerpack/HackerpackDetail'
import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'

import MentorsService from 'services/mentors'

export default () => {
    const [mentors, setMentors] = useState([])

    useEffect(() => {
        MentorsService.getFullMentors().then(mentors => {
            if (mentors) setMentors(mentors)
        })
    }, [])

    return (
        <>
            <PageHeader
                heading="Hackerpack"
                // subheading="We want you to be able to fully focus on making your hackathon project as cool as possible! These software provided by our partners will help you unleash your creativity and maximize your learning during our events."
            />
            <PageWrapper loading={false}>
                <Divider variant="middle" />
                {mentors.map(mentor => (
                    <HackerpackDetail partner={mentor} redeemable={true} />
                ))}
            </PageWrapper>
        </>
    )
}
