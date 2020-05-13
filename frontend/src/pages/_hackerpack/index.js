import React, { useState, useEffect } from 'react'
import { Box, Typography, Divider, Button } from '@material-ui/core'

import CompanySection from 'components/hackerpack/CompanySection'
import PageHeader from 'components/generic/PageHeader'
import Footer from 'components/layouts/Footer'
import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import CenteredContainer from 'components/generic/CenteredContainer'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import HackerpackService from 'services/hackerpack'

const useStyles = makeStyles(theme => ({
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(3),
        background: 'black',
        color: 'white',
    },
}))

export default () => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const [hackerpack, setHackerpack] = useState([])

    useEffect(() => {
        HackerpackService.getFullHackerpack().then(pack => {
            if (pack) setHackerpack(pack)
        })
    }, [])

    return (
        <PageWrapper
            loading={false}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
        >
            <CenteredContainer wrapperClass={classes.backButtonWrapper}>
                <Button onClick={() => dispatch(push('/'))}>
                    <ArrowBackIosIcon style={{ color: 'black' }} />
                    <Typography variant="button" style={{ color: 'black' }}>
                        Back
                    </Typography>
                </Button>
            </CenteredContainer>
            <CenteredContainer>
                <PageHeader
                    heading="Hackerpack"
                    subheading="We want you to be able to fully focus on making your hackathon project as cool as possible! These software provided by our partners will help you unleash your creativity and maximize your learning during our events."
                />
                <Divider variant="middle" />
                {hackerpack.map(company => (
                    <React.Fragment>
                        <Box p={2}>
                            <CompanySection
                                name={company.name}
                                description={company.description}
                                icon={company.icon}
                                link={company.link}
                            />
                        </Box>
                        <Divider variant="middle" />
                    </React.Fragment>
                ))}
                <Box p={2}>
                    <Typography color="textSecondary" variant="subtitle1">
                        Anything you would like to see here in the future?
                        Contact us at partnerships@hackjunction.com with your
                        suggestion.
                    </Typography>
                </Box>
            </CenteredContainer>
        </PageWrapper>
    )
}
