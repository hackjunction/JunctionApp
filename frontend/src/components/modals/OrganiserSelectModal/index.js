import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Box, List, Button } from '@material-ui/core'

import Modal from 'components/generic/Modal'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import { useTranslation } from 'react-i18next'
import UserListItem from 'components/generic/UserListItem'

export default ({ open, onClose, onClear, onSelect }) => {
    const organisers = useSelector(OrganiserSelectors.organisers)
    const [selected, setSelected] = useState()
    const { t } = useTranslation()
    const handleClear = useCallback(() => {
        onClose()
        onClear()
    }, [onClose, onClear])
    const handleSubmit = useCallback(() => {
        onClose()
        onSelect(selected)
    }, [selected, onClose, onSelect])
    return (
        <Modal
            isOpen={open}
            handleClose={onClose}
            title="Select a user"
            footer={
                <Box
                    p={1}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Button fullWidth onClick={handleClear}>
                        {t('Clear_selection_')}
                    </Button>
                    <Box mt={1} />
                    <Button
                        onClick={handleSubmit}
                        disabled={!selected}
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        {selected
                            ? `${selected.firstName} ${selected.lastName}`
                            : 'Select a user'}
                    </Button>
                </Box>
            }
        >
            <List>
                {organisers.map(organiser => (
                    <UserListItem
                        selectable
                        onSelect={() => setSelected(organiser)}
                        selected={
                            selected && selected.userId === organiser.userId
                        }
                        key={organiser.userId}
                        user={organiser}
                    />
                ))}
            </List>
        </Modal>
    )
}
