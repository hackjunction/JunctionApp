import React, { useState, useCallback, useMemo } from 'react';

import {
    Paper,
    Grid,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Tooltip,
    Typography
} from '@material-ui/core';
import getSlug from 'speakingurl';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import TextInput from 'components/inputs/TextInput';
import Button from 'components/generic/Button';

const TracksForm = ({ value, onChange }) => {
    const [inputValue, setInputValue] = useState();
    const [slugValue, setSlugValue] = useState();

    const handleNameChange = useCallback(name => {
        setInputValue(name);
        setSlugValue(getSlug(name));
    }, []);

    const handleAdd = useCallback(() => {
        onChange(
            value.concat({
                name: inputValue,
                slug: slugValue
            })
        );
        setInputValue();
        setSlugValue();
    }, [value, inputValue, slugValue, onChange]);

    const handleRemove = useCallback(
        index => {
            onChange(
                value.filter((item, idx) => {
                    return idx !== index;
                })
            );
        },
        [value, onChange]
    );

    const isValid = useMemo(() => {
        return (
            inputValue &&
            slugValue &&
            value.filter(track => {
                return track.name === inputValue || track.slug === slugValue;
            }).length === 0
        );
    }, [value, inputValue, slugValue]);

    return (
        <Paper>
            <Box p={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextInput label="Track name" value={inputValue} onChange={handleNameChange} />
                        <Typography variant="caption">The unique publicly visible name of the track.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput label="Unique slug" value={slugValue} onChange={setSlugValue} />
                        <Typography variant="caption">
                            A unique slug for the track. This will be used in e.g. url paths related to this track.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" flexDirection="row" justifyContent="flex-end">
                            <Button disabled={!isValid} onClick={handleAdd} color="theme_turquoise" variant="contained">
                                Add track
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <List>
                            {value.map((track, index) => (
                                <ListItem key={track.slug || track.name} divider>
                                    <ListItemText primary={track.name} secondary={track.slug} />
                                    <ListItemSecondaryAction>
                                        <Tooltip title="Remove track">
                                            <IconButton onClick={() => handleRemove(index)}>
                                                <HighlightOffIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default TracksForm;
