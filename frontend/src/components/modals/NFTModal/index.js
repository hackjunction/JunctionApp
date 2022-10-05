import React from 'react'
import { Box, Fade, Icon, Link, makeStyles, Modal } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const NFT = require('assets/junction-nft.mp4')

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 0,
        body: {
            overflow: 'hidden',
        },
    },
    content: {
        display: 'flex',
        backgroundColor: '#000',
        height: '100vh',
        width: '100%',
    },
    info: {
        position: 'absolute',
        bottom: '5%',
        left: '5%',
        color: '#fff',
    },
})

const NFTModal = ({ open, onClose, transactionId }) => {
    const classes = useStyles()

    return (
        <Modal
            open={open}
            onClose={onClose}
            onBackdropClick={onClose}
            className={classes.modal}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open} timeout={{ enter: 400, exit: 200 }}>
                <Box
                    className={classes.content}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Icon
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '5%',
                            right: '5%',
                            color: '#fff',
                            cursor: 'pointer',
                        }}
                    >
                        <CloseIcon />
                    </Icon>
                    <video
                        autoPlay
                        playsInline
                        muted
                        loop
                        id="video"
                        preload="auto"
                        style={{
                            position: 'relative',
                            height: '70%',
                        }}
                        src={NFT}
                    >
                        <source src={NFT} type="video/mp4"></source>
                    </video>
                    <Box className={classes.info}>
                        <Typography variant="h3">Junction 2022</Typography>
                        <Typography variant="h5" gutterBottom>
                            Referral Trophy
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            JUNCTION - NOV 4-6
                        </Typography>

                        <span>
                            <Link
                                href={`https://flowscan.org/transaction/${transactionId}`}
                                target="_blank"
                            >
                                Transaction
                            </Link>
                            {' | '}
                            <Link
                                href="https://ipfs.io/ipfs/bafybeiadm74htav4vygndvws5bgusb4x4bygwu4jacdryq4ggxvexxjpmy"
                                target="_blank"
                            >
                                IPFS
                            </Link>
                        </span>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default NFTModal
