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

const RegistrationsByNationality = ({ registrations }) => {
    const formattedData = useMemo(() => {
        const byNationality = groupBy(registrations, 'answers.nationality')
        const mapped = Object.keys(byNationality).map(nationality => ({
            nationality,
            count: byNationality[nationality].length,
        }))

        return sortBy(mapped, item => -1 * item.count)
    }, [registrations])

    return (
        <Box p={2}>
            <Typography variant="h6" align="center">
                By nationality
            </Typography>
            <Typography variant="overline" align="center" paragraph>
                {formattedData.length} nationalities
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
                    <XAxis dataKey="nationality" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="orange" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default RegistrationsByNationality
