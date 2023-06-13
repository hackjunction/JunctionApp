import React from 'react'
import junctionStyle from 'utils/styles'
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    AccordionActions,
    Chip,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from 'components/generic/Button'
import { makeStyles } from '@material-ui/core/styles'

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

function TeamCard() {
    const classes = junctionStyle()
    const classes2 = useStyles()

    return (
        <Card
            className={`${classes.w450} ${classes.shadow1} ${classes.border1}`}
        >
            <CardContent className={`${classes.textAlignStart} ${classes.p3}`}>
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
                    <Grid item justifyContent="center" xs={4}>
                        <Button color="outlined_button" variant="jOutlined">
                            Designer
                        </Button>
                    </Grid>
                    <Grid item justifyContent="center" xs={4}>
                        <Button color="outlined_button" variant="jOutlined">
                            Designer
                        </Button>
                    </Grid>
                    <Grid item justifyContent="center" xs={4}>
                        <Button color="outlined_button" variant="jOutlined">
                            Designer
                        </Button>
                    </Grid>
                </Grid>
                <Typography
                    className={`${classes.pb2} ${classes.fs3}`}
                    variant="h6"
                    component="h6"
                >
                    How to design more user friendly medical app experience ?
                </Typography>
                <Typography
                    className={classes.fs2}
                    variant="body2"
                    component="p"
                >
                    Our idea is to design a digital solution for mobile phones,
                    which would focus on helping teenagers access free therapy
                    sessions. We believe that through empathetic design and a
                    deep understanding of human psychology combined with design
                    we can make a real change in the world.
                </Typography>
            </CardContent>
            <CardActions className={classes.pxb3}>
                <Button variant="jContained">Learn More</Button>
            </CardActions>
            <div className={classes2.root}>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        <div className={classes2.column}>
                            <Typography className={classes2.heading}>
                                Location
                            </Typography>
                        </div>
                        <div className={classes2.column}>
                            <Typography className={classes2.secondaryHeading}>
                                Select trip destination
                            </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes2.details}>
                        <div className={classes2.column} />
                        <div className={classes2.column}>
                            <Chip label="Barbados" onDelete={() => {}} />
                        </div>
                        <div
                            className={`
                                                    ${classes2.column}
                                                    ${classes2.helper},
                                                `}
                        >
                            <Typography variant="caption">
                                Select your destination of choice
                                <br />
                                <a
                                    href="#secondary-heading-and-columns"
                                    className={classes2.link}
                                >
                                    Learn more
                                </a>
                            </Typography>
                        </div>
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                        <Button size="small">Cancel</Button>
                        <Button size="small" color="primary">
                            Save
                        </Button>
                    </AccordionActions>
                </Accordion>
            </div>
        </Card>
    )
}

export default TeamCard
