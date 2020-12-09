import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Box, Typography, CircularProgress } from '@material-ui/core'

class PageWrapper extends PureComponent {
    static propTypes = {
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

    static defaultProps = {
        loading: false,
        loadingText: 'Loading',
        error: false,
        errorText: 'Oops, something went wrong...',
        errorDesc: 'Please reload the page to try again',
        wrapContent: true,
        wrapperProps: {},
        showErrorMessage: false,
    }

    constructor(props) {
        super(props)

        this.state = {
            error: false,
            errorMessage: null,
        }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { error: true, errorMessage: error.message }
    }

    componentDidCatch(error, errorInfo) {
        console.error('PageWrapper error', error)
        console.error(errorInfo)
    }

    renderContent() {
        if (this.props.loading) {
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

        if (this.props.error || this.state.error) {
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
                        <Typography variant="h6">
                            {this.props.errorText}
                        </Typography>
                        <Typography variant="body1">
                            {this.props.showErrorMessage
                                ? this.state.errorMessage ||
                                  this.props.errorDesc
                                : this.props.errorDesc}
                        </Typography>
                    </Box>
                </Box>
            )
        }

        return typeof this.props.render === 'function'
            ? this.props.render()
            : this.props.children
    }

    render() {
        return (
            <>
                {this.props.header && this.props.header()}
                {this.props.wrapContent ? (
                    <div style={{ flex: 1 }} {...this.props.wrapperProps}>
                        {this.renderContent()}
                    </div>
                ) : (
                    this.renderContent()
                )}
                {this.props.footer && this.props.footer()}
            </>
        )
    }
}

export default PageWrapper
