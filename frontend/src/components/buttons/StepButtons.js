import React from 'react'

import { Button, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

const StepButtons = ({ numSteps, activeStep, onBack, onNext, onFinish }) => {
    const { t } = useTranslation()
    return (
        <Box p={2} display="flex" flexDirection="row" justifyContent="flex-end">
            <Button
                className="ml-2"
                disabled={activeStep === 0}
                onClick={onBack}
            >
                {t('Back_')}
            </Button>
            <Button
                className={'ml-2'}
                variant="contained"
                color="primary"
                onClick={activeStep === numSteps - 1 ? onFinish : onNext}
            >
                {activeStep === numSteps - 1 ? 'Finish' : 'Next'}
            </Button>
        </Box>
    )
}

export default StepButtons
