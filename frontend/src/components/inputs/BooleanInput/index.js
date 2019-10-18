import React, { useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
}));

const BooleanInput = ({ value, onChange }) => {
    const classes = useStyles();

    const handleChange = useCallback(
        e => {
            onChange(!value);
        },
        [onChange, value]
    );
    return (
        <Box>
            <RadioGroup
                className={classes.radioGroup}
                aria-label="Years of experience"
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel
                    key={'yes'}
                    value={true}
                    control={<Radio color="primary" />}
                    label={'Yes'}
                    labelPlacement="left"
                />
                <FormControlLabel
                    key={'no'}
                    value={false}
                    control={<Radio color="primary" />}
                    label={'No'}
                    labelPlacement="left"
                />
            </RadioGroup>
        </Box>
    );
};

export default BooleanInput;
