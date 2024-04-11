import React, { useState, useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import Button from 'components/generic/Button'

import * as AuthSelectors from 'redux/auth/selectors'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'

import ProjectsService from 'services/projects'

export default ({ track }) => {
    const dispatch = useDispatch()
    const event = useSelector(OrganiserSelectors.event)
    const idToken = useSelector(AuthSelectors.getIdToken)
    const [link, setLink] = useState()
    const [linkLoading, setLinkLoading] = useState(false)
    const handleGenerateLink = useCallback(async () => {
        setLinkLoading(true)
        try {
            const link = await ProjectsService.generateTrackLink(
                idToken,
                event.slug,
                track,
            )
            console.log('link :>> ', link)
            setLink(link)
        } catch (err) {
            dispatch(SnackbarActions.error('Oops, something went wrong...'))
        }
        setLinkLoading(false)
    }, [idToken, event, track, dispatch])

    if (link && link.link) {
        return (
            <a href={link.link} target="_blank" rel="noopener noreferrer">
                {link.link}
            </a>
        )
    }
    return (
        <Button
            onClick={handleGenerateLink}
            loading={linkLoading}
            color="primary"
            variant="contained"
        >
            Generate partner link
        </Button>
    )
}
