import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import { Icon } from 'antd';

class PageWrapper extends PureComponent {
    static propTypes = {
        loading: PropTypes.bool,
        error: PropTypes.bool,
        errorText: PropTypes.string,
        render: PropTypes.func,
        header: PropTypes.func,
        footer: PropTypes.func,
        wrapContent: PropTypes.bool,
        wrapperProps: PropTypes.object
    };

    static defaultProps = {
        loading: false,
        loadingText: 'Loading',
        error: false,
        errorText: 'Oops, something went wrong...',
        errorDesc: 'Please reload the page to try again',
        wrapContent: true,
        wrapperProps: {}
    };

    renderContent() {
        if (this.props.loading) {
            return (
                <div className="PageWrapper--loading">
                    <Icon type="loading" size="large" style={{ fontSize: '30px' }} />
                </div>
            );
        }

        if (this.props.error) {
            return (
                <div className="PageWrapper--error">
                    <Icon type="warning" size="large" style={{ fontSize: '30px' }} />
                    <div style={{ height: '20px' }} />
                    <h3 className="PageWrapper--error__title">{this.props.errorText}</h3>
                    <p className="PageWrapper--error__desc">{this.props.errorDesc}</p>
                </div>
            );
        }

        return typeof this.props.render === 'function' ? this.props.render() : this.props.children;
    }

    render() {
        return (
            <React.Fragment>
                {this.props.header && this.props.header()}
                {this.props.wrapContent ? (
                    <div style={{ flex: 1 }} {...this.props.wrapperProps}>
                        {this.renderContent()}
                    </div>
                ) : (
                    this.renderContent()
                )}
                {this.props.footer && this.props.footer()}
            </React.Fragment>
        );
    }
}

export default PageWrapper;
