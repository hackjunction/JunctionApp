import { Dialog, Typography } from '@material-ui/core'
import Button from 'components/generic/Button'
import Container from 'components/generic/Container'
import PageWrapper from 'components/layouts/PageWrapper'
import React, { useEffect, useState } from 'react'
import Profile from 'components/Participant/Profile'
import { set } from 'react-ga'
import { useDispatch } from 'react-redux'
import * as DashboardActions from 'redux/dashboard/actions'
import { gradientRandomizer } from 'utils/stylingHelpers'

export default ({ viewMode = 'card', userData = {}, enabledView = false }) => {
    const [userProfile, setUserProfile] = useState(userData)
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        if (visible) {
            setLoading(true)
            dispatch(
                DashboardActions.getCandidateProfileById(
                    userData.profile.userId,
                ),
            )
                .then(data => {
                    setUserProfile(data)
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    console.log('Fetched at preview', userProfile)
                    setLoading(false)
                })
        }
    }, [userData, visible])

    const styling = {
        borderStyle: '',
        imageSize: '',
        alignment: 'tw-items-center',
        userProfile: {},
    }
    if (userProfile.profile.avatar) {
        styling.userProfile = {
            backgroundImage: `url(${userProfile.profile.avatar})`,
        }
    }

    // console.log('User data on participant preview', userData)

    switch (viewMode) {
        case 'list':
            styling.borderStyle =
                'tw-border tw-border-solid tw-border-gray-300 tw-p-4'
            styling.imageSize = 'tw-w-16 tw-h-16'
            break
        case 'profile':
            styling.borderStyle = ''
            styling.imageSize = 'tw-w-48 tw-h-48'
            styling.alignment = 'tw-items-start tw-flex-col tw--mt-24'
            break
        case 'card':
            styling.borderStyle = ''
            styling.imageSize = 'tw-w-24 tw-h-24'
            break
        default:
            break
    }

    return (
        <>
            <div
                className={`tw-flex tw-justify-between tw-rounded-lg ${styling.borderStyle} ${styling.alignment}`}
            >
                <div className="tw-flex tw-gap-4 tw-items-end">
                    <div
                        className={`tw-bg-gradient-to-r ${gradientRandomizer()} tw-rounded-full ${
                            styling.imageSize
                        } tw-bg-cover`}
                        style={styling?.userProfile}
                    ></div>
                    <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
                        <Typography
                            className="tw-tracking-tight tw-font-medium"
                            variant="h5"
                            component="h5"
                        >
                            {userProfile.profile.firstName}{' '}
                            {userProfile.profile.lastName}
                        </Typography>
                        <Typography
                            className="tw-tracking-tight tw-font-normal"
                            variant="h6"
                            component="h6"
                        >
                            {viewMode === 'card' &&
                            userProfile?.profile?.headline?.length > 20
                                ? `${userProfile.profile.headline.substr(
                                      0,
                                      20,
                                  )}...`
                                : userProfile?.profile?.headline}
                        </Typography>
                    </div>
                </div>
                {enabledView && !visible && viewMode === 'list' && (
                    <Button
                        color="outlined_button"
                        variant="jOutlined"
                        onClick={() => setVisible(true)}
                    >
                        See more
                    </Button>
                )}
            </div>
            <Dialog
                transitionDuration={0}
                fullScreen
                open={visible}
                onClose={() => setVisible(false)}
            >
                <PageWrapper loading={loading}>
                    <Container center>
                        <Button onClick={() => setVisible(false)}>Close</Button>
                        <Profile user={userProfile} />
                    </Container>
                </PageWrapper>
            </Dialog>
        </>
    )
}
