import React, { useEffect, useState } from 'react'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import junctionStyle from 'utils/styles'
import {
    AppBar,
    Avatar,
    Card,
    CardActions,
    CardContent,
    Chip,
    Grid,
    Tab,
    Tabs,
    Tooltip,
    Typography,
} from '@material-ui/core'
import { Yes, No, NotAvailable } from 'components/generic/Tag/Variants'

import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionActions from '@material-ui/core/AccordionActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import DeleteIcon from '@material-ui/icons/Delete'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined'
import CheckIcon from '@material-ui/icons/Check'
import {
    Email,
    Check,
    CheckCircleOutlined,
    ErrorOutlineOutlined,
    ReportProblemOutlined,
    InfoOutlined,
    InfoTwoTone,
    MoreHoriz,
    NavigateBefore,
    NavigateNext,
    Delete,
    ArrowBackIos,
    ExpandMore,
    FirstPage,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage,
    ErrorOutline,
    Visibility,
    Clear,
    Cancel,
    Menu,
    Lock,
    Storage,
    AccountBox,
    ExitToApp,
    KeyboardBackspace,
    Edit,
    Star,
    GitHub,
    LinkedIn,
    Brush,

    LocationOn,

    ThumbUp,

    Group,
    Dashboard,
    Fingerprint,
    FlightTakeoff,
    AmpStories,

    AssignmentOutlined,
    StarRate,
    HowToVote,
    FormatListBulleted,
    QuestionAnswerSharp,
    Event,
    ChevronRight,
    ChevronLeft,
    FiberManualRecord,
    CheckCircleOutline,
    SentimentVeryDissatisfied,
    Search,






    Tune,
    Settings,
    Equalizer,
    People,
    CropFree,
    Code,

    Assessment,
    HighlightOff,
    Save,
    Close,
    SettingsBrightnessSharp,

    Block,

    VisibilityOff,

    ExpandLess,

    KeyboardArrowDown,


} from '@material-ui/icons'
import Divider from '@material-ui/core/Divider'


import { Formik } from 'formik'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as OrganiserActions from 'redux/organiser/actions'
import * as DashboardActions from 'redux/dashboard/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import { useRouteMatch, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import ConfigureTab from './configure'
import { UPDATE_EVENT } from 'graphql/mutations/eventOps'
import { forOwn } from 'lodash-es'
import yupSchema from '@hackjunction/shared/schemas/validation/eventSchema'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import Container from 'components/generic/Container'
import Button from 'components/generic/Button'
import Tag from 'components/generic/Tag'
import { Skeleton, TabPanel } from '@material-ui/lab'
import TeamCard from 'components/cards/TeamCard'
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import BottomBar from 'components/inputs/BottomBar'
import FormControl from 'components/inputs/FormControl'
import TextInput from 'components/inputs/TextInput'
import TextAreaInput from 'components/inputs/TextAreaInput'
import MarkdownInput from 'components/inputs/MarkdownInput'
import BooleanInput from 'components/inputs/BooleanInput'
import Select from 'components/inputs/Select'
import DateInput from 'components/inputs/DateInput'
import DateTimeInput from 'components/inputs/DateTimeInput'
import ProjectStatusInput from 'components/inputs/ProjectStatusInput'
import Filter from 'components/Team/Filter'
import ProjectDetail from 'components/projects/ProjectDetail'
import { EventHelpers } from '@hackjunction/shared'
import moment from 'moment-timezone'
import EvaluationForm from './EvaluationForm'

