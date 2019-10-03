import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Box } from '@material-ui/core';

const useButtonStyles = makeStyles(theme => ({
    button: {
        marginLeft: theme.spacing(2)
    }
}));

const StepButtons = ({ numSteps, activeStep, onBack, onNext, onFinish }) => {
    const classes = useButtonStyles();
    return (
        <Box p={2} display="flex" flexDirection="row" justifyContent="flex-end">
            <Button className={classes.button} disabled={activeStep === 0} onClick={onBack}>
                Back
            </Button>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={activeStep === numSteps - 1 ? onFinish : onNext}
            >
                {activeStep === numSteps - 1 ? 'Finish' : 'Next'}
            </Button>
        </Box>
    );
};

export default StepButtons;
