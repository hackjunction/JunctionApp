import React, { useCallback } from 'react'

import { Stepper, Step, StepLabel, StepContent } from '@material-ui/core'

import StepButtons from 'components/buttons/StepButtons'

const _Stepper = ({
    steps = [],
    activeStep = 0,
    onStepChange,
    onFinish,
    stepperProps = { orientation: 'vertical' },
}) => {
    const handleNext = useCallback(() => {
        onStepChange(activeStep + 1)
    }, [onStepChange, activeStep])

    const handleBack = useCallback(() => {
        onStepChange(activeStep - 1)
    }, [onStepChange, activeStep])

    const handleDone = useCallback(() => {
        onFinish()
    }, [onFinish])

    return (
        <Stepper activeStep={activeStep} {...stepperProps}>
            {steps.map((step, index) => (
                <Step key={step.key}>
                    <StepLabel>{step.label}</StepLabel>
                    <StepContent>
                        {step.render()}
                        <StepButtons
                            numSteps={steps.length}
                            activeStep={index}
                            onNext={handleNext}
                            onBack={handleBack}
                            onFinish={handleDone}
                        />
                    </StepContent>
                </Step>
            ))}
        </Stepper>
    )
}

export default _Stepper
