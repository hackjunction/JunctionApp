import React, { useCallback } from 'react';

import { Misc } from '@hackjunction/shared';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import Select from 'components/inputs/Select';
import BooleanInput from 'components/inputs/BooleanInput';

const STATUS_OPTIONS = Misc.recruitmentStatuses.asArray.map(({ id, label }) => ({
    value: id,
    label
}));

const RELOCATION_OPTIONS = Misc.relocationOptions.asArray.map(({ id, label }) => ({
    value: id,
    label
}));

const useStyles = makeStyles(theme => ({
    label: {
        fontWeight: 'bold'
    },
    hint: {}
}));

const RecruitmentOptionInput = ({ value = {}, onChange, onBlur, autoFocus }) => {
    const classes = useStyles();

    const handleChange = useCallback(
        (field, fieldValue) => {
            const newValue = {
                ...value,
                [field]: fieldValue
            };
            onChange(newValue);
        },
        [onChange, value]
    );

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography className={classes.label} variant="subtitle2" paragraph>
                    What is your current professional situation?
                </Typography>
                <Select
                    autoFocus={autoFocus}
                    placeholder="Choose one"
                    value={value.status}
                    onChange={status => handleChange('status', status)}
                    onBlur={onBlur}
                    options={STATUS_OPTIONS}
                />
            </Grid>
            {value.status &&
                value.status !== 'not-interested' && [
                    <Grid item xs={12}>
                        <Typography className={classes.label} variant="subtitle2" paragraph>
                            Cool! Can our partners contact you regarding job opportunities they have?
                        </Typography>
                        <Typography className={classes.hint} variant="subtitle2" paragraph>
                            This means that relevant recruitment information about you (ex. contact info, education,
                            skills and other cv information) will be visible to the event partners representatives
                            before, during and after the event. You can also choose to opt out of this later.
                        </Typography>
                        <BooleanInput value={value.consent} onChange={consent => handleChange('consent', consent)} />
                    </Grid>,
                    <Grid item xs={12}>
                        <Typography className={classes.label} variant="subtitle2" paragraph>
                            And finally: would you consider relocating to another country for work as a possibility?
                        </Typography>
                        <Select
                            placeholder="Choose one"
                            value={value.relocation}
                            onChange={relocation => handleChange('relocation', relocation)}
                            options={RELOCATION_OPTIONS}
                        />
                    </Grid>
                ]}
        </Grid>
    );
};

export default RecruitmentOptionInput;
