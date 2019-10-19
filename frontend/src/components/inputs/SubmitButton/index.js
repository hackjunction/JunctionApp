import React, { useState } from 'react';

import { makeStyles, lighten } from '@material-ui/core/styles';
import { Box, Checkbox, Typography, Button } from '@material-ui/core';
import ExternalLink from 'components/generic/ExternalLink';

const useStyles = makeStyles(theme => ({
    wrapper: {
        background: 'rgba(255,255,255,1)',
        padding: theme.spacing(2),
        marginBottom: '2px',
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        '&.Mui-disabled': {
            backgroundColor: theme.palette.primary.main,
            opacity: 0.6
        }
    }
}));

const SubmitButton = ({ hasErrors, loading, onSubmit }) => {
    const classes = useStyles();
    const [confirmed1, setConfirmed1] = useState(false);
    const [confirmed2, setConfirmed2] = useState(false);
    const [confirmed3, setConfirmed3] = useState(false);

    const confirmed = confirmed1 && confirmed2 && confirmed3;

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box className={classes.wrapper}>
                <Checkbox
                    color="primary"
                    className={classes.checkbox}
                    checked={confirmed1}
                    onChange={e => setConfirmed1(e.target.checked)}
                />
                <Typography variant="subtitle1" className={classes.label}>
                    I've read and consent to the processing of my data in accordance to the{' '}
                    <ExternalLink href="https://hackjunction.com/policy">Junction Privacy Policy</ExternalLink>
                </Typography>
            </Box>
            <Box className={classes.wrapper}>
                <Checkbox
                    color="primary"
                    className={classes.checkbox}
                    checked={confirmed2}
                    onChange={e => setConfirmed2(e.target.checked)}
                />
                <Typography variant="subtitle1" className={classes.label}>
                    I've read and agree to the{' '}
                    <ExternalLink href="https://hackjunction.com/terms">Junction Terms & Conditions</ExternalLink>
                </Typography>
            </Box>
            <Box className={classes.wrapper}>
                <Checkbox
                    color="primary"
                    className={classes.checkbox}
                    checked={confirmed3}
                    onChange={e => setConfirmed3(e.target.checked)}
                />
                <Typography variant="subtitle1" className={classes.label}>
                    I confirm that the information entered in this form is truthful and accurate
                </Typography>
            </Box>
            <Box width="100%" maxWidth={600} mt={2}>
                <Button
                    onClick={onSubmit}
                    fullWidth
                    color="primary"
                    variant="contained"
                    className={classes.button}
                    disabled={hasErrors || !confirmed || loading}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default SubmitButton;
