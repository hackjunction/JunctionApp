import React from 'react'
import clsx from 'clsx'

const getLinkClasses = theme => {
    switch (theme) {
        case 'dark':
            return 'tw-text-black hover:tw-text-black tw-underline'
        case 'footer':
            return 'tw-underline'
        default:
            return 'tw-text-primary hover:tw-text-primary-dark tw-underline'
    }
}

const ExternalLink = ({ href, children, theme = 'default' }) => {
    const linkClasses = getLinkClasses(theme)

    return (
        <a
            className={clsx(linkClasses, 'tw-cursor-pointer')}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    )
}

export default ExternalLink
