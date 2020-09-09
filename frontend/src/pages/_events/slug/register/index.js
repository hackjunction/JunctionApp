import React, {
    useEffect,
    useCallback,
    useState,
    useMemo,
    useContext,
} from 'react'

import { sortBy } from 'lodash-es'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
    Typography,
    Stepper,
    Step,
    StepContent,
    Box,
    Button,
} from '@material-ui/core'
import { RegistrationFields } from '@hackjunction/shared'
import { push } from 'connected-react-router'

import * as SnackbarActions from 'redux/snackbar/actions'

import CenteredContainer from 'components/generic/CenteredContainer'
import Image from 'components/generic/Image'
import FadeInWrapper from 'components/animated/FadeInWrapper'
import AnalyticsService from 'services/analytics'

import RequiresPermission from 'hocs/RequiresPermission'

import RegistrationSection from './RegistrationSection'
import RegistrationSectionCustom from './RegistrationSectionCustom'
import RegistrationSectionLabel from './RegistrationSectionLabel'
import NewsLetterButton from 'components/inputs/NewsLetterButton'
import SubmitButton from 'components/inputs/SubmitButton'

import EventDetailContext from '../context'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        minHeight: '100%',
        background: 'black',
        zIndex: 100,
    },
    backgroundImage: {
        position: 'fixed',
        zIndex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.3,
        filter: 'blur(5px)',
    },
    mainTitle: {
        color: 'white',
        textAlign: 'center',
    },
    sectionTitle: {
        color: 'white',
        fontSize: '1.4rem',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    content: {
        position: 'relative',
        zIndex: 1000,
    },
    stepper: {
        background: 'transparent',
        padding: 0,
    },
    stepContent: {
        border: 'none',
        marginLeft: 0,
        paddingLeft: '8px',
    },
    top: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: theme.spacing(2),
        background: 'black',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 2000,
    },
    topTitle: {
        fontSize: '1rem',
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        margin: '2px',
    },
    topTitleExtra: {
        fontSize: '1rem',
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'normal',
        margin: '2px',
    },
    doneTitle: {
        color: 'white',
        textAlign: 'center',
    },
}))

const Connector = ({ index, active, completed, disabled }) => <div />

