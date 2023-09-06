import Container from 'components/generic/Container'
import React from 'react'
import ProfileTop from '../ProfileTop'
import ProfileInfo from '../ProfileInfo'
import ProfileSide from '../ProfileSide'

export default ({ user = {}, children = null }) => {
    const styling = {
        columnStyle: 'lg:tw-col-span-6',
        renderSide: false,
    }

    if (
        user.industriesOfInterest.length > 0 ||
        user.themesOfInterest.length > 0
    ) {
        styling.columnStyle = 'lg:tw-col-span-4'
        styling.renderSide = true
    }

    return (
        <Container
            className="tw-text-left tw-flex tw-flex-col tw-gap-8 tw-mb-16"
            center
        >
            <ProfileTop user={user} />
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-6 tw-gap-4">
                <div
                    className={`tw-flex tw-flex-col ${styling.columnStyle} tw-gap-4`}
                >
                    {children}
                    <ProfileInfo user={user} />
                </div>
                {styling.renderSide && (
                    <div className="tw-flex tw-flex-col lg:tw-col-span-2 tw-gap-4">
                        <ProfileSide user={user} />
                    </div>
                )}
            </div>
        </Container>
    )
}
