import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import Markdown from 'components/generic/Markdown'
import Button from 'components/generic/Button'
import defaultLogo from 'assets/logos/JunctionPlatform_Emblem_Black.svg'
import { OutboundLink } from 'react-ga'

const PartnerCard = ({
    name,
    logo,
    partner,
    description,
    link,
    redeemable,
}) => {
    return (
        <Box className="flex flex-col items-center md:flex-row md:items-start">
            <Grid container direction="row" spacing={3}>
                <Grid item xs={4}>
                    <Box p={3}>
                        {logo ? (
                            <img alt={logo} src={logo.url} className="w-52" />
                        ) : (
                            <img
                                alt="default logo"
                                src={defaultLogo}
                                className="w-52"
                            />
                        )}
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box p={3}>
                        <Typography variant="h5">
                            {name} by {partner}
                        </Typography>
                        <Typography>
                            <Markdown source={description} />
                        </Typography>
                        {redeemable ? (
                            <Box>
                                <OutboundLink
                                    eventLabel="myLabel"
                                    to={link}
                                    target="_blank"
                                    className="no-underline"
                                >
                                    <Button color="primary" variant="contained">
                                        Redeem
                                    </Button>
                                </OutboundLink>
                            </Box>
                        ) : null}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default PartnerCard
