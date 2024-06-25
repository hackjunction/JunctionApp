import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

const PricingItem = ({ topic, body, price }) => {
    const renderText = arr => {
        return arr.map((text, index) => (
            <ListItem key={index} className="flex items-center">
                <CheckIcon className="mr-2" />
                <Typography>{text}</Typography>
            </ListItem>
        ))
    }

    return (
        <Grid item xs={12} md={4} lg={4}>
            <Box
                border={2}
                className="bg-gray-50 rounded-lg border-gray-900 hover:border-teal-400"
            >
                <Box className="relative p-4 h-88">
                    <Typography variant="h6" className="text-pink-500">
                        {topic}
                    </Typography>
                    <List>{renderText(body)}</List>
                    <Box mt={1} />
                </Box>
                <Box className="p-4">
                    <Box className="flex flex-row flex-wrap">
                        <Typography variant="h6" className="font-bold">
                            {price}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}

export default PricingItem
