import React from 'react'
import { Roles, Misc } from '@hackjunction/shared'
import { Box, Chip, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import GradientBox from 'components/generic/GradientBox'
import SkillRating from '../../../pages/_dashboard/renderDashboard/partner/partnerrecruitment/default/SearchResults/SkillRating'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: '0.2rem',
        padding: '4px',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',

        width: '100%',
        padding: '4px',
        gap: '4px',
    },
    experience: {
        lineHeight: 1.1,
        variant: theme.typography.body1,

        padding: '2px',
    },
    years: {
        lineHeight: 1.1,
        variant: theme.typography.body1,
        color: theme.palette.grey[600],
        padding: '2px',
    },

    skills: {
        padding: '4px',
    },
    boxStyle: {},
}))

const makeBoxStyles = () => ({
    backgroundColor: '#f7fafc',
    border: `2px solid #e2e8f0`,
    borderRadius: '6px',
    height: '100%',

    //TODO: blurr the bottom

    // backgroundColor: '#f8f8f8',
})

export default ({ user = {} }) => {
    const classes = useStyles()
    const { t } = useTranslation()

    const renderRecruitmentStatus = () => {
        switch (user.recruitmentOptions?.status) {
            case Misc.recruitmentStatuses.items['actively-looking'].id:
                return (
                    <Chip
                        label={
                            'Recruitment: ' +
                            Misc.recruitmentStatuses.items['actively-looking']
                                .label
                        }
                        color="primary"
                        variant="outlined"
                    />
                )
            case Misc.recruitmentStatuses.items['up-for-discussions'].id:
                return (
                    <Chip
                        label={
                            'Recruitment: ' +
                            Misc.recruitmentStatuses.items['up-for-discussions']
                                .label
                        }
                        color="secondary"
                        variant="outlined"
                    />
                )
            default:
                return null
        }
    }

    const renderRelocationStatus = () => {
        switch (user.recruitmentOptions?.relocation) {
            case Misc.relocationOptions.items['looking-for-change'].id:
                return (
                    <Chip
                        label={
                            'Relocation: ' +
                            Misc.relocationOptions.items['looking-for-change']
                                .label
                        }
                        color="primary"
                        variant="outlined"
                    />
                )
            case Misc.relocationOptions.items['willing-to-relocate'].id:
                return (
                    <Chip
                        label={
                            'Relocation: ' +
                            Misc.relocationOptions.items['willing-to-relocate']
                                .label
                        }
                        color="primary"
                        variant="outlined"
                    />
                )
            case Misc.relocationOptions.items['not-currently'].id:
                return (
                    <Chip
                        label={
                            'Relocation: ' +
                            Misc.relocationOptions.items['not-currently'].label
                        }
                        color="secondary"
                        variant="outlined"
                    />
                )
            default:
                return null
        }
    }

    return (
        <>
            <div className="tw-rounded-lg tw-shadow-md tw-bg-white tw-p-8 tw-flex tw-flex-col tw-gap-4">
                {user.profile.biography && (
                    <div>
                        <Typography
                            className="tw-tracking-tight tw-font-medium"
                            variant="h5"
                            component="h5"
                        >
                            {t('Biography_')}
                        </Typography>
                        <Typography
                            className="tw-text-lg"
                            variant="body1"
                            component="p"
                        >
                            {user.profile.biography}
                        </Typography>
                    </div>
                )}
                {user.recruitmentOptions && (
                    <div className="tw-flex tw-flex-wrap tw-gap-4">
                        <Box ml={0.5} mr={0.5} mb={0.5}>
                            {renderRecruitmentStatus()}
                        </Box>
                        <Box ml={0.5} mr={0.5} mb={0.5}>
                            {renderRelocationStatus()}
                        </Box>
                    </div>
                )}
            </div>
            {/* )} */}
            <div className="tw-rounded-lg tw-shadow-md tw-bg-white tw-p-8 tw-flex tw-flex-col tw-gap-4">
                <Typography
                    className="tw-tracking-tight tw-font-medium tw-mb-4"
                    variant="h5"
                    component="h5"
                >
                    {t('Basic_information_')}
                </Typography>
                {user.profile.firstName && (
                    <div>
                        <Typography
                            className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                            variant="h6"
                            component="h6"
                        >
                            First name
                        </Typography>
                        <Typography
                            className="tw-text-lg"
                            variant="body1"
                            component="p"
                        >
                            {user.profile.firstName}
                        </Typography>
                    </div>
                )}
                {user.profile.lastName && (
                    <div>
                        <Typography
                            className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                            variant="h6"
                            component="h6"
                        >
                            Last name
                        </Typography>
                        <Typography
                            className="tw-text-lg"
                            variant="body1"
                            component="p"
                        >
                            {user.profile.lastName}
                        </Typography>
                    </div>
                )}
                {user.profile.spokenLanguages?.length > 0 && (
                    <div>
                        <Typography
                            className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                            variant="h6"
                            component="h6"
                        >
                            Spoken languages
                        </Typography>
                        <Typography
                            className="tw-text-lg"
                            variant="body1"
                            component="p"
                        >
                            {user.profile.spokenLanguages.join(', ')}
                        </Typography>
                    </div>
                )}
                {user.profile.email && (
                    <div>
                        <Typography
                            className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                            variant="h6"
                            component="h6"
                        >
                            Email
                        </Typography>
                        <Typography
                            className="tw-text-lg"
                            variant="body1"
                            component="p"
                        >
                            {user.profile.email}
                        </Typography>
                    </div>
                )}
                {user.profile.countryOfResidence && (
                    <div>
                        <Typography
                            className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                            variant="h6"
                            component="h6"
                        >
                            Country of residence
                        </Typography>
                        <Typography
                            className="tw-text-lg"
                            variant="body1"
                            component="p"
                        >
                            {user.profile.countryOfResidence}
                        </Typography>
                    </div>
                )}
                {user.profile.nationality && (
                    <div>
                        <Typography
                            className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                            variant="h6"
                            component="h6"
                        >
                            Nationality
                        </Typography>
                        <Typography
                            className="tw-text-lg"
                            variant="body1"
                            component="p"
                        >
                            {user.profile.nationality}
                        </Typography>
                    </div>
                )}
            </div>
            {(user.skills?.length > 0 ||
                user.education ||
                user.roles?.length > 0) && (
                <div className="tw-rounded-lg tw-shadow-md tw-bg-white tw-p-8 tw-flex tw-flex-col tw-gap-12">
                    {user.skills?.length > 0 && (
                        <div className="tw-flex tw-flex-col tw-gap-4">
                            <Grid
                                direction="row"
                                alignItems="stretch"
                                container
                            >
                                <Grid
                                    direction="row"
                                    alignItems="stretch"
                                    container
                                    key={`skills`}
                                    item
                                    xs={6}
                                >
                                    <div className={classes.container}>
                                        <GradientBox
                                            style={makeBoxStyles()}
                                            color="theme_white"
                                            p={3}
                                        >
                                            <Typography
                                                className="tw-tracking-tight tw-font-medium"
                                                variant="h5"
                                                component="h5"
                                            >
                                                Skills
                                            </Typography>

                                            {user.skills.map(skillObj => (
                                                <SkillRating
                                                    data={skillObj}
                                                    key={skillObj.skill}
                                                    small={false}
                                                    size={'body1'}
                                                />

                                                // <Typography
                                                //     className="tw-text-lg tw-p-2 tw-rounded-lg tw-border tw-border-solid tw-border-gray-300"
                                                //     variant="body1"
                                                //     component="p"
                                                // >
                                                //     {skillObj.skill}
                                                // </Typography>
                                            ))}
                                        </GradientBox>
                                    </div>
                                </Grid>
                                <Grid
                                    direction="row"
                                    alignItems="stretch"
                                    container
                                    key={`education`}
                                    item
                                    xs={6}
                                >
                                    {user.roles?.length > 0 && (
                                        <div className={classes.container}>
                                            <GradientBox
                                                style={makeBoxStyles()}
                                                color="theme_white"
                                                p={3}
                                            >
                                                <Typography
                                                    className="tw-tracking-tight tw-font-medium"
                                                    variant="h5"
                                                    component="h5"
                                                >
                                                    Experience
                                                </Typography>
                                                <Grid
                                                    direction="column"
                                                    alignItems="stretch"
                                                    container
                                                >
                                                    {user.roles.map(role => (
                                                        <div
                                                            className={
                                                                classes.inline
                                                            }
                                                        >
                                                            <Grid
                                                                key={role.role}
                                                                item
                                                                xs={6}
                                                                wrap="nowrap"
                                                            >
                                                                <Typography
                                                                    className={
                                                                        classes.experience
                                                                    }
                                                                >
                                                                    {role.role}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid
                                                                key={role.years}
                                                                item
                                                                xs={6}
                                                                wrap="nowrap"
                                                            >
                                                                <Typography
                                                                    className={
                                                                        classes.years
                                                                    }
                                                                >
                                                                    {Roles.getLabelForExperienceLevel(
                                                                        role.years,
                                                                    )}
                                                                </Typography>
                                                            </Grid>
                                                        </div>
                                                    ))}
                                                </Grid>
                                            </GradientBox>
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                        </div>
                    )}
                    {user.education && (
                        <div className="tw-flex tw-flex-col tw-gap-4">
                            <GradientBox
                                style={makeBoxStyles()}
                                color="theme_white"
                                p={3}
                            >
                                <Typography
                                    className="tw-tracking-tight tw-font-medium"
                                    variant="h5"
                                    component="h5"
                                >
                                    Education
                                </Typography>
                                {typeof user.education !== 'undefined' ? (
                                    <div className="tw-grid tw-grid-cols-12 tw-gap-4">
                                        {user.education.university ? (
                                            <>
                                                <div className="tw-col-span-3">
                                                    <Typography
                                                        className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                                        variant="h6"
                                                        component="h6"
                                                    >
                                                        Degree
                                                    </Typography>
                                                    <Typography
                                                        className="tw-text-lg"
                                                        variant="body1"
                                                        component="p"
                                                    >
                                                        {user.education.degree}
                                                    </Typography>
                                                </div>
                                                <div className="tw-col-span-2">
                                                    <Typography
                                                        className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                                        variant="h6"
                                                        component="h6"
                                                    >
                                                        Level
                                                    </Typography>
                                                    <Typography
                                                        className="tw-text-lg"
                                                        variant="body1"
                                                        component="p"
                                                    >
                                                        {user.education.level}
                                                    </Typography>
                                                </div>
                                                <div className="tw-col-span-4">
                                                    <Typography
                                                        className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                                        variant="h6"
                                                        component="h6"
                                                    >
                                                        Institution
                                                    </Typography>
                                                    <Typography
                                                        className="tw-text-lg"
                                                        variant="body1"
                                                        component="p"
                                                    >
                                                        {
                                                            user.education
                                                                .university
                                                        }
                                                    </Typography>
                                                </div>
                                                <div className="tw-col-span-3">
                                                    <Typography
                                                        className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                                        variant="h6"
                                                        component="h6"
                                                    >
                                                        Graduation year
                                                    </Typography>
                                                    <Typography
                                                        className="tw-text-lg"
                                                        variant="body1"
                                                        component="p"
                                                    >
                                                        {user.education
                                                            .graduationYear <
                                                        new Date().getFullYear()
                                                            ? `${user.education.graduationYear}`
                                                            : `Expected ${user.education.graduationYear}`}
                                                    </Typography>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Typography
                                                    className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                                    variant="h6"
                                                    component="h6"
                                                >
                                                    Level
                                                </Typography>
                                                <Typography
                                                    className="tw-text-lg"
                                                    variant="body1"
                                                    component="p"
                                                >
                                                    {user.education.level}
                                                </Typography>
                                            </>
                                        )}
                                    </div>
                                ) : null}
                            </GradientBox>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
