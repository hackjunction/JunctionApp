import React, { useState } from 'react'

import { Auth } from '@hackjunction/shared'
import { Typography, Dialog } from '@material-ui/core'
import RequiresPermission from 'hocs/RequiresPermission'

import Container from 'components/generic/Container'
import PageHeader from 'components/generic/PageHeader'

import SearchBox from './SearchBox'
import RecruitersList from './RecruitersList'
import RevokeAccessDialog from './RevokeAccessDialog'
import GrantAccessDialog from './GrantAccessDialog'
import { useTranslation } from 'react-i18next'

export default RequiresPermission(() => {
    const [grantingUser, setGrantingUser] = useState()
    const [revokingUser, setRevokingUser] = useState()
    const { t } = useTranslation()
    return (
        <Dialog fullScreen open={true} transitionDuration={0}>
            <Container center>
                <PageHeader
                    heading="Recruitment admin"
                    subheading="Manage access to recruitment dashboard"
                />
                <Typography variant="h6">{t('Add_recruiters_')}</Typography>
                <SearchBox
                    onGrant={setGrantingUser}
                    onRevoke={setRevokingUser}
                />
                <Typography variant="h6">{t('Manage_recruiters_')}</Typography>
                <RecruitersList onRevoke={setRevokingUser} />
                <GrantAccessDialog
                    userId={grantingUser}
                    onClose={() => setGrantingUser()}
                />
                <RevokeAccessDialog
                    userId={revokingUser}
                    onClose={() => setRevokingUser()}
                />
            </Container>
        </Dialog>
    )
}, [Auth.Permissions.MANAGE_RECRUITMENT])
