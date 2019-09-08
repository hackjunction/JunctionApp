import React from 'react';
import styles from './EventButtons.module.scss';

import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import moment from 'moment-timezone';

import { Events } from '@hackjunction/shared';

import Button from 'components/generic/Button';
import Divider from 'components/generic/Divider';

const { REGISTRATION_OPEN, REGISTRATION_CLOSED, REGISTRATION_UPCOMING } = Events.status;

const EventButtons = ({ event, eventStatus, user, registration, match, location, pushLogin }) => {
    function renderApplyButton() {
        switch (eventStatus) {
            case REGISTRATION_OPEN.id: {
                if (user) {
                    if (registration) {
                        return (
                            <React.Fragment>
                                <Button
                                    block
                                    link={{
                                        internal: `${match.url}/register`
                                    }}
                                    theme="accent"
                                    text="Edit your registration"
                                />
                                <Divider size={1} />
                                <Button
                                    block
                                    link={{
                                        internal: `/dashboard/${match.params.slug}`
                                    }}
                                    text="Event dashboard"
                                />
                            </React.Fragment>
                        );
                    } else {
                        return (
                            <Button
                                block
                                link={{
                                    internal: `${match.url}/register`
                                }}
                                theme="accent"
                                text="Register Now"
                            />
                        );
                    }
                } else {
                    return (
                        <Button
                            block
                            button={{
                                onClick: () => pushLogin(location.pathname)
                            }}
                            text="Log in to register"
                        />
                    );
                }
            }
            case REGISTRATION_UPCOMING.id: {
                return (
                    <p className={styles.statusText}>
                        The application period begins{' '}
                        {moment(event.registrationStartTime).format(`LLL [(${event.timezone})]`)}
                    </p>
                );
            }
            case REGISTRATION_CLOSED.id: {
                return <p className={styles.statusText}>Registration for this event has closed!</p>;
            }
            default:
                return null;
        }
    }

    return <div className={styles.wrapper}>{renderApplyButton()}</div>;
};

const mapDispatchToProps = dispatch => ({
    pushLogin: nextRoute => dispatch(push('/login', { nextRoute }))
});

export default connect(
    null,
    mapDispatchToProps
)(EventButtons);
