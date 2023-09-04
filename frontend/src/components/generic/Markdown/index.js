import React from 'react'

import ReactMarkdown from 'react-markdown'
import breaks from 'remark-breaks'
import { Link } from 'react-router-dom'
import LineDivider from 'components/generic/LineDivider'
import Divider from 'components/generic/Divider'
import ExternalLink from 'components/generic/ExternalLink'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    wrapper: ({ light, alignCenter }) => ({
        color: light ? 'white' : theme.palette.text.primary,
        textAlign: alignCenter ? 'center' : 'left',
        '& img ': {
            width: '100%',
        },
    }),
    heading1: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: theme.typography.h5.fontSize,
        fontWeight: 'normal',
        color: 'inherit',
        textAlign: 'justify',
        marginBottom: theme.spacing(3),
    },
    heading2: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: theme.typography.h5.fontSize,
        fontWeight: 'bold',
        color: 'inherit',
        marginBottom: theme.spacing(2),
    },
    heading3: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: theme.typography.h6.fontSize,
        fontWeight: 'bold',
        color: 'inherit',
        marginBottom: theme.spacing(1),
    },
    paragraph: {
        marginBottom: theme.spacing(3),
        color: 'inherit',
    },
    bold: {
        fontWeight: 'bold',
        color: 'inherit',
    },
    hyperlink: {
        textDecoration: 'underline',
        color: theme.palette.primary.main,
    },
}))

const Markdown = React.memo(
    ({ className, source, light = false, alignCenter, large = false }) => {
        const classes = useStyles({ light, alignCenter })
        return (
            <ReactMarkdown
                source={source}
                plugins={[breaks]}
                className={classes.wrapper}
                renderers={{
                    heading: ({ level, children }) => {
                        switch (level) {
                            case 1:
                                return (
                                    <Typography
                                        className={classes.heading1}
                                        variant="h1"
                                    >
                                        {children}
                                    </Typography>
                                )
                            case 2:
                                return (
                                    <Typography
                                        className={classes.heading2}
                                        variant="h2"
                                    >
                                        {children}
                                    </Typography>
                                )
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                return (
                                    <Typography
                                        className={classes.heading3}
                                        variant="h3"
                                    >
                                        {children}
                                    </Typography>
                                )
                            default:
                                return null
                        }
                    },
                    paragraph: ({ children }) => {
                        return (
                            <Typography
                                variant="body1"
                                className={classes.paragraph}
                            >
                                {children}
                            </Typography>
                        )
                    },
                    emphasis: ({ children }) => {
                        return (
                            <Typography
                                variant="body1"
                                display="inline"
                                className={classes.bold}
                            >
                                {children}
                            </Typography>
                        )
                    },
                    strong: ({ children }) => {
                        return (
                            <Typography
                                variant="body1"
                                display="inline"
                                className={classes.bold}
                            >
                                {children}
                            </Typography>
                        )
                    },
                    link: props => {
                        if (props.href.indexOf('http') === -1) {
                            return (
                                <Link to={props.href}>
                                    <Typography
                                        className={classes.hyperlink}
                                        display="inline"
                                        variant="body1"
                                        color="primary"
                                    >
                                        {props.children}
                                    </Typography>
                                </Link>
                            )
                        } else {
                            return (
                                <ExternalLink href={props.href}>
                                    <Typography
                                        className={classes.hyperlink}
                                        display="inline"
                                        variant="body1"
                                        color="primary"
                                    >
                                        {props.children}
                                    </Typography>
                                </ExternalLink>
                            )
                        }
                    },
                    linkReference: props => {
                        if (props.href.indexOf('http') === -1) {
                            return (
                                <Link to={props.href}>
                                    <Typography
                                        className={classes.hyperlink}
                                        display="inline"
                                        component={'span'}
                                        variant="body1"
                                        color="primary"
                                    >
                                        {props.children}
                                    </Typography>
                                </Link>
                            )
                        } else {
                            return (
                                <ExternalLink href={props.href}>
                                    <Typography
                                        className={classes.hyperlink}
                                        display="inline"
                                        component={'span'}
                                        variant="body1"
                                        color="primary"
                                    >
                                        {props.children}
                                    </Typography>
                                </ExternalLink>
                            )
                        }
                    },
                    thematicBreak: props => {
                        return (
                            <>
                                <Divider size={2} />
                                <LineDivider />
                                <Divider size={2} />
                            </>
                        )
                    },
                }}
            />
        )
    },
)

export default Markdown
