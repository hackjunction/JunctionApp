import React from 'react'
import ReactMarkdown from 'react-markdown'
import breaks from 'remark-breaks'
import { Link } from 'react-router-dom'
import LineDivider from 'components/generic/LineDivider'
import Divider from 'components/generic/Divider'
import ExternalLink from 'components/generic/ExternalLink'
import { Typography } from '@mui/material'
import clsx from 'clsx'

const getWrapperClasses = ({ light, alignCenter }) => {
    return clsx({
        'text-white': light,
        'text-gray-900': !light,
        'text-center': alignCenter,
        'text-left': !alignCenter,
    })
}

const Markdown = React.memo(
    ({ className, source, light = false, alignCenter, large = false }) => {
        const wrapperClasses = getWrapperClasses({ light, alignCenter })

        return (
            <ReactMarkdown
                source={source}
                plugins={[breaks]}
                className={wrapperClasses}
                renderers={{
                    heading: ({ level, children }) => {
                        switch (level) {
                            case 1:
                                return (
                                    <Typography
                                        className="font-sans text-xl text-inherit text-justify mb-6"
                                        variant="h1"
                                    >
                                        {children}
                                    </Typography>
                                )
                            case 2:
                                return (
                                    <Typography
                                        className="font-sans text-xl font-bold text-inherit mb-4"
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
                                        className="font-sans text-lg font-bold text-inherit mb-2"
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
                                className="mb-6 text-inherit"
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
                                className="font-bold text-inherit"
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
                                className="font-bold text-inherit"
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
                                        className="underline text-primary"
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
                                        className="underline text-primary"
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
                                        className="underline text-primary"
                                        display="inline"
                                        component="span"
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
                                        className="underline text-primary"
                                        display="inline"
                                        component="span"
                                        variant="body1"
                                        color="primary"
                                    >
                                        {props.children}
                                    </Typography>
                                </ExternalLink>
                            )
                        }
                    },
                    thematicBreak: () => {
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