export default RequiresPermission(() => {
    const { t } = useTranslation()
    const classes = useStyles()
    const dispatch = useDispatch()
    const {
        event,
        slug,
        registeration,
        hasRegistration,
        createRegistration,
        editRegistration,
    } = useContext(EventDetailContext)

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const [activeStep, setActiveStep] = useState(0)
    console.log('regi', registeration)
    useEffect(() => {
        setTimeout(function () {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        }, 500)
    }, [activeStep])

    useEffect(() => {
        if (!hasRegistration) {
            AnalyticsService.events.BEGIN_REGISTRATION(slug)
        }
    }, [hasRegistration, slug])

    useEffect(() => {
        document.querySelector('html').style.backgroundColor = '#000000'

        return () => {
            document.querySelector('html').style.backgroundColor = '#ffffff'
        }
    }, [])

    const sections = useMemo(() => {
        const allFields = RegistrationFields.getFields()
        const enabledFields = Object.keys(allFields).reduce(
            (result, fieldName) => {
                const {
                    optionalFields = [],
                    requiredFields = [],
                } = event?.registrationConfig
                if (
                    requiredFields.indexOf(fieldName) !== -1 ||
                    allFields[fieldName].alwaysRequired
                ) {
                    result.push({
                        fieldName,
                        required: true,
                    })
                }

                if (optionalFields.indexOf(fieldName) !== -1) {
                    result.push({
                        fieldName,
                        required: false,
                    })
                }
                return result
            },
            []
        )

        const fieldCategories = {}
        enabledFields.forEach(({ fieldName, required }) => {
            const fieldConfig = RegistrationFields.getField(fieldName)
            const category = fieldConfig.category.label
            if (fieldCategories.hasOwnProperty(category)) {
                fieldCategories[category].push({
                    fieldName,
                    fieldConfig: RegistrationFields.getField(fieldName),
                    require: required,
                })
            } else {
                fieldCategories[category] = [
                    {
                        fieldName,
                        fieldConfig: RegistrationFields.getField(fieldName),
                        require: required,
                    },
                ]
            }
        })

        const fieldSections = Object.keys(fieldCategories).map(
            categoryLabel => {
                return {
                    order: RegistrationFields.getCategoryOrderByLabel(
                        categoryLabel
                    ),
                    label: categoryLabel,
                    fields: fieldCategories[categoryLabel],
                }
            }
        )

        const sorted = sortBy(fieldSections, 'order')
        return sorted.concat(event?.customQuestions ?? [])
    }, [event])

    const setNextStep = useCallback(
        (nextStep, values, path) => {
            if (path) {
                setFormData({
                    ...formData,
                    [path]: {
                        ...formData[path],
                        ...values,
                    },
                })
            } else {
                setFormData({
                    ...formData,
                    ...values,
                })
            }
            setActiveStep(nextStep)
        },
        [formData]
    )

    const setPrevStep = useCallback(() => {
        setActiveStep(activeStep - 1)
    }, [activeStep])

    const handleSubmit = useCallback(async () => {
        setLoading(true)
        // TODO shape the custom answers here
        if (event.customQuestions) {
            formData['CustomAnswers'] = []
            event.customQuestions.forEach(section => {
                const sec = section.name
                section.questions.forEach(question => {
                    const que = question.name
                    const value = formData[sec][que]
                    const custom = {
                        section: sec,
                        key: que,
                        value: value + '',
                    }
                    formData['CustomAnswers'].push(custom)
                })
            })
        }
        try {
            if (hasRegistration) {
                await editRegistration(formData)
            } else {
                await createRegistration(formData)
            }
            AnalyticsService.events.COMPLETE_REGISTRATION(slug)
            setActiveStep(sections.length + 1)
        } catch (e) {
            dispatch(
                SnackbarActions.error(
                    'Oops, something went wrong... Please try again'
                )
            )
        } finally {
            setLoading(false)
        }
    }, [
        createRegistration,
        dispatch,
        editRegistration,
        event.customQuestions,
        formData,
        hasRegistration,
        sections,
        slug,
    ])
    // TODO normal and custom sections should be handled the same
    const renderSteps = () => {
        return sections.map((section, index) => {
            const isCustomSection = section.hasOwnProperty('name')
            const nextStep =
                index !== sections.length - 1 ? sections[index + 1] : null
            const prevStep = index !== 0 ? sections[index - 1] : null
            return (
                <Step key={section.label}>
                    <RegistrationSectionLabel
                        isFirst={index === 0}
                        onClick={() => setActiveStep(index)}
                        label={section.label}
                        previousLabel={prevStep ? prevStep.label : null}
                        onPrevious={setPrevStep}
                    />
                    <StepContent
                        classes={{
                            root: classes.stepContent,
                        }}
                    >
                        {isCustomSection ? (
                            <RegistrationSectionCustom
                                isActive={activeStep === index}
                                section={section}
                                data={formData}
                                onPrev={setPrevStep}
                                prevLabel={prevStep ? prevStep.label : null}
                                onNext={(values, path) => {
                                    setNextStep(index + 1, values, path)
                                }}
                                nextLabel={nextStep ? nextStep.label : 'Finish'}
                            />
                        ) : (
                            <RegistrationSection
                                isActive={activeStep === index}
                                data={formData}
                                label={section.label}
                                fields={section.fields}
                                onPrev={setPrevStep}
                                prevLabel={prevStep ? prevStep.label : null}
                                onNext={values => {
                                    setNextStep(index + 1, values)
                                }}
                                nextLabel={nextStep ? nextStep.label : 'Finish'}
                            />
                        )}
                    </StepContent>
                </Step>
            )
        })
    }

    return (
        <FadeInWrapper className={classes.wrapper}>
            <Image
                className={classes.backgroundImage}
                publicId={event?.coverImage?.publicId}
                default={require('assets/images/default_cover_image.png')}
                transformation={{
                    width: 1920,
                    height: 1080,
                }}
            />
            <CenteredContainer wrapperClass={classes.content}>
                <Box className={classes.top}>
                    <Typography variant="h1" className={classes.topTitle}>
                        Register
                    </Typography>
                    <Box p={1} />
                    <Typography variant="h2" className={classes.topTitleExtra}>
                        {event?.name}
                    </Typography>
                </Box>
                <div style={{ height: '100px' }} />
                <Stepper
                    connector={<Connector />}
                    className={classes.stepper}
                    activeStep={activeStep}
                    orientation="vertical"
                >
                    {renderSteps()}
                    <Step key="finish">
                        <StepContent
                            classes={{
                                root: classes.stepContent,
                            }}
                        >
                            <NewsLetterButton
                                email={formData.email}
                                country={formData.countryOfResidence}
                            />
                            <Box mt={5} />
                            <SubmitButton
                                hasErrors={false}
                                onSubmit={handleSubmit}
                                loading={loading}
                                event={event}
                            />
                        </StepContent>
                    </Step>
                    <Step key="done">
                        <StepContent
                            classes={{
                                root: classes.stepContent,
                            }}
                        >
                            <Box
                                mt={'200px'}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                            >
                                <Typography
                                    className={classes.doneTitle}
                                    variant="h3"
                                >
                                    {t('Registration_saved_')}
                                </Typography>
                                <div style={{ height: '50px' }} />
                                <Button
                                    onClick={() =>
                                        dispatch(push(`/dashboard/${slug}`))
                                    }
                                    style={{ width: '300px' }}
                                    color="primary"
                                    variant="contained"
                                >
                                    {t('Event_dashboard_')}
                                </Button>
                                <div style={{ height: '1rem' }} />
                                <Button
                                    onClick={() =>
                                        dispatch(push(`/events/${slug}`))
                                    }
                                    style={{ width: '300px', color: 'white' }}
                                >
                                    {t('Back_to_event_')}
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>
                </Stepper>
                <div style={{ height: '100px' }} />
            </CenteredContainer>
        </FadeInWrapper>
    )
})
