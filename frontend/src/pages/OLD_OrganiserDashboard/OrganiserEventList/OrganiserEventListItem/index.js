import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Image, Transformation } from 'cloudinary-react'

import Button from 'components/generic/Button'

class OrganiserEventListItem extends PureComponent {
    static propTypes = {
        event: PropTypes.object,
    }

    render() {
        const { event, editEvent } = this.props
        return (
            <div className="OrganiserEventListItem">
                <Image
                    className="OrganiserEventListItem--image"
                    publicId={
                        event.coverImage ? event.coverImage.publicId : null
                    }
                >
                    <Transformation
                        width="400"
                        crop="fill"
                        format="auto"
                        quality="auto"
                    />
                </Image>
                <div className="OrganiserEventListItem--content">
                    <h3 className="OrganiserEventListItem--name">
                        {event.name}
                    </h3>
                    <span className="OrganiserEventListItem--dates">
                        {event.location}
                    </span>
                    <Button
                        color="theme_turquoise"
                        variant="contained"
                        onClick={() => editEvent(event)}
                    >
                        Manage event
                    </Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    editEvent: event => dispatch(push('/organise/' + event.slug)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganiserEventListItem)
