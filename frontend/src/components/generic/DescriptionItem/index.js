import React from 'react'

import { isEmpty } from 'lodash-es'
import { makeStyles } from '@material-ui/core/styles'
import {
    Typography,
    Grid,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core'
import { Skills, Roles, Misc } from '@hackjunction/shared'
import { Yes, No, NotAvailable } from 'components/generic/Tag/Variants'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: 'bold',
    },
}))

const DescriptionItem = ({ title, content, fieldName }) => {
    const classes = useStyles()
    const renderBoolean = bool => {
        if (bool === true) {
            return <Yes />
        }
        if (bool === false) {
            return <No />
        }
        return <NotAvailable />
    }

    const renderObjectFields = (obj, labelMap = {}, valueMap = {}) => {
        return (
            <List>
                {Object.keys(obj).map(key => (
                    <ListItem key={key}>
                        <ListItemText
                            primaryTypographyProps={{
                                variant: 'body2',
                                classes: { root: classes.title },
                            }}
                            secondaryTypographyProps={{ variant: 'subtitle1' }}
                            primary={labelMap[key] || key}
                            secondary={
                                valueMap[key]
                                    ? valueMap[key](obj[key])
                                    : obj[key] || 'N/A'
                            }
                        ></ListItemText>
                    </ListItem>
                ))}
            </List>
        )
    }

    const renderContent = (content, fieldName) => {
        switch (fieldName) {
            case 'roles':
                return (
                    <List>
                        {content.map(item => (
                            <ListItem key={item.role}>
                                <ListItemText
                                    primary={item.role}
                                    secondary={Roles.getLabelForExperienceLevel(
                                        item.years,
                                    )}
                                    primaryTypographyProps={{
                                        variant: 'body2',
                                        classes: { root: classes.title },
                                    }}
                                    secondaryTypographyProps={{
                                        variant: 'subtitle1',
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                )
            case 'skills':
                return (
                    <List>
                        {content.map(item => {
                            const label = Skills.getLabelForSkillLevel(
                                item.level,
                            )
                            return (
                                <ListItem key={item.skill}>
                                    <ListItemText
                                        primary={item.skill}
                                        secondary={label}
                                        primaryTypographyProps={{
                                            variant: 'body2',
                                            classes: { root: classes.title },
                                        }}
                                        secondaryTypographyProps={{
                                            variant: 'subtitle1',
                                        }}
                                    />
                                </ListItem>
                            )
                        })}
                    </List>
                )
            case 'education':
                return renderObjectFields(content, {
                    level: 'Level',
                    university: 'University',
                    degree: 'Degree',
                    graduationYear: 'Graduation Year',
                })
            case 'teamOptions':
                return renderObjectFields(
                    content,
                    {
                        applyAsTeam: 'Applying as a team?',
                        applyAlone: 'Applying also alone?',
                    },
                    {
                        applyAsTeam: renderBoolean,
                        applyAlone: renderBoolean,
                    },
                )
            case 'dateOfBirth':
                return moment(content).format('DD.MM.YYYY')
            case 'numHackathons':
                return Misc.numHackathonOptions.getLabelForValue(content)
            case 'portfolio':
            case 'github':
            case 'linkedin':
            case 'curriculumVitae':
                return (
                    <a href={content} target="_blank" rel="noopener noreferrer">
                        {content}
                    </a>
                )
            case 'recruitmentOptions':
                return renderObjectFields(
                    content,
                    {
                        consent: 'Can share data with partners?',
                        relocation: 'Willing to relocate?',
                        status: 'Job-seeking status',
                    },
                    {
                        consent: renderBoolean,
                        relocation: value =>
                            Misc.relocationOptions.getLabelForValue(value),
                        status: value =>
                            Misc.recruitmentStatuses.getLabelForValue(value),
                    },
                )
            case 'dietaryRestrictions':
            case 'spokenLanguages':
                if (!content || !content.length) return 'None'
                return content.join(', ')
            case 'themesOfInterest':
            case 'industriesOfInterest':
                return (
                    <List>
                        {content.map(item => (
                            <ListItem key={item}>
                                <ListItemText
                                    primary={item}
                                    primaryTypographyProps={{
                                        variant: 'body2',
                                        classes: { root: classes.title },
                                    }}
                                    secondaryTypographyProps={{
                                        variant: 'subtitle1',
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                )
            case 'phoneNumber':
                return `${content.countryCode} ${content.number}`
            default:
                if (!content) return <NotAvailable />
                const contentType = typeof content

                switch (contentType) {
                    case 'string':
                        return content
                    case 'boolean':
                        return renderBoolean(content)
                    case 'array':
                        if (isEmpty(content)) return 'None'
                        return content.join(', ')
                    case 'object':
                        return renderObjectFields(content)
                    default:
                        return ''
                }
        }
    }

    return (
        <Grid item xs={12}>
            <Typography variant="body2" classes={{ root: classes.title }}>
                {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                {renderContent(content, fieldName)}
            </Typography>
        </Grid>
    )
}

export default DescriptionItem
