import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Button } from 'antd';
import { Image, Transformation } from 'cloudinary-react';

class OrganiserEventListItem extends PureComponent {
    static propTypes = {
        event: PropTypes.object
    };

    render() {
        const { event, editEvent } = this.props;
        return (
            <div className="OrganiserEventListItem">
                <Image
                    className="OrganiserEventListItem--image"
                    publicId={event.coverImage ? event.coverImage.publicId : null}
                >
                    <Transformation width="400" crop="fill" format="auto" quality="auto" />
                </Image>
                <div className="OrganiserEventListItem--content">
                    <h3 className="OrganiserEventListItem--name">{event.name}</h3>
                    <span className="OrganiserEventListItem--dates">{event.location}</span>
                    <Button type="primary" onClick={() => editEvent(event)}>
                        Manage
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    editEvent: event => dispatch(push('/organise/edit/' + event.slug))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganiserEventListItem);
