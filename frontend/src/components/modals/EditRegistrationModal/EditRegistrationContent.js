import React from 'react'
import { useSelector } from 'react-redux'
import { RegistrationFields } from '@hackjunction/shared'
import { groupBy, sortBy, find } from 'lodash-es'
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
    Grid,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import DescriptionItem from 'components/generic/DescriptionItem'
import * as OrganiserSelectors from 'redux/organiser/selectors'

export default React.memo(({ registration }) => {
    const event = useSelector(OrganiserSelectors.event)
    const fields = Object.keys(registration.answers)
    const grouped = groupBy(fields, field =>
        RegistrationFields.getCategory(field)
    )
    const sorted = sortBy(Object.keys(grouped), label =>
        RegistrationFields.getCategoryOrderByLabel(label)
    )
    console.log('registration.answers', registration.answers)
    const customAnswers = {}
    if (registration.answers.CustomAnswers) {
        registration.answers.CustomAnswers.forEach(element => {
            if (!customAnswers[element.section]) {
                customAnswers[element.section] = {}
            }
            customAnswers[element.section][element.key] = element.value
        })
    }
    const categoryNames = sorted.filter(key => key !== '')
    return (
        <>
            {categoryNames.map(name => (
                <ExpansionPanel key={name}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${name}-content`}
                        id={`${name}-header`}
                    >
                        <Typography>{name}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={3}>
                            {grouped[name].map(field => {
                                let label =
                                    RegistrationFields.fieldToLabelMap[field]
                                if (!label) {
                                    const customField = find(
                                        event.registrationQuestions,
                                        f => f.name === field
                                    )
                                    if (customField) {
                                        label = customField.label
                                    }
                                }
                                return (
                                    <DescriptionItem
                                        title={label}
                                        content={registration.answers[field]}
                                        fieldName={field}
                                    />
                                )
                            })}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
            {event.customQuestions.map(section => {
                return (
                    <ExpansionPanel key={section.name}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${section.name}-content`}
                            id={`${section.name}-header`}
                        >
                            <Typography>{section.label}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container spacing={3}>
                                {section.questions.map(question => {
                                    return (
                                        <DescriptionItem
                                            title={question.label}
                                            content={
                                                customAnswers[section.name]
                                                    ? customAnswers[
                                                          section.name
                                                      ][question.name]
                                                    : null
                                            }
                                        />
                                    )
                                })}
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            })}
        </>
    )
})
