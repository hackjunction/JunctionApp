import React, { PureComponent } from 'react';
import styles from './CenteredContainer.module.scss';
import classNames from 'classnames';

class CenteredContainer extends PureComponent {
    render() {
        return (
            <div
                className={classNames({
                    [styles.wrapper]: true,
                    [this.props.wrapperClass]: typeof this.props.wrapperClass !== 'undefined'
                })}
            >
                <div
                    className={classNames({
                        [styles.inner]: true,
                        [this.props.className]: typeof this.props.className !== 'undefined'
                    })}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default CenteredContainer;
