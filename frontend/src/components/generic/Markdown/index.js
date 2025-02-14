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
        'tw-text-white': light,
        'tw-text-center': alignCenter,
        'tw-text-gray-900': !light,
        'tw-text-left': !alignCenter,
    })
}

//TODO add support for remark-gfm and rehype-raw+rehype-sanitize to support for Github markdown and raw html
//TODO remove custom styling and use theme instead
const Markdown = React.memo(
    ({ className, source, light = false, alignCenter, large = false }) => {
        const wrapperClasses = getWrapperClasses({ light, alignCenter })

        return (
            <ReactMarkdown
                remarkPlugins={[breaks]}
                className={`${className} ${wrapperClasses}`}
                components={{
                    h1: ({ children }) => (
                        <Typography
                            className="tw-font-sans tw-text-3xl tw-text-inherit tw-text-justify tw-mb-6"
                            variant="h1"
                        >
                            {children}
                        </Typography>
                    ),
                    h2: ({ children }) => (
                        <Typography
                            className="tw-font-sans tw-text-2xl tw-font-bold tw-text-inherit tw-mb-5"
                            variant="h2"
                        >
                            {children}
                        </Typography>
                    ),
                    h3: ({ children }) => (
                        <Typography
                            className="tw-font-sans tw-text-xl tw-font-semibold tw-text-inherit tw-mb-4"
                            variant="h3"
                        >
                            {children}
                        </Typography>
                    ),
                    h4: ({ children }) => (
                        <Typography
                            className="tw-font-sans tw-text-lg tw-font-medium tw-text-inherit tw-mb-3"
                            variant="h4"
                        >
                            {children}
                        </Typography>
                    ),
                    h5: ({ children }) => (
                        <Typography
                            className="tw-font-sans tw-text-base tw-font-medium tw-text-inherit tw-mb-2"
                            variant="h5"
                        >
                            {children}
                        </Typography>
                    ),
                    h6: ({ children }) => (
                        <Typography
                            className="tw-font-sans tw-text-sm tw-font-medium tw-text-inherit tw-mb-2"
                            variant="h6"
                        >
                            {children}
                        </Typography>
                    ),
                    p: ({ children }) => (
                        <Typography
                            variant="body1"
                            className="tw-mb-6 tw-text-inherit"
                        >
                            {children}
                        </Typography>
                    ),
                    em: ({ children }) => (
                        <Typography
                            variant="body1"
                            display="inline"
                            className="tw-italic tw-text-inherit"
                        >
                            {children}
                        </Typography>
                    ),
                    strong: ({ children }) => (
                        <Typography
                            variant="body1"
                            display="inline"
                            className="tw-font-bold tw-text-inherit"
                        >
                            {children}
                        </Typography>
                    ),
                    a: ({ href, children }) => {
                        if (href.indexOf('http') === -1) {
                            return (
                                <Link to={href}>
                                    <Typography
                                        className="tw-underline tw-text-primary"
                                        display="inline"
                                        variant="body1"
                                        color="primary"
                                    >
                                        {children}
                                    </Typography>
                                </Link>
                            )
                        } else {
                            return (
                                <ExternalLink href={href}>
                                    <Typography
                                        className="tw-underline tw-text-primary"
                                        display="inline"
                                        variant="body1"
                                        color="primary"
                                    >
                                        {children}
                                    </Typography>
                                </ExternalLink>
                            )
                        }
                    },
                    code: ({ children }) => (
                        <Typography
                            variant="body2"
                            component="code"
                            className="tw-font-mono tw-px-1 tw-py-0.5 tw-bg-gray-200 tw-rounded"
                        >
                            {children}
                        </Typography>
                    ),
                    pre: ({ children }) => (
                        <div className="tw-mb-6 tw-overflow-auto tw-bg-gray-100 tw-rounded tw-p-4">
                            <Typography
                                variant="body2"
                                component="pre"
                                className="tw-font-mono tw-whitespace-pre-wrap tw-text-sm tw-text-inherit"
                            >
                                {children}
                            </Typography>
                        </div>
                    ),
                    thematicBreak: () => (
                        <>
                            <Divider size={2} />
                            <LineDivider />
                            <Divider size={2} />
                        </>
                    ),
                }}
            >
                {source}
            </ReactMarkdown>
        )
    },
)

export default Markdown
