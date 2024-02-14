import React, { useRef, useCallback, useState } from 'react'
import QrReader from 'react-qr-reader'
import { useDispatch } from 'react-redux'

import { Box, Typography } from '@material-ui/core'
import Button from 'components/generic/Button'

import * as SnackbarActions from 'redux/snackbar/actions'
export default ({ onResult, onError }) => {
    const reader = useRef(null)
    const dispatch = useDispatch()
    const [legacyMode, setLegacyMode] = useState(false)

    const handleScan = useCallback(
        data => {
            if (legacyMode && !data) {
                dispatch(SnackbarActions.error('QR code not found'))
            }
            if (data) {
                onResult(data)
            }
        },
        [onResult, legacyMode, dispatch],
    )

    const handleError = useCallback(
        err => {
            onError()
        },
        [onError],
    )

    return (
        <>
            <QrReader
                ref={reader}
                delay={500}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%', maxWidth: 600 }}
                facingMode="environment"
                legacyMode={legacyMode}
            />
            {legacyMode ? (
                <Box p={2}>
                    <Typography variant="subtitle1">
                        Using legacy mode
                    </Typography>
                    <Typography variant="body2">
                        Take a picture of the QR code with your device camera
                        and upload it here
                    </Typography>
                    <Box mt={1} />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => reader.current.openImageDialog()}
                    >
                        Take/upload image
                    </Button>
                    <Box mt={1} />
                    <Button
                        color="theme_orange"
                        variant="contained"
                        onClick={() => setLegacyMode(false)}
                    >
                        Use scan mode
                    </Button>
                </Box>
            ) : (
                <Box p={2}>
                    <Typography variant="subtitle1">
                        Scanner not working?
                    </Typography>
                    <Box mt={1} />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => setLegacyMode(true)}
                    >
                        Use legacy mode (Take a picture)
                    </Button>
                </Box>
            )}
        </>
    )
}
