import React, { useCallback } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useArray } from 'hooks/customHooks'
import Select from 'components/inputs/Select'
import * as RecruitmentSelectors from 'redux/recruitment/selectors'
import * as RecruitmentActions from 'redux/recruitment/actions'

import FilterItem from './FilterItem'
import SkillsFilterItem from './SkillsFilterItem'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '400px',
        minHeight: '400px',
    },
    items: {
        backgroundColor: '#fafafa',
        borderRadius: '7px',
        padding: theme.spacing(1),
    },
    itemsEmpty: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}))

export default ({ setFilters }) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const filters = useSelector(RecruitmentSelectors.filters)?.skills ?? []
    const [skills, addSkill, removeSkill, editSkill, setSkills] =
        useArray(filters)
    const classes = useStyles()

    const handleSubmit = useCallback(() => {
        dispatch(RecruitmentActions.setFiltersField('skills', skills))
    }, [dispatch, skills])

    const handleReset = useCallback(() => {
        setSkills(filters)
    }, [setSkills, filters])

    const handleAdd = useCallback(
        skill => {
            addSkill({
                skill,
                levels: [],
            })
        },
        [addSkill],
    )

    const renderSkills = () => {
        if (!skills.length) {
            return (
                <Typography variant="subtitle1" className={classes.itemsEmpty}>
                    {t('No_skills_')}
                </Typography>
            )
        }
        return skills.map((item, index) => (
            <SkillsFilterItem
                {...item}
                key={item.skill}
                onEdit={item => editSkill(index, item)}
                onRemove={() => removeSkill(index)}
            />
        ))
    }

    return (
        <FilterItem
            label={t('Skills_')}
            active={filters.length > 0}
            onSubmit={handleSubmit}
            onClose={handleReset}
        >
            <Box className={classes.wrapper}>
                <Select
                    label={t('Add_skill_')}
                    options="skill"
                    onChange={handleAdd}
                    autoFocus
                />
                <Box className={classes.items}>{renderSkills()}</Box>
            </Box>
        </FilterItem>
    )
}
