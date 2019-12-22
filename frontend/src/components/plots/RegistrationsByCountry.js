import React, { useMemo } from 'react'

import { Box, Typography } from '@material-ui/core'
import { groupBy, sortBy } from 'lodash-es'
import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Bar,
} from 'recharts'

const RegistrationsByCountry = ({ registrations }) => {
    const formattedData = useMemo(() => {
        const byCountry = groupBy(registrations, 'answers.countryOfTravel')
        const mapped = Object.keys(byCountry).map(country => ({
            country,
            count: byCountry[country].length,
        }))

        return sortBy(mapped, item => -1 * item.count)
    }, [registrations])

    return (
        <Box p={2}>
            <Typography variant="h6" align="center">
                By country of travel
            </Typography>
            <Typography variant="overline" align="center" paragraph>
                {formattedData.length} countries
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={formattedData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="orange" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default RegistrationsByCountry
