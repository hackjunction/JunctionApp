import React, { useCallback, useState, useRef } from 'react'
import {
    Grid2 as Grid,
    Typography,
    Button,
    FormControlLabel,
    RadioGroup,
    Radio,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material'
import { Skills } from '@hackjunction/shared'
import { find } from 'lodash-es'
import { useDispatch } from 'react-redux'
import Select from 'components/inputs/Select'

import * as SnackbarActions from 'reducers/snackbar/actions'
import { useTranslation } from 'react-i18next'

export default React.memo(({ value = [], onChange, onBlur, autoFocus }) => {
    const dispatch = useDispatch()
    const selectEl = useRef(null)
    const [level, setLevel] = useState()
    const [skill, setSkill] = useState()
    const { t } = useTranslation()
    const handleLevelChange = useCallback(event => {
        setLevel(event.target.value)
    }, [])

    const handleAdd = useCallback(() => {
        const item = { skill, level }

        if (find(value, item => item.skill === skill)) {
            dispatch(SnackbarActions.show(`You've already added ${skill}`))
            return
        }
        onChange(value.concat(item))
        setLevel(undefined)
        setSkill(undefined)
        selectEl.current.focus()
    }, [skill, level, value, onChange, dispatch])

    const handleRemove = useCallback(
        index => {
            onChange(
                value.filter((item, idx) => {
                    return index !== idx
                }),
            )
        },
        [value, onChange],
    )

    const buttonDisabled = !level || !skill

    return (
        <Grid container spacing={3}>
            <Grid size={12}>
                <Select
                    autoFocus={autoFocus}
                    onBlur={onBlur}
                    innerRef={selectEl}
                    label="Choose a skill"
                    placeholder="Type to search for skills"
                    options="skill"
                    value={skill}
                    onChange={setSkill}
                />
            </Grid>
            <Grid size={4}>
                <Typography variant="subtitle1">
                    {t('Level_of_expertise_')}
                </Typography>
            </Grid>
            <Grid size={8}>
                <RadioGroup
                    row
                    aria-label="Level of expertise"
                    value={level}
                    onChange={handleLevelChange}
                >
                    {Skills.skillLevelLabelsArray.map((label, index) => (
                        <FormControlLabel
                            key={label}
                            value={`${index + 1}`}
                            control={<Radio color="primary" />}
                            label={label}
                            labelPlacement="start"
                        />
                    ))}
                </RadioGroup>
            </Grid>
            <Grid
                size={12}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                }}
            >
                <Button
                    onClick={handleAdd}
                    disabled={buttonDisabled}
                    color="primary"
                    variant="contained"
                >
                    {t('Add_')}
                </Button>
            </Grid>
            <Grid size={12}>
                <List>
                    {value.map(({ skill, level }, index) => [
                        <Divider key={skill + '-divider'} />,
                        <ListItem
                            key={skill}
                            secondaryAction={
                                <Button
                                    color="error"
                                    onClick={() => handleRemove(index)}
                                >
                                    {t('Remove_')}
                                </Button>
                            }
                        >
                            <ListItemText
                                primary={
                                    <Typography>
                                        {skill} (
                                        {Skills.getLabelForSkillLevel(level)})
                                    </Typography>
                                }
                                secondary={
                                    <Typography
                                        color="textSecondary"
                                        sx={{ marginRight: '50px' }}
                                    >
                                        {Skills.getDescriptionForSkillLevel(
                                            level,
                                        )}
                                    </Typography>
                                }
                            />
                        </ListItem>,
                    ])}
                </List>
            </Grid>
        </Grid>
    )
})
