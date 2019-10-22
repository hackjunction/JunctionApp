import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import SVG from 'react-inlinesvg';

class GlitchLoader extends Component {
    static propTypes = {
        title: PropTypes.string,
        size: PropTypes.number
    };

    static defaultProps = {
        title: null,
        size: 100
    };

    render() {
        return (
            <div className="GlitchLoader">
                <div className="GlitchLoader_Logo" style={{ width: this.props.size, height: this.props.size }}>
                    <SVG src={require('assets/logos/emblem.svg')} className="LogoSvg LogoSvg1">
                        <img src={require('assets/logos/emblem_white.png')} alt="logo" />
                    </SVG>
                    <SVG src={require('assets/logos/emblem.svg')} className="LogoSvg LogoSvg2"></SVG>
                    <SVG src={require('assets/logos/emblem.svg')} className="LogoSvg LogoSvg3"></SVG>
                </div>
                {this.props.title ? (
                    <div className="GlitchLoader_Title">
                        <h3>{this.props.title}</h3>
                        <h3>{this.props.title}</h3>
                        <h3>{this.props.title}</h3>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default GlitchLoader;
