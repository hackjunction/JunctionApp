import React from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
import {
    Typography,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Chip,
} from '@material-ui/core'
import { FilterTypes } from '@hackjunction/shared'

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
    chips: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}))

const FilterListItem = ({ filter = {}, onRemove }) => {
    const classes = useStyles()
    const getType = () => {
        const params = FilterTypes.filterTypes[filter.type]
        return params ? params.label : filter.type
    }

    const renderValue = value => {
        if (Array.isArray(value)) {
            return (
                <div className={classes.chips}>
                    {value.map(item => (
                        <Chip
                            key={item}
                            label={item}
                            className={classes.chip}
                        />
                    ))}
                </div>
            )
        }
        return value
    }

    return (
        <ListItem>
            <ListItemText
                primary={filter.label}
                secondary={
                    <>
                        <Typography
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {getType()}
                        </Typography>{' '}
                        {renderValue(filter.value)}
                    </>
                }
            />
            {typeof onRemove === 'function' && (
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={onRemove}
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            )}
        </ListItem>
    )
}

export default FilterListItem
