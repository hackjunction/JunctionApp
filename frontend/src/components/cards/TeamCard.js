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

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

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
    return (
        <Card className="tw-bg-white tw-m-4 tw-text-left tw-rounded-lg tw-shadow-md tw-h-672px tw-flex tw-flex-col tw-justify-between">
            <CardContent className="tw-flex tw-flex-col tw-p-0">
                <div className="tw tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 tw-w-full tw-h-16 tw-rounded-lg"></div>
                <div className="tw-p-4 tw-flex tw-flex-col tw-gap-4">
                    <div className="tw-flex tw-items-center tw-gap-4">
                        <Typography
                            className="tw-font-bold tw-tracking-tight"
                            variant="h3"
                            component="h3"
                        >
                            Explorers
                        </Typography>
                        <Typography
                            className="tw-tracking-tight tw-font-medium"
                            variant="h5"
                            color="secondary"
                            component="h5"
                        >
                            #Fazer
                        </Typography>
                    </div>
                    <Typography
                        className="tw-tracking-tight tw-font-medium"
                        variant="h5"
                        component="h5"
                    >
                        Available roles
                    </Typography>
                    <div className="tw-flex tw-flex-col tw-gap-4">
                        <Button
                            color="outlined_button"
                            variant="jOutlinedBox"
                            children={
                                <div className="tw-flex tw-flex-col tw-gap-2 tw-items-start tw-w-full">
                                    <Typography
                                        className="tw-font-semibold"
                                        variant="h6"
                                        component="h6"
                                    >
                                        UX designer
                                    </Typography>
                                    <Typography
                                        className="tw-text-lg tw-text-gray-600"
                                        variant="body1"
                                        component="p"
                                    >
                                        3+ years of experience
                                    </Typography>
                                </div>
                            }
                        ></Button>
                        <Button
                            color="outlined_button"
                            variant="jOutlinedBox"
                            children={
                                <div className="tw-flex tw-flex-col tw-gap-2 tw-items-start tw-w-full">
                                    <Typography
                                        className="tw-font-semibold"
                                        variant="h6"
                                        component="h6"
                                    >
                                        UX designer
                                    </Typography>
                                    <Typography
                                        className="tw-text-lg tw-text-gray-600"
                                        variant="body1"
                                        component="p"
                                    >
                                        3+ years of experience
                                    </Typography>
                                </div>
                            }
                        ></Button>
                        <Button
                            color="outlined_button"
                            variant="jOutlinedBox"
                            children={
                                <div className="tw-flex tw-flex-col tw-gap-2 tw-items-start tw-w-full">
                                    <Typography
                                        className="tw-font-semibold"
                                        variant="h6"
                                        component="h6"
                                    >
                                        UX designer
                                    </Typography>
                                    <Typography
                                        className="tw-text-lg tw-text-gray-600"
                                        variant="body1"
                                        component="p"
                                    >
                                        3+ years of experience
                                    </Typography>
                                </div>
                            }
                        ></Button>
                        <Button
                            color="outlined_button"
                            variant="jOutlinedBox"
                            children={
                                <div className="tw-flex tw-flex-col tw-gap-2 tw-items-start tw-w-full">
                                    <Typography
                                        className="tw-text-lg tw-text-gray-600"
                                        variant="body1"
                                        component="p"
                                    >
                                        +3 more roles
                                    </Typography>
                                </div>
                            }
                        ></Button>
                    </div>
                </div>
            </CardContent>
            <CardActions className="tw-flex tw-gap-2 tw-justify-start tw-px-4 tw-pb-4 tw-pt-0">
                <Button variant="jContained">Apply</Button>
                <Button color="outlined_button" variant="jOutlined">
                    See more
                </Button>
            </CardActions>
        </Card>
    )
}

export default TeamCard
