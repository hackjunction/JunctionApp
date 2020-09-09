/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withSnackbar } from 'notistack'
import { Button } from '@material-ui/core'
import { removeSnackbar } from 'redux/snackbar/actions'
import * as SnackbarSelectors from 'redux/snackbar/selectors'

class Notifier extends Component {
    displayed = []

    storeDisplayed = id => {
        this.displayed = [...this.displayed, id]
    }

    removeDisplayed = id => {
        this.displayed = this.displayed.filter(key => id !== key)
    }

    buildMessage = (message, options, key) => {
        if (options?.errorMessages?.length > 0) {
            return (
                <div>
                    <p>{message}</p>
                    <ul>
                        {options.errorMessages.map(message => {
                            return <li key={message}>{message}</li>
                        })}
                    </ul>
                    <Button
                        style={{ color: '#fff' }}
                        onClick={() => {
                            this.props.closeSnackbar(key)
                        }}
                    >
                        OK
                    </Button>
                </div>
            )
        } else {
            return message
        }
    }

    componentDidUpdate() {
        const { notifications = [] } = this.props

        notifications.forEach(
            ({ key, message, options = {}, dismissed = false }) => {
                if (dismissed) {
                    this.props.closeSnackbar(key)
                    return
                }
                // Do nothing if snackbar is already displayed
                if (this.displayed.includes(key)) return
                // Display snackbar using notistack

                const formattedMessage = this.buildMessage(
                    message,
                    options,
                    key
                )
                this.props.enqueueSnackbar(formattedMessage, {
                    key,
                    ...options,
                    persist:
                        options.persist ?? options?.errorMessages?.length > 0,
                    onClose: (event, reason, key) => {
                        if (options.onClose) {
                            options.onClose(event, reason, key)
                        }
                    },
                    onExited: (event, key) => {
                        this.props.removeSnackbar(key)
                        this.removeDisplayed(key)
                    },
                })
                // Keep track of snackbars that we've displayed
                this.storeDisplayed(key)
            }
        )
    }

    render() {
        return null
    }
}

const mapStateToProps = state => ({
    notifications: SnackbarSelectors.notifications(state),
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ removeSnackbar }, dispatch)

export default withSnackbar(
    connect(mapStateToProps, mapDispatchToProps)(Notifier)
)
