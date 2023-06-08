import React from 'react'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import { makeStyles } from '@material-ui/core/styles'
import {
    Card,
    CardActions,
    CardContent,
    Chip,
    Typography,
} from '@material-ui/core'
import { Yes, No, NotAvailable } from 'components/generic/Tag/Variants'

import Container from 'components/generic/Container'
import Button from 'components/generic/Button'
import Tag from 'components/generic/Tag'
import { Skeleton } from '@material-ui/lab'
// import theme from 'material-ui-theme'
import theme from 'junctionTheme'

// import { useMyEvents } from 'graphql/queries/events'

const useStyles = makeStyles({
    root: {
        borderRadius: '8px',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.16)',
        maxWidth: '450px',
    },
    content: {
        textAlign: 'start',
    },
    pb2: {
        paddingBottom: theme.spacing(2),
    },
    title: {
        fontSize: '40px',
    },
    cardNote: {
        fontSize: '18px',
    },
})

export default () => {
    // const [events, loading] = useMyEvents()
    const classes = useStyles()
    return (
        <PageWrapper
            // loading={loading}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <Container center>
                    <Card className={classes.root}>
                        <CardContent className={classes.content}>
                            <Typography
                                className={`${classes.title} ${classes.pb2}`}
                                variant="h4"
                                component="h4"
                            >
                                {'Pink unicorn'.toUpperCase()}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="secondary"
                                component="h6"
                            >
                                #Fazer
                            </Typography>
                            <Typography variant="h6" component="h6">
                                Available roles
                            </Typography>
                            <p>some badge</p>
                            <Typography variant="h6" component="h6">
                                How to design more user friendly medical app
                                experience ?
                            </Typography>
                            <Typography variant="body2" component="p">
                                Our idea is to design a digital solution for
                                mobile phones, which would focus on helping
                                teenagers access free therapy sessions. We
                                believe that through empathetic design and a
                                deep understanding of human psychology combined
                                with design we can make a real change in the
                                world.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained">Learn More</Button>
                        </CardActions>
                    </Card>
                    <Card>
                        <CardContent className={classes.content}>
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
                            <Chip color="secondary" label="Secondary chip" />
                            <Chip variant="outlined" label="Outlined chip" />
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
                        </CardContent>
                        <CardActions>
                            <Button color="outlined_button" variant="outlined">
                                Outlined button
                            </Button>
                            <Button variant="contained">Outlined button</Button>
                            <Button>Default button</Button>
                        </CardActions>
                    </Card>
                </Container>
            )}
        />
    )
}
