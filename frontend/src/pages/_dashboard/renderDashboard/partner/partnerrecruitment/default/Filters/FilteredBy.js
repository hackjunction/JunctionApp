import React from 'react'

import { useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { Misc } from '@hackjunction/shared'
import { useTranslation } from 'react-i18next'
import * as RecruitmentSelectors from 'redux/recruitment/selectors'

const FilteredByItem = ({ label, text }) => {
    return (
        <Box
            style={{
                marginRight: '1rem',
                marginBottom: '0.5rem',
                backgroundColor: '#ececec',
                borderRadius: '5px',
                padding: '0.1rem 0.4rem',
            }}
        >
            <Typography variant="body2">
                {label}: {text}
            </Typography>
        </Box>
    )
}

export default () => {
    const { t } = useTranslation()
    const filters = useSelector(RecruitmentSelectors.filters)
    const eventsMap = useSelector(RecruitmentSelectors.eventsMap)

    const {
        skills = [],
        roles = [],
        countryOfResidence = [],
        age,
        recruitmentStatus = [],
        relocationStatus = [],
        spokenLanguages = [],
        events = [],
    } = filters

    return (
        <Box
            mb={2}
            width="100%"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
        >
            {Array.isArray(skills) && skills.length ? (
                <FilteredByItem
                    label={t('Skills_')}
                    text={skills.map(s => s.skill).join(', ')}
                />
            ) : null}
            {Array.isArray(roles) && roles.length ? (
                <FilteredByItem
                    label={t('Previous_roles_')}
                    text={roles.map(r => r.role).join(', ')}
                />
            ) : null}
            {Array.isArray(events) && events.length ? (
                <FilteredByItem
                    label={t('Events_')}
                    text={events.map(e => eventsMap[e.event].name).join(', ')}
                />
            ) : null}
            {Array.isArray(recruitmentStatus) && recruitmentStatus.length ? (
                <FilteredByItem
                    label={t('Status_')}
                    text={recruitmentStatus
                        .map(s => Misc.recruitmentStatuses.getLabelForValue(s))
                        .join(', ')}
                />
            ) : null}
            {Array.isArray(relocationStatus) && relocationStatus.length ? (
                <FilteredByItem
                    label={t('Relocation')}
                    text={relocationStatus
                        .map(s => Misc.relocationOptions.getLabelForValue(s))
                        .join(', ')}
                />
            ) : null}
            {Array.isArray(countryOfResidence) && countryOfResidence.length ? (
                <FilteredByItem
                    label={t('Country_')}
                    text={countryOfResidence.join(', ')}
                />
            ) : null}
            {age && age[1] - age[0] !== 120 ? (
                <FilteredByItem
                    label={t('Age_')}
                    text={`${age[0]} to ${age[1]}`}
                />
            ) : null}
            {Array.isArray(spokenLanguages) && spokenLanguages.length ? (
                <FilteredByItem
                    label={t('Spoken_languages_')}
                    text={spokenLanguages.join(', ')}
                />
            ) : null}
        </Box>
    )
}
