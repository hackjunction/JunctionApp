import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import {
    Typography,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Chip,
} from '@mui/material'
import { FilterTypes } from '@hackjunction/shared'

const FilterListItem = ({ filter = {}, onRemove }) => {
    const getType = () => {
        const params = FilterTypes.filterTypes[filter.type]
        return params ? params.label : filter.type
    }

    const renderValue = value => {
        if (Array.isArray(value)) {
            return (
                <div className="flex flex-row flex-wrap">
                    {value.map(item => (
                        <Chip key={item} label={item} className="m-1" />
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
                            className="inline"
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
