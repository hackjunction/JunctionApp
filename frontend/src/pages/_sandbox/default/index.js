import React from 'react'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import junctionStyle from 'utils/styles'
import {
    AppBar,
    Card,
    CardActions,
    CardContent,
    Chip,
    Grid,
    Tab,
    Tabs,
    Typography,
} from '@material-ui/core'
import { Yes, No, NotAvailable } from 'components/generic/Tag/Variants'

import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionActions from '@material-ui/core/AccordionActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import Container from 'components/generic/Container'
import Button from 'components/generic/Button'
import Tag from 'components/generic/Tag'
import { Skeleton, TabPanel } from '@material-ui/lab'
import TeamCard from 'components/cards/TeamCard'

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default () => {
    // const [events, loading] = useMyEvents()
    const classes = junctionStyle()
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return (
        <PageWrapper
            // loading={loading}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <Container center>
                    {/* <div>
                        <AppBar position="static">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="simple tabs example"
                            >
                                <Tab label="Item One" {...a11yProps(0)} />
                                <Tab label="Item Two" {...a11yProps(1)} />
                                <Tab label="Item Three" {...a11yProps(2)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            Item One
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three
                        </TabPanel>
                    </div> */}
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}
                    >
                        <Masonry>
                            <TeamCard />
                            <TeamCard />
                            <TeamCard />
                            <TeamCard />
                            <TeamCard />
                            <TeamCard />
                            <TeamCard />
                            <TeamCard />
                        </Masonry>
                    </ResponsiveMasonry>
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
