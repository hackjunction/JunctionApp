import React from 'react'
import clsx from 'clsx'

const getLinkClasses = theme => {
    switch (theme) {
        case 'dark':
            return 'text-black hover:text-black underline'
        case 'footer':
            return 'text-white hover:text-white no-underline'
        default:
            return 'text-primary hover:text-primary-dark underline'
    }
}

const ExternalLink = ({ href, children, theme = 'default' }) => {
    const linkClasses = getLinkClasses(theme)

    return (
        <a
            className={clsx(linkClasses, 'cursor-pointer')}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    )
}

export default ExternalLink
