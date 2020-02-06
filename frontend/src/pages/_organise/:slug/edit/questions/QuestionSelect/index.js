import React, { useCallback } from 'react'
import { RegistrationFields } from '@hackjunction/shared'
import { groupBy } from 'lodash-es'
import {
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    FormHelperText,
    Typography,
    Checkbox,
    Chip,
    Box,
    Avatar,
    Paper,
} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import NewReleasesIcon from '@material-ui/icons/NewReleases'
import { makeStyles } from '@material-ui/core/styles'

const fields = RegistrationFields.getFields()
const fieldsMapped = Object.keys(fields)
    .map(fieldName => {
        if (fields[fieldName].alwaysEnabled) return null
        return {
            fieldName,
            label: fields[fieldName].label,
            category: fields[fieldName].category,
        }
    })
    .filter(obj => obj !== null)
const fieldsByCategory = groupBy(fieldsMapped, f => f.category.id)
const categories = RegistrationFields.getCategoriesArray()

const useStyles = makeStyles(theme => ({
    sectionLabel: {
        fontWeight: 'bold',
    },
}))

export default ({ onChange, optionalFields = [], requiredFields = [] }) => {
    const classes = useStyles()
    const handleChange = useCallback(
        (fieldName, isOptional, isRequired) => {
            if (isOptional) {
                onChange({
                    requiredFields: [...requiredFields, fieldName],
                    optionalFields: optionalFields.filter(f => f !== fieldName),
                })
            } else if (isRequired) {
                onChange({
                    requiredFields: requiredFields.filter(f => f !== fieldName),
                    optionalFields,
                })
            } else {
                onChange({
                    requiredFields,
                    optionalFields: [...optionalFields, fieldName],
                })
            }
        },
        [onChange, optionalFields, requiredFields]
    )

    const getChipProps = (isOptional, isRequired) => {
        if (isOptional) {
            return {
                color: 'primary',
                icon: <VisibilityIcon />,
            }
        } else if (isRequired) {
            return {
                color: 'secondary',
                icon: <VisibilityIcon />,
            }
        } else {
            return {
                variant: 'outlined',
                icon: <VisibilityOffIcon />,
            }
        }
    }

    return (
        <FormControl component="fieldset">
            <Typography variant="h6" gutterBottom>
                Registration questions
            </Typography>
            <Typography variant="body1">
                Choose the questions you want to ask people in the registration
                form. Click on questions to change their status.{' '}
                <span style={{ fontWeight: 'bold' }}>
                    First name, last name and email are always shown and
                    required!
                </span>
            </Typography>

            <Box pb={2} pt={2} flexDirection="row" flexWrap="wrap">
                <Typography variant="body1" gutterBottom>
                    Legend:
                </Typography>
                <Chip
                    size="small"
                    variant="outlined"
                    label="Hidden"
                    icon={<VisibilityOffIcon />}
                />{' '}
                <Chip
                    size="small"
                    color="primary"
                    label="Shown, optional"
                    icon={<VisibilityIcon />}
                />{' '}
                <Chip
                    size="small"
                    color="secondary"
                    label="Shown, required"
                    icon={<VisibilityIcon />}
                />
            </Box>

            {categories.map(({ id, label }) => (
                <Box mb={2}>
                    <Typography
                        className={classes.sectionLabel}
                        variant="button"
                        gutterBottom
                    >
                        {label}
                    </Typography>
                    <FormGroup row>
                        {fieldsByCategory[id].map(({ fieldName, label }) => {
                            const isOptional =
                                optionalFields.indexOf(fieldName) !== -1
                            const isRequired =
                                requiredFields.indexOf(fieldName) !== -1
                            return (
                                <Box key={fieldName} mr={1} mt={1}>
                                    <Chip
                                        {...getChipProps(
                                            isOptional,
                                            isRequired
                                        )}
                                        clickable
                                        size="small"
                                        onClick={() =>
                                            handleChange(
                                                fieldName,
                                                isOptional,
                                                isRequired
                                            )
                                        }
                                        label={label}
                                    ></Chip>
                                </Box>
                            )
                        })}
                    </FormGroup>
                </Box>
            ))}
        </FormControl>
    )
}
