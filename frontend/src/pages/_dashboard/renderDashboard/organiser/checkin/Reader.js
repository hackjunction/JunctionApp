import React, { useRef, useCallback, useState } from 'react'
import { QrReader } from '@cmdnio/react-qr-reader'
import { useDispatch } from 'react-redux'

import { Box, Typography } from '@mui/material'
import Button from 'components/generic/Button'

import * as SnackbarActions from 'reducers/snackbar/actions'
export default ({ onResult }) => {
    // const reader = useRef(null)
    // const dispatch = useDispatch()
    // const [legacyMode, setLegacyMode] = useState(false)

    const handleScan = data => {
        // if (legacyMode && !data) {
        //     dispatch(SnackbarActions.error('QR code not found'))
        // }
        if (data) {
            onResult(data)
        }
    }

    // const handleError = useCallback(
    //     err => {
    //         onError()
    //     },
    //     [onError],
    // )

    return (
        <>
            <QrReader
                // ref={reader}
                scanDelay={500}
                // onError={handleError}
                onResult={handleScan}
                // style={{ width: '100%', maxWidth: 600 }}
                constraints={{ facingMode: 'environment' }}
                // legacyMode={legacyMode}
            />
            {/* {legacyMode ? (
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
            )} */}
        </>
    )
}
