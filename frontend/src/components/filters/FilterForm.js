import React, { useState, useMemo, useCallback, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { RegistrationFields, FilterTypes } from '@hackjunction/shared'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
    Grid,
    Button,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Typography,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next';
import Select from 'components/inputs/SelectOld'
import FilterValueInput from './FilterValueInput'
import * as OrganiserSelectors from 'redux/organiser/selectors'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
    },
    headingItem: {
        marginRight: theme.spacing(1),
    },
    body: {
        padding: theme.spacing(3),
    },
}))

export default ({ onSubmit }) => {
    const event = useSelector(OrganiserSelectors.event)
    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)
    const [filter, setFilter] = useState()
    const [filterType, setFilterType] = useState()
    const [filterValue, setFilterValue] = useState()
    const { t, i18n } = useTranslation();
    useEffect(() => {
        setFilterType(undefined)
    }, [filter])

    useEffect(() => {
        setFilterValue(undefined)
    }, [filterType])

    const toggleExpanded = useCallback(() => {
        setExpanded(!expanded)
    }, [expanded])

    const handleClear = useCallback(() => {
        setExpanded(false)
        setFilter(undefined)
        setFilterType(undefined)
        setFilterValue(undefined)
    }, [])

    const filterParams = useMemo(() => {
        return filter ? JSON.parse(filter) : null
    }, [filter])

    const submitValue = useMemo(() => {
        if (!filterParams) return null
        if (!filterType) return null

        return {
            label: filterParams.label,
            path: filterParams.path,
            type: filterType,
            value: filterValue,
        }
    }, [filterParams, filterType, filterValue])

    const handleSubmit = useCallback(() => {
        onSubmit(submitValue)
        handleClear()
    }, [submitValue, onSubmit, handleClear])

    const filterOptions = useMemo(() => {
        return RegistrationFields.filters.map(filter => ({
            value: JSON.stringify(filter),
            label: filter.label,
        }))
    }, [])

    const filterTypeOptions = useMemo(() => {
        if (!filterParams) return []
        const options = FilterTypes.filterTypesForType[filterParams.type]
        if (!options) return []

        return options.map(option => ({
            value: option,
            label: FilterTypes.filterTypes[option].label,
            helper: FilterTypes.filterTypes[option].helper,
        }))
    }, [filterParams])

    return (
      <ExpansionPanel expanded={expanded} onChange={toggleExpanded}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1c-content'
          id='panel1c-header'
        >
          <div className={classes.headingItem}>
            <Typography color='textPrimary'>Add a filter</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.body}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Select
                label={t('Choose_field_')}
                placeholder={t('Choose_field_')}
                helperText={t('Choose_field_filter_')}
                value={filter}
                onChange={setFilter}
                options={filterOptions}
              />
            </Grid>
            <Grid item xs={12}>
              {filterTypeOptions.length > 0 && (
                <Select
                  label={t('How_to_filter_')}
                  value={filterType}
                  onChange={setFilterType}
                  helperText={t('Choose_how_to_filter_')}
                  options={filterTypeOptions}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <FilterValueInput
                filterType={filterType}
                valueType={filterParams ? filterParams.valueType : null}
                value={filterValue}
                onChange={setFilterValue}
                event={event}
              />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button onClick={handleClear}>Cancel</Button>
          <Button
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            disabled={!submitValue}
          >
            Add
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
}
