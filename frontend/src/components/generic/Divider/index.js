import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class Divider extends PureComponent {
    static propTypes = {
        size: PropTypes.any
    };

    static defaultProps = {
        size: 1
    };

    render() {
        return <div className={`Divider Divider-${this.props.size}`} />;
    }
}

export default Divider;