export default () => {
    const dispatch = useDispatch()
    // lhello
    const [saveChanges, saveResult] = useMutation(UPDATE_EVENT, {
        onError: err => {
            const errors = err.graphQLErrors

            if (errors) {
                dispatch(
                    SnackbarActions.error('Unable to save changes', {
                        errorMessages: Object.keys(errors).map(
                            key => `${key}: ${errors[key].message}`,
                        ),
                        persist: false, // this could be the problem why errors messages persist? => solution: set to false
                    }),
                )
            } else {
                dispatch(SnackbarActions.error('Unable to save changes'))
            }
        },
        onCompleted: () => {
            dispatch(OrganiserActions.updateEvent(slug)).then(() =>
                dispatch(
                    SnackbarActions.success(
                        'Your changes were saved successfully',
                    ),
                ),
            )
        },
    })
    const match = useRouteMatch()
    const location = useLocation()

    const [project, setProject] = useState(null)

    const fetchProjects = async slugEvent =>
        dispatch(DashboardActions.updateProjects(slugEvent))

    const handleClick = () => {
        fetchProjects('1-random-event')
            .then(projectsFetched => {
                setProject(projectsFetched.payload[0])
                console.log('projects', project)
            })
            .finally(() => setSelected(true))
    }

    // let projects
    const event = useSelector(OrganiserSelectors.event)
    // const projects = () => {
    //     projects = await fetchProjects('1-random-event')
    // }
    // useEffect(() => {
    //     fetchProjects('1-random-event').then(projectsFetched => {
    //         projects = projectsFetched.payload
    //         console.log('projects', projects)
    //     })
    // }, [])

    //    () => await fetchProjects('1-random-event')

    // fetchProjects('1-random-event')
    //     .then(projectsFetched => (projects = projectsFetched.payload))
    //     .then(() => console.log('projects', projects))
    console.log('event on sandbox', event)
    const loading = useSelector(OrganiserSelectors.eventLoading)
    const { slug, _id } = event

    function onSubmit(values, actions) {
        const changed = {}
        forOwn(values, (value, field) => {
            if (event[field] !== value) {
                changed[field] = value
            }
        })
        saveChanges({
            variables: { _id, input: changed },
        })
        actions.setSubmitting(false)
    }

    // const [events, loading] = useMyEvents()

    const [projectScore, setProjectScore] = useState({
        project: '',
        event: '',
        status: 'submitted',
        score: 0,
        maxScore: 10,
        message: '',
    })
    const [selected, setSelected] = useState(false)
    const classes = junctionStyle()
    return (
        <PageWrapper
            // loading={loading}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <Container>
                    {/* <Formik
                        initialValues={
                            saveResult.data
                                ? saveResult.data.updateEvent
                                : event
                        }
                        enableReinitialize={true}
                        onSubmit={onSubmit}
                        validationSchema={yupSchema}
                    >
                        {formikProps => (
                            <>
                                <MaterialTabsLayout
                                    transparent
                                    tabs={[
                                        {
                                            path: '',
                                            key: 'basic-details',
                                            label: 'Basic Details',
                                            component: TeamCard,
                                        },
                                        {
                                            path: '/configure',
                                            key: 'configure',
                                            label: 'Configure',
                                            component: ConfigureTab,
                                        },
                                    ]}
                                    location={location}
                                    baseRoute={match.url}
                                />
                                <div style={{ height: '100px' }} />
                                <BottomBar
                                    onSubmit={formikProps.handleSubmit}
                                    errors={formikProps.errors}
                                    dirty={formikProps.dirty}
                                    loading={saveResult.loading}
                                />
                            </>
                        )}
                    </Formik> */}
                    {selected && (
                        <div>
                            <ProjectDetail
                                project={project}
                                event={event}
                                onBack={() => setSelected(false)}
                                showFullTeam={true}
                                showTableLocation={
                                    !EventHelpers.isEventOver(event, moment)
                                }
                            />
                            <EvaluationForm
                                event={event}
                                project={project}
                                // submit={handleSubmit}
                                score={projectScore}
                            />
                        </div>
                    )}
                    {!selected && (
                        <div className="tw-flex tw-flex-col tw-gap-4">
                            <div className="tw-flex tw-justify-between tw-items-end">
                                <div className="tw-flex tw-flex-col tw-gap-2">
                                    <Typography
                                        className="tw-font-bold tw-tracking-tight tw-break-words-overflow"
                                        variant="h4"
                                        component="h4"
                                    >
                                        Reviewing
                                    </Typography>
                                    <div className="tw-flex tw-gap-2">
                                        <Typography
                                            className="tw-tracking-tight tw-font-medium"
                                            variant="h6"
                                            component="h6"
                                        >
                                            By Aalto x TEK
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="secondary"
                                            component="p"
                                        >
                                            10 projects
                                        </Typography>
                                    </div>
                                </div>
                                <Filter />
                            </div>
                            <ResponsiveMasonry
                                columnsCountBreakPoints={{
                                    350: 1,
                                    750: 2,
                                    1024: 3,
                                }}
                            >
                                <Masonry>
                                    <Card
                                        onClick={() => {
                                            console.log('card clicked')
                                            handleClick()
                                        }}
                                        className={`tw-bg-white tw-m-4 tw-text-left tw-rounded-lg tw-shadow-md tw-h-464px tw-flex tw-flex-col tw-justify-between`}
                                    >
                                        <CardContent className="tw-flex tw-flex-col tw-p-0">
                                            <div className="tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 tw-w-full tw-h-40 tw-rounded-lg tw-flex tw-justify-end tw-items-start">
                                                <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4">
                                                    <Chip
                                                        color="primary"
                                                        label="Seen"
                                                    />
                                                    <Chip
                                                        color="secondary"
                                                        label="Final"
                                                    />
                                                </div>
                                            </div>
                                            <div className="tw-p-4 tw-flex tw-flex-col tw-gap-4">
                                                <div className="tw-flex tw-flex-col tw-gap-2">
                                                    <Typography
                                                        className="tw-font-semibold"
                                                        variant="body1"
                                                        component="p"
                                                    >
                                                        Something important
                                                    </Typography>
                                                    <div>
                                                        <Chip label="Challenge" />
                                                    </div>
                                                    <Typography
                                                        variant="body1"
                                                        component="p"
                                                    >
                                                        It is amazing here
                                                    </Typography>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardActions className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-px-4 tw-pb-4 tw-pt-0 tw-gap-4">
                                            <Button
                                                onClick={e => {
                                                    e.stopPropagation()
                                                }}
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                See more
                                            </Button>
                                            <div className="tw-flex tw-gap-1 tw-w-full">
                                                <Tooltip title="Reviewed by A">
                                                    <Avatar>A</Avatar>
                                                </Tooltip>
                                                <Tooltip title="Reviewed by B">
                                                    <Avatar>B</Avatar>
                                                </Tooltip>
                                                <Tooltip title="Reviewed by 3 more people">
                                                    <Avatar>+3</Avatar>
                                                </Tooltip>
                                            </div>
                                        </CardActions>
                                    </Card>
                                </Masonry>
                            </ResponsiveMasonry>
                        </div>
                    )}
                    <div>
                        <Card>
                            <CardContent className={classes.textAlignStart}>
                                <Typography variant="h1" component="h1">
                                    Heading 1
                                </Typography>
                                <Typography variant="h2" component="h2">
                                    Heading 2
                                </Typography>
                                <Typography variant="h3" component="h3">
                                    Heading 3
                                </Typography>
                                <Typography variant="h4" component="h4">
                                    Heading 4
                                </Typography>
                                <Typography variant="h5" component="h5">
                                    Heading 5
                                </Typography>
                                <Typography variant="h6" component="h6">
                                    Heading 6
                                </Typography>
                                <Typography variant="subtitle1" component="h6">
                                    Subtitle1
                                </Typography>
                                <Typography variant="subtitle2" component="h6">
                                    Subtitle2
                                </Typography>
                                <Typography variant="body1" component="p">
                                    Body 1
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Body 2
                                </Typography>
                                <Typography variant="button" component="p">
                                    Button
                                </Typography>
                                <Typography variant="caption" component="p">
                                    Caption
                                </Typography>
                                <Typography variant="overline" component="p">
                                    Overline
                                </Typography>
                                <Chip label="Default chip" />
                                <Chip color="primary" label="Primary chip" />
                                <Chip
                                    color="secondary"
                                    label="Secondary chip"
                                />
                                <Chip
                                    variant="outlined"
                                    label="Outlined chip"
                                />
                                <Chip
                                    variant="outlined"
                                    color="primary"
                                    label="Outlined primary chip"
                                />
                                <Chip
                                    variant="outlined"
                                    color="secondary"
                                    label="Outlined secondary chip"
                                />
                                <Tag label="Default tag"></Tag>
                                <Tag color="primary" label="Default tag"></Tag>
                                <Yes />
                                <No />
                                <NotAvailable />
                                <Skeleton variant="text" animation="wave" />
                                <Skeleton
                                    variant="rect"
                                    width={210}
                                    height={118}
                                    animation="wave"
                                />
                                <Skeleton
                                    variant="circle"
                                    width={40}
                                    height={40}
                                    animation="wave"
                                />

                                <Button
                                    color="outlined_button"
                                    variant="outlined"
                                >
                                    Outlined button
                                </Button>
                                <Button
                                    color="outlined_button"
                                    variant="outlinedNew"
                                >
                                    OutlinedNew button
                                </Button>
                                <Button
                                    color="outlined_button"
                                    variant="outlined"
                                    strong={true}
                                >
                                    Outlined strong button
                                </Button>
                                <Button
                                    color="outlined_button"
                                    variant="outlined"
                                    loading={true}
                                >
                                    Outlined loading button
                                </Button>
                                <Button variant="contained">
                                    Contained button
                                </Button>
                                <Button
                                    color="theme_blue"
                                    variant="containedNew"
                                >
                                    ContainedNew button
                                </Button>
                                <Button variant="contained" strong={true}>
                                    Contained strong button
                                </Button>
                                <Button variant="contained" loading={true}>
                                    Contained loading button
                                </Button>
                                <Button>Default button</Button>
                                <Button strong={true}>
                                    Strong default button
                                </Button>
                                <Button loading={true}>
                                    Loading default button
                                </Button>
                                ArrowBackIosIcon
                                <ArrowBackIosIcon style={{ color: 'black' }} />
                                ExpandMoreIcon
                                <ExpandMoreIcon />
                                Email
                                <Email />
                                Check
                                <Check />
                                CheckCircleOutlined
                                <CheckCircleOutlined />
                                ErrorOutlineOutlined
                                <ErrorOutlineOutlined />
                                ReportProblemOutlined
                                <ReportProblemOutlined />
                                InfoOutlined
                                <InfoOutlined />
                                InfoTwoTone
                                <InfoTwoTone />
                                MoreHoriz
                                <MoreHoriz />
                                NavigateBefore
                                <NavigateBefore />
                                NavigateNext
                                <NavigateNext />
                                Delete
                                <Delete />
                                ArrowBackIos
                                <ArrowBackIos />
                                ExpandMore
                                <ExpandMore />
                                FirstPage
                                <FirstPage />
                                KeyboardArrowLeft
                                <KeyboardArrowLeft />
                                KeyboardArrowRight
                                <KeyboardArrowRight />
                                LastPage
                                <LastPage />
                                ErrorOutline
                                <ErrorOutline />
                                Visibility
                                <Visibility />

                                Clear
                                <Clear />
                                Cancel
                                <Cancel />

                                Lock
                                <Lock />
                                Storage
                                <Storage />
                                AccountBox
                                <AccountBox />
                                ExitToApp
                                <ExitToApp />
                                KeyboardBackspace
                                <KeyboardBackspace />
                                Edit
                                <Edit />
                                Star
                                <Star
                                />
                                GitHub
                                <GitHub />
                                LinkedIn
                                <LinkedIn />
                                Brush
                                <Brush />
                                ArrowBackIos
                                <ArrowBackIos />
                                LocationOn
                                <LocationOn />
                                Menu
                                <Menu />
                                ThumbUp
                                <ThumbUp />
                                ArrowBackIos
                                <ArrowBackIos />
                                Group
                                <Group />
                                Dashboard
                                <Dashboard />
                                Fingerprint
                                <Fingerprint />
                                FlightTakeoff
                                <FlightTakeoff />
                                AmpStories
                                <AmpStories />
                                AssignmentOutlined
                                <AssignmentOutlined />
                                StarRate
                                <StarRate />
                                HowToVote
                                <HowToVote />
                                FormatListBulleted
                                <FormatListBulleted />
                                QuestionAnswerSharp
                                <QuestionAnswerSharp />
                                Event
                                <Event />
                                ChevronRight
                                <ChevronRight />
                                ChevronLeft
                                <ChevronLeft />
                                FiberManualRecord
                                <FiberManualRecord />
                                CheckCircleOutline
                                <CheckCircleOutline />
                                SentimentVeryDissatisfied
                                <SentimentVeryDissatisfied />
                                Search
                                <Search />
                                Tune
                                <Tune />
                                Settings
                                <Settings />
                                Equalizer
                                <Equalizer />
                                People
                                <People />
                                CropFree
                                <CropFree />
                                Code
                                <Code />

                                Assessment
                                <Assessment />
                                HighlightOff
                                <HighlightOff />
                                Save
                                <Save />
                                Close
                                <Close />
                                SettingsBrightnessSharp
                                <SettingsBrightnessSharp />
                                Block
                                <Block />
                                VisibilityOff
                                <VisibilityOff />
                                ExpandLess
                                <ExpandLess />
                                KeyboardArrowDown
                                <KeyboardArrowDown />

                                <ProjectStatusInput
                                    value={''}
                                    onChange={() => console.log('ProjectStatusInput')
                                    }
                                />

                                <BottomBar
                                    onSubmit={
                                        () => console.log('submit')
                                    }
                                    errors={
                                        {}
                                    }
                                    dirty={false}
                                    loading={false}
                                />
                                <FormControl
                                    label={'FormControl'}
                                    hint={'FormControl'}
                                    touched={true}
                                    error={false}
                                    children={''}
                                />
                                <TextInput
                                    disabled={false}
                                    label="TextInput"
                                    helperText="TextInput"
                                    value={''}
                                    onChange={() => console.log('TextInput')}
                                />
                                <TextAreaInput
                                    placeholder={'TextAreaInput'}
                                    value={''}
                                    onChange={() => console.log('TextAreaInput')}
                                    onBlur={() => console.log('TextAreaInput')}
                                />
                                <DateInput label={'DateInput'} value={''} onChange={() => console.log('date')} onBlur={() => console.log('date')} disableFutureYears={false} />
                                <DateTimeInput
                                    value={''}
                                    onChange={() => console.log('DateTimeInput')}
                                />
                                <MarkdownInput
                                    name={'markdown input'}
                                    value={'markdown input'}
                                    onChange={
                                        console.log('markdown')
                                    }
                                    onBlur={() =>
                                        console.log('markdown')
                                    }
                                    placeholder={
                                        "markdown input"
                                    }
                                />
                                <BooleanInput
                                    value={'boolean input'}
                                    onChange={
                                        console.log('boolean')
                                    }
                                />
                                <Select />
                            </CardContent>
                            <CardActions></CardActions>
                        </Card>
                    </div>
                </Container>
            )}
        />
    )
}
