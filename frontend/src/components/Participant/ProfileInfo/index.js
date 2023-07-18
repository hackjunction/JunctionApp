import { Roles, Misc } from '@hackjunction/shared'
import { Box, Chip, Typography } from '@material-ui/core'
import React from 'react'

const index = ({ user = {} }) => {
    const renderRecruitmentStatus = () => {
        switch (user.recruitmentOptions.status) {
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
        switch (user.recruitmentOptions.relocation) {
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
                <Typography
                    className="tw-tracking-tight tw-font-medium"
                    variant="h5"
                    component="h5"
                >
                    Biography
                </Typography>
                <div>
                    <Typography
                        className="tw-text-lg"
                        variant="body1"
                        component="p"
                    >
                        {user.profile.biography}
                    </Typography>
                </div>
                <div className="tw-flex tw-flex-wrap tw-gap-4">
                    <Box ml={0.5} mr={0.5} mb={0.5}>
                        {renderRecruitmentStatus()}
                    </Box>
                    <Box ml={0.5} mr={0.5} mb={0.5}>
                        {renderRelocationStatus()}
                    </Box>
                </div>
            </div>
            <div className="tw-rounded-lg tw-shadow-md tw-bg-white tw-p-8 tw-flex tw-flex-col tw-gap-4">
                <Typography
                    className="tw-tracking-tight tw-font-medium tw-mb-4"
                    variant="h5"
                    component="h5"
                >
                    Basic information
                </Typography>
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
            </div>
            <div className="tw-rounded-lg tw-shadow-md tw-bg-white tw-p-8 tw-flex tw-flex-col tw-gap-12">
                <div className="tw-flex tw-flex-col tw-gap-4">
                    <Typography
                        className="tw-tracking-tight tw-font-medium"
                        variant="h5"
                        component="h5"
                    >
                        Skills
                    </Typography>
                    <div className="tw-flex tw-flex-wrap tw-gap-2">
                        {user.skills.map(skillObj => (
                            <Typography
                                className="tw-text-lg tw-p-2 tw-rounded-lg tw-border tw-border-solid tw-border-gray-300"
                                variant="body1"
                                component="p"
                            >
                                {skillObj.skill}
                            </Typography>
                        ))}
                    </div>
                </div>
                <div className="tw-flex tw-flex-col tw-gap-4">
                    <Typography
                        className="tw-tracking-tight tw-font-medium"
                        variant="h5"
                        component="h5"
                    >
                        Education
                    </Typography>
                    {typeof user.education !== 'undefined' ? (
                        user.education.university ? (
                            <div className="tw-grid tw-grid-cols-12 tw-gap-4">
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
                                        {user.education.university}
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
                                        {user.education.graduationYear <
                                        new Date().getFullYear()
                                            ? `${user.education.graduationYear}`
                                            : `Expected ${user.education.graduationYear}`}
                                    </Typography>
                                </div>
                            </div>
                        ) : (
                            <div className="">
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
                        )
                    ) : null}
                </div>
                <div className="tw-flex tw-flex-col tw-gap-4">
                    <Typography
                        className="tw-tracking-tight tw-font-medium"
                        variant="h5"
                        component="h5"
                    >
                        Experience
                    </Typography>
                    <div className="tw-flex tw-flex-wrap tw-gap-8">
                        {user.roles.map(role => (
                            <div className="">
                                <Typography
                                    className="tw-tracking-tight tw-font-normal tw-text-gray-600"
                                    variant="h6"
                                    component="h6"
                                >
                                    {Roles.getLabelForExperienceLevel(
                                        role.years,
                                    )}
                                </Typography>
                                <Typography
                                    className="tw-text-lg"
                                    variant="body1"
                                    component="p"
                                >
                                    {role.role}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default index
