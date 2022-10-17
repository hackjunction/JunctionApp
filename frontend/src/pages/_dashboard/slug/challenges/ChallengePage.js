import { Box, makeStyles } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import Button from 'components/generic/Button'
import Markdown from 'components/generic/Markdown'
import PageHeader from 'components/generic/PageHeader'
import React from 'react'

const useStyles = makeStyles(theme => ({
    companyLogo: {
        width: '200px',
        marginRight: '24px',
    },
    outboundLink: {
        '& a': {
            textDecoration: 'none !important',
        },
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
    },
    subtitle: {
        color: theme.palette.theme_orange.main,
    },
}))

export default ({
    onClose,
    description,
    title,
    partner,
    insights,
    resources,
    prizes,
    criteria,
    companyInfo,
    logo,
}) => {
    const classes = useStyles()

    return (
        <>
            <Button
                variant="contained"
                color="theme_turquoise"
                startIcon={<ArrowBack />}
                onClick={onClose}
            >
                Back to all Challenges
            </Button>
            <Box className={classes.wrapper} pt={8} pb={3}>
                {logo && (
                    <img
                        alt={partner}
                        src={logo.url}
                        className={classes.companyLogo}
                    />
                )}
                <PageHeader heading={title} />
            </Box>

            {description && (
                <>
                    <h1 className={classes.subtitle}>The challenge</h1>
                    <Markdown source={description} />
                </>
            )}
            <br />
            {insights && (
                <>
                    <h1 className={classes.subtitle}>Insights</h1>
                    <Markdown source={insights} />
                </>
            )}
            <br />
            {resources && (
                <>
                    <h1 className={classes.subtitle}>What we'll bring</h1>
                    <Markdown source={resources} />
                </>
            )}
            <br />
            {prizes && (
                <>
                    <h1 className={classes.subtitle}>The Prizes</h1>
                    <Markdown source={prizes} />
                </>
            )}
            <br />
            {criteria && (
                <>
                    <h1 className={classes.subtitle}>Judging criteria</h1>
                    <Markdown source={criteria} />
                </>
            )}
            <br />
            {companyInfo && (
                <>
                    <h1 className={classes.subtitle}>About the company</h1>
                    <Markdown source={companyInfo} />
                </>
            )}
        </>
    )
}