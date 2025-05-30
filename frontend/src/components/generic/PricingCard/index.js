import React from 'react'
import { Box, Typography, Grid2 as Grid } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'

const PricingItem = ({ topic, price }) => {
    //TODO add plain text to locale to enable translation
    const body = [
        'Event registration and organization through platform',
        'Tech Support during event',
        'Full Access to the Junction App',
        'Consulting from the Junction Team',
        'Statistics',
        'Price is negotiable',
    ]

    const renderText = arr => {
        return arr.map((text, index) => (
            <ListItem key={index}>
                <CheckIcon sx={{ mr: '0.5rem' }} />
                <Typography>{text}</Typography>
            </ListItem>
        ))
    }

    const CardWrapper = styled(Box)({
        background: '#fbfbfb',
        borderWidth: '2px',
        borderRadius: '16px',
        borderColor: '#232323',
        '&:hover': {
            borderColor: '#73F9EC',
        },
        padding: '1rem',
    })

    return (
        <Grid size={{ xs: 12, md: 4 }}>
            <CardWrapper>
                <Typography variant="h6">{topic}</Typography>
                <List>{renderText(body)}</List>
                <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>
                    {price}
                </Typography>
            </CardWrapper>
        </Grid>
    )
}

export default PricingItem
