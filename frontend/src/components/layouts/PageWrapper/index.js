import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Box, Typography, CircularProgress } from '@material-ui/core'

const PageWrapper = ({
    loading = false,
    loadingText = 'Loading',
    error = false,
    errorText = 'Oops, something went wrong...',
    errorDesc = 'Please reload the page to try again',
    wrapContent = true,
    wrapperProps = {},
    showErrorMessage = false,
    render = null,
    footer,
    header,
    children = null,
}) => {
    const [errorMessage] = useState(null)

    const renderContent = () => {
        if (loading) {
            return (
                <Box
                    p={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <CircularProgress size={24} />
                </Box>
            )
        }
        if (error || errorMessage) {
            // TODO Oops something went wrong happens here. Make it better :D
            return (
                <Box
                    p={2}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box maxWidth="600px">
                        <Box p={1} />
                        <Typography variant="h6">{errorText}</Typography>
                        <Typography variant="body1">
                            {showErrorMessage
                                ? errorMessage || errorDesc
                                : errorDesc}
                        </Typography>
                    </Box>
                </Box>
            )
        }

        return typeof render === 'function' ? render() : children
    }
    return (
        <>
            {header && header()}
            {wrapContent ? (
                <div style={{ flex: 1 }} {...wrapperProps}>
                    {renderContent()}
                </div>
            ) : (
                renderContent()
            )}
            {footer && footer()}
        </>
    )
}

PageWrapper.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    errorText: PropTypes.string,
    render: PropTypes.func,
    header: PropTypes.func,
    footer: PropTypes.func,
    wrapContent: PropTypes.bool,
    wrapperProps: PropTypes.object,
    showErrorMessage: PropTypes.bool,
}

export default PageWrapper
