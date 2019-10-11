import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

import { Box, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';

import Modal from 'components/generic/Modal';
import * as OrganiserSelectors from 'redux/organiser/selectors';

const QRCodeReaderModal = ({ open, onClose, registrationsMap }) => {
    const [user, setUser] = useState();
    const handleError = () => {
        window.alert('ERROR!');
    };

    const handleScan = data => {
        if (registrationsMap.hasOwnProperty(data)) {
            const _user = registrationsMap[data];
            setUser(_user.answers.firstName + ' ' + _user.answers.lastName);
        }
    };

    if (!open) return null;

    console.log('USER', user);

    return (
        <Modal isOpen={true} handleClose={onClose} size="max">
            <Box p={5} display="flex" height="100%" flexDirection="column" alignItems="center" justifyContent="center">
                {user ? (
                    <Box>
                        <Typography>{user}</Typography>
                        <Button onClick={() => setUser(null)}>Scan again</Button>
                    </Box>
                ) : (
                    <QrReader
                        delay={500}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%', maxWidth: 600 }}
                        facingMode="environment"
                    />
                )}
            </Box>
        </Modal>
    );
};

const mapState = state => ({
    registrationsMap: OrganiserSelectors.registrationsMap(state)
});

export default connect(mapState)(QRCodeReaderModal);
