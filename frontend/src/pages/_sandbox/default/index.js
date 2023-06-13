import React from 'react'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import junctionStyle from 'utils/styles'
import {
    Card,
    CardActions,
    CardContent,
    Chip,
    Grid,
    Typography,
} from '@material-ui/core'
import { Yes, No, NotAvailable } from 'components/generic/Tag/Variants'

import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionActions from '@material-ui/core/AccordionActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'

import Container from 'components/generic/Container'
import Button from 'components/generic/Button'
import Tag from 'components/generic/Tag'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}))

export default () => {
    // const [events, loading] = useMyEvents()
    const classes2 = useStyles()
    const classes = junctionStyle()
    return (
        <PageWrapper
            // loading={loading}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <Container center>
                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Card
                                className={`${classes.w450} ${classes.shadow1} ${classes.border1}`}
                            >
                                <CardContent
                                    className={`${classes.textAlignStart} ${classes.p3}`}
                                >
                                    <Typography
                                        className={`${classes.fs5} ${classes.pb2}`}
                                        variant="h4"
                                        component="h4"
                                    >
                                        {'Pink unicorn'.toUpperCase()}
                                    </Typography>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs2half}`}
                                        variant="subtitle1"
                                        color="secondary"
                                        component="h6"
                                    >
                                        #Fazer
                                    </Typography>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs3}`}
                                        variant="h6"
                                        component="h6"
                                    >
                                        Available roles
                                    </Typography>
                                    <Grid container className={classes.pb2}>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs3}`}
                                        variant="h6"
                                        component="h6"
                                    >
                                        How to design more user friendly medical
                                        app experience ?
                                    </Typography>
                                    <Typography
                                        className={classes.fs2}
                                        variant="body2"
                                        component="p"
                                    >
                                        Our idea is to design a digital solution
                                        for mobile phones, which would focus on
                                        helping teenagers access free therapy
                                        sessions. We believe that through
                                        empathetic design and a deep
                                        understanding of human psychology
                                        combined with design we can make a real
                                        change in the world.
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.pxb3}>
                                    <Button variant="jContained">
                                        Learn More
                                    </Button>
                                </CardActions>
                                <div className={classes2.root}>
                                    <Accordion defaultExpanded>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1c-content"
                                            id="panel1c-header"
                                        >
                                            <div className={classes2.column}>
                                                <Typography
                                                    className={classes2.heading}
                                                >
                                                    Location
                                                </Typography>
                                            </div>
                                            <div className={classes2.column}>
                                                <Typography
                                                    className={
                                                        classes2.secondaryHeading
                                                    }
                                                >
                                                    Select trip destination
                                                </Typography>
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails
                                            className={classes2.details}
                                        >
                                            <div className={classes2.column} />
                                            <div className={classes2.column}>
                                                <Chip
                                                    label="Barbados"
                                                    onDelete={() => {}}
                                                />
                                            </div>
                                            <div
                                                className={`
                                                    ${classes2.column}
                                                    ${classes2.helper},
                                                `}
                                            >
                                                <Typography variant="caption">
                                                    Select your destination of
                                                    choice
                                                    <br />
                                                    <a
                                                        href="#secondary-heading-and-columns"
                                                        className={
                                                            classes2.link
                                                        }
                                                    >
                                                        Learn more
                                                    </a>
                                                </Typography>
                                            </div>
                                        </AccordionDetails>
                                        <Divider />
                                        <AccordionActions>
                                            <Button size="small">Cancel</Button>
                                            <Button
                                                size="small"
                                                color="primary"
                                            >
                                                Save
                                            </Button>
                                        </AccordionActions>
                                    </Accordion>
                                </div>
                            </Card>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            justifyContent="center"
                        >
                            <Card
                                className={`${classes.w450} ${classes.shadow1} ${classes.border1}`}
                            >
                                <CardContent
                                    className={`${classes.textAlignStart} ${classes.p3}`}
                                >
                                    <Typography
                                        className={`${classes.fs5} ${classes.pb2}`}
                                        variant="h4"
                                        component="h4"
                                    >
                                        {'Pink unicorn'.toUpperCase()}
                                    </Typography>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs2half}`}
                                        variant="subtitle1"
                                        color="secondary"
                                        component="h6"
                                    >
                                        #Fazer
                                    </Typography>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs3}`}
                                        variant="h6"
                                        component="h6"
                                    >
                                        Available roles
                                    </Typography>
                                    <Grid container className={classes.pb2}>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs3}`}
                                        variant="h6"
                                        component="h6"
                                    >
                                        How to design more user friendly medical
                                        app experience ?
                                    </Typography>
                                    <Typography
                                        className={classes.fs2}
                                        variant="body2"
                                        component="p"
                                    >
                                        Our idea is to design a digital solution
                                        for mobile phones, which would focus on
                                        helping teenagers access free therapy
                                        sessions. We believe that through
                                        empathetic design and a deep
                                        understanding of human psychology
                                        combined with design we can make a real
                                        change in the world.
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.pxb3}>
                                    <Button variant="jContained">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            justifyContent="center"
                        >
                            <Card
                                className={`${classes.w450} ${classes.shadow1} ${classes.border1}`}
                            >
                                <CardContent
                                    className={`${classes.textAlignStart} ${classes.p3}`}
                                >
                                    <Typography
                                        className={`${classes.fs5} ${classes.pb2}`}
                                        variant="h4"
                                        component="h4"
                                    >
                                        {'Pink unicorn'.toUpperCase()}
                                    </Typography>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs2half}`}
                                        variant="subtitle1"
                                        color="secondary"
                                        component="h6"
                                    >
                                        #Fazer
                                    </Typography>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs3}`}
                                        variant="h6"
                                        component="h6"
                                    >
                                        Available roles
                                    </Typography>
                                    <Grid container className={classes.pb2}>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs3}`}
                                        variant="h6"
                                        component="h6"
                                    >
                                        How to design more user friendly medical
                                        app experience ?
                                    </Typography>
                                    <Typography
                                        className={classes.fs2}
                                        variant="body2"
                                        component="p"
                                    >
                                        Our idea is to design a digital solution
                                        for mobile phones, which would focus on
                                        helping teenagers access free therapy
                                        sessions. We believe that through
                                        empathetic design and a deep
                                        understanding of human psychology
                                        combined with design we can make a real
                                        change in the world.
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.pxb3}>
                                    <Button variant="jContained">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            justifyContent="center"
                        >
                            <Card
                                className={`${classes.w450} ${classes.shadow1} ${classes.border1}`}
                            >
                                <CardContent
                                    className={`${classes.textAlignStart} ${classes.p3}`}
                                >
                                    <Typography
                                        className={`${classes.fs5} ${classes.pb2}`}
                                        variant="h4"
                                        component="h4"
                                    >
                                        {'Pink unicorn'.toUpperCase()}
                                    </Typography>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs2half}`}
                                        variant="subtitle1"
                                        color="secondary"
                                        component="h6"
                                    >
                                        #Fazer
                                    </Typography>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs3}`}
                                        variant="h6"
                                        component="h6"
                                    >
                                        Available roles
                                    </Typography>
                                    <Grid container className={classes.pb2}>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs3}`}
                                        variant="h6"
                                        component="h6"
                                    >
                                        How to design more user friendly medical
                                        app experience ?
                                    </Typography>
                                    <Typography
                                        className={classes.fs2}
                                        variant="body2"
                                        component="p"
                                    >
                                        Our idea is to design a digital solution
                                        for mobile phones, which would focus on
                                        helping teenagers access free therapy
                                        sessions. We believe that through
                                        empathetic design and a deep
                                        understanding of human psychology
                                        combined with design we can make a real
                                        change in the world.
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.pxb3}>
                                    <Button variant="jContained">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            justifyContent="center"
                        >
                            <Card
                                className={`${classes.w450} ${classes.shadow1} ${classes.border1}`}
                            >
                                <CardContent
                                    className={`${classes.textAlignStart} ${classes.p3}`}
                                >
                                    <Typography
                                        className={`${classes.fs5} ${classes.pb2}`}
                                        variant="h4"
                                        component="h4"
                                    >
                                        {'Pink unicorn'.toUpperCase()}
                                    </Typography>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs2half}`}
                                        variant="subtitle1"
                                        color="secondary"
                                        component="h6"
                                    >
                                        #Fazer
                                    </Typography>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs3}`}
                                        variant="h6"
                                        component="h6"
                                    >
                                        Available roles
                                    </Typography>
                                    <Grid container className={classes.pb2}>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs3}`}
                                        variant="h6"
                                        component="h6"
                                    >
                                        How to design more user friendly medical
                                        app experience ?
                                    </Typography>
                                    <Typography
                                        className={classes.fs2}
                                        variant="body2"
                                        component="p"
                                    >
                                        Our idea is to design a digital solution
                                        for mobile phones, which would focus on
                                        helping teenagers access free therapy
                                        sessions. We believe that through
                                        empathetic design and a deep
                                        understanding of human psychology
                                        combined with design we can make a real
                                        change in the world.
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.pxb3}>
                                    <Button variant="jContained">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            justifyContent="center"
                        >
                            <Card
                                className={`${classes.w450} ${classes.shadow1} ${classes.border1}`}
                            >
                                <CardContent
                                    className={`${classes.textAlignStart} ${classes.p3}`}
                                >
                                    <Typography
                                        className={`${classes.fs5} ${classes.pb2}`}
                                        variant="h4"
                                        component="h4"
                                    >
                                        {'Pink unicorn'.toUpperCase()}
                                    </Typography>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs2half}`}
                                        variant="subtitle1"
                                        color="secondary"
                                        component="h6"
                                    >
                                        #Fazer
                                    </Typography>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs3}`}
                                        variant="h6"
                                        component="h6"
                                    >
                                        Available roles
                                    </Typography>
                                    <Grid container className={classes.pb2}>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                        <Grid
                                            item
                                            justifyContent="center"
                                            xs={4}
                                        >
                                            <Button
                                                color="outlined_button"
                                                variant="jOutlined"
                                            >
                                                Designer
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Typography
                                        className={`${classes.pb2} ${classes.fs3}`}
                                        variant="h6"
                                        component="h6"
                                    >
                                        How to design more user friendly medical
                                        app experience ?
                                    </Typography>
                                    <Typography
                                        className={classes.fs2}
                                        variant="body2"
                                        component="p"
                                    >
                                        Our idea is to design a digital solution
                                        for mobile phones, which would focus on
                                        helping teenagers access free therapy
                                        sessions. We believe that through
                                        empathetic design and a deep
                                        understanding of human psychology
                                        combined with design we can make a real
                                        change in the world.
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.pxb3}>
                                    <Button variant="jContained">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
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
                            </CardContent>
                            <CardActions></CardActions>
                        </Card>
                    </div>
                </Container>
            )}
        />
    )
}
