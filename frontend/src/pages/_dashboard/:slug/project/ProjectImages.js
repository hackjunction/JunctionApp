import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { Grid, Box, MobileStepper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'

import ImageUpload from 'components/inputs/ImageUpload'

import * as DashboardSelectors from 'redux/dashboard/selectors'

const useStyles = makeStyles(theme => ({
    wrapper: {
        background: 'black',
        padding: '1px',
    },
    block: {
        background: 'gray',
        position: 'relative',
        paddingTop: '50%',
    },
}))

export default ({ value = [], onChange, maxImages = 5 }) => {
    const event = useSelector(DashboardSelectors.event)

    const classes = useStyles()
    const uploadUrl = `/api/upload/events/${event.slug}/projects`

    const getValue = index => {
        if (value.length > index) {
            return value[index]
        }
        return null
    }

    const handleChange = index => data => {
        if (!data) {
            const newValue = value.slice()
            newValue.splice(index, 1)
            onChange(newValue)
        } else {
            if (value.length > index) {
                const newValue = value.slice()
                newValue[index] = data
                onChange(newValue)
            } else {
                const newValue = value.slice()
                newValue.push(data)
                onChange(newValue)
                setActiveStep(newValue.length - 1)
            }
        }
    }

    const [activeStep, setActiveStep] = useState(0)

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }
    return (
        <Grid container>
            <Grid item xs={12}>
                <SwipeableViews
                    axis={'x'}
                    index={activeStep}
                    onChangeIndex={setActiveStep}
                    enableMouseEvents
                >
                    {Array.apply(null, Array(maxImages)).map((val, index) => (
                        <Box className={classes.block}>
                            <ImageUpload
                                value={getValue(index)}
                                resizeMode="cover"
                                uploadUrl={uploadUrl}
                                onChange={handleChange(index)}
                            />
                        </Box>
                    ))}
                </SwipeableViews>
            </Grid>
            <Grid item xs={12}>
                <MobileStepper
                    variant="dots"
                    steps={maxImages}
                    position="static"
                    activeStep={activeStep}
                    className={classes.root}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxImages - 1}
                        >
                            Next
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                        >
                            Back
                        </Button>
                    }
                />
            </Grid>
        </Grid>
    )
}
