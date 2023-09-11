import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Dialog, Box, Chip } from '@material-ui/core'
import { Roles, Misc } from '@hackjunction/shared'
import CheckIcon from '@material-ui/icons/Check'

import PageWrapper from 'components/layouts/PageWrapper'

import Container from 'components/generic/Container'

import UserProfilesService from 'services/userProfiles'
import * as RecruitmentActions from 'redux/recruitment/actions'

import * as AuthSelectors from 'redux/auth/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'

import { useFormField } from 'hooks/formHooks'

import ProfileTop from 'components/Participant/ProfileTop'
import Profile from 'components/Participant/Profile'
import ProfileInfo from 'components/Participant/ProfileInfo'
import ProfileSide from 'components/Participant/ProfileSide'
import DetailSection from './DetailSection'
import MessageHistory from './MessageHistory'
import SkillRating from '../default/SearchResults/SkillRating'
import TextAreaInput from 'components/inputs/TextAreaInput'
import FormControl from 'components/inputs/FormControl'
import Button from 'components/generic/Button'
import { useTranslation } from 'react-i18next'
// import ProfileViewActions from 'components/Recruitment/ProfileViewActions'
import RecruitmentFavorites from 'components/Participant/RecruitmentFavorites'

const useStyles = makeStyles(theme => ({
    iconBlue: {
        backgroundColor: theme.palette.theme_turquoise.main,
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        marginRight: '8px',
    },
    iconPurple: {
        backgroundColor: theme.palette.theme_purple.main,
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        marginRight: '8px',
    },
    bold: {
        fontWeight: 'bold',
    },
}))

export default () => {
    // const classes = useStyles()
    const idToken = useSelector(AuthSelectors.getIdToken)
    // const dispatch = useDispatch()
    const match = useRouteMatch()
    // const { t } = useTranslation()

    // const sendMessage = useCallback(
    //     (message, userId) => {
    //         dispatch(RecruitmentActions.sendMessage(message, userId))
    //     },
    //     [dispatch],
    // )

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [user, setUser] = useState(null)
    // const message = useFormField(
    //     '',
    //     value => {
    //         if (value.length < 50) {
    //             return t('Your_message_length_')
    //         }
    //         if (value.length > 1000) {
    //             return t('Your_message_long_')
    //         }

    //         return
    //     },
    //     false,
    //     false,
    // )

    const { id } = match.params

    useEffect(() => {
        if (id) {
            setLoading(true)

            UserProfilesService.getUserProfileRecruitment(id, idToken)
                .then(data => {
                    setUser(data)
                })
                .catch(err => {
                    setError(true)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [idToken, id])

    // const handleSendMessage = useCallback(async () => {
    //     const err = message.validate()
    //     console.log('user is', user)
    //     if (!err && user !== null) {
    //         setLoading(true)
    //         const formatted = message.value.replace(/(?:\r\n|\r|\n)/g, '<br>')
    //         const res = await sendMessage(formatted, user.userId)

    //         // TODO fix snackbar here
    //         /*if (res?.error) {
    //             dispatch(SnackbarActions.error(t('Something_went_wrong_')))
    //         } else {*/
    //         message.reset()
    //         dispatch(SnackbarActions.success(t('Message_sent_')))
    //         //}
    //         setLoading(false)
    //     }
    // }, [message, user, sendMessage, dispatch, t])

    // TODO A little bit hard to define for translating
    // const renderRecruitmentStatus = () => {
    //     switch (user.recruitmentOptions.status) {
    //         case Misc.recruitmentStatuses.items['actively-looking'].id:
    //             return (
    //                 <Chip
    //                     label={
    //                         'Recruitment: ' +
    //                         Misc.recruitmentStatuses.items['actively-looking']
    //                             .label
    //                     }
    //                     color="primary"
    //                     variant="outlined"
    //                 />
    //             )
    //         case Misc.recruitmentStatuses.items['up-for-discussions'].id:
    //             return (
    //                 <Chip
    //                     label={
    //                         'Recruitment: ' +
    //                         Misc.recruitmentStatuses.items['up-for-discussions']
    //                             .label
    //                     }
    //                     color="secondary"
    //                     variant="outlined"
    //                 />
    //             )
    //         default:
    //             return null
    //     }
    // }

    // const renderRelocationStatus = () => {
    //     switch (user.recruitmentOptions.relocation) {
    //         case Misc.relocationOptions.items['looking-for-change'].id:
    //             return (
    //                 <Chip
    //                     label={
    //                         'Relocation: ' +
    //                         Misc.relocationOptions.items['looking-for-change']
    //                             .label
    //                     }
    //                     color="primary"
    //                     variant="outlined"
    //                 />
    //             )
    //         case Misc.relocationOptions.items['willing-to-relocate'].id:
    //             return (
    //                 <Chip
    //                     label={
    //                         'Relocation: ' +
    //                         Misc.relocationOptions.items['willing-to-relocate']
    //                             .label
    //                     }
    //                     color="primary"
    //                     variant="outlined"
    //                 />
    //             )
    //         case Misc.relocationOptions.items['not-currently'].id:
    //             return (
    //                 <Chip
    //                     label={
    //                         'Relocation: ' +
    //                         Misc.relocationOptions.items['not-currently'].label
    //                     }
    //                     color="secondary"
    //                     variant="outlined"
    //                 />
    //             )
    //         default:
    //             return null
    //     }
    // }

    const userLinks = [
        { label: 'Portfolio', link: 'https://www.google.com' },
        { label: 'LinkedIn', link: 'https://www.google.com' },
        { label: 'Dribbble', link: 'https://www.google.com' },
    ]

    return (
        <Dialog fullScreen open={true} transitionDuration={0}>
            <PageWrapper
                error={error}
                wrapContent={false}
                loading={loading}
                render={() => (
                    <>
                        <RecruitmentFavorites user={user} />
                        <Profile user={user} />
                    </>
                )}
            />
        </Dialog>
    )
}
