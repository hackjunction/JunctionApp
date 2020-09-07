import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    CircularProgress,
} from '@material-ui/core'
import Empty from 'components/generic/Empty'
import Button from 'components/generic/Button'
import { useTranslation } from 'react-i18next'
import * as RecruitmentActions from 'redux/recruitment/actions'
import * as RecruitmentSelectors from 'redux/recruitment/selectors'

export default ({ onRevoke }) => {
    const dispatch = useDispatch()
    const events = useSelector(RecruitmentSelectors.events)
    const recruiters = useSelector(RecruitmentSelectors.adminRecruiters)
    const loading = useSelector(RecruitmentSelectors.adminRecruitersLoading)
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(RecruitmentActions.updateAdminRecruiters())
    }, [dispatch])

    if (loading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center">
                <CircularProgress size={24} />
            </Box>
        )
    }

    if (recruiters.length === 0) {
        return <Empty isEmpty emptyText="No recruiters" hideIfNotEmpty />
    }

    return (
        <Box>
            <List style={{ backgroundColor: 'white' }}>
                {recruiters.map((user, index) => [
                    index !== 0 ? (
                        <Divider key={user.userId + 'divider'} />
                    ) : null,
                    <ListItem key={user.userId}>
                        <ListItemText
                            primary={`${user.firstName} ${user.lastName}, ${user.recruiterOrganisation}`}
                            secondary={
                                'Can access: ' +
                                events
                                    .filter(event => {
                                        return (
                                            user.recruiterEvents.indexOf(
                                                event.slug,
                                            ) !== -1
                                        )
                                    })
                                    .map(event => event.name)
                                    .join(', ')
                            }
                        />
                        <ListItemSecondaryAction>
                            <Button
                                color="secondary"
                                onClick={() => onRevoke(user.userId)}
                            >
                                {t('Revoke_access')}
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>,
                ])}
            </List>
        </Box>
    )
}
