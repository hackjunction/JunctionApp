import React, { useMemo } from 'react'

import { RegistrationStatuses } from '@hackjunction/shared'
import { Box, Typography } from '@material-ui/core'
import { groupBy } from 'lodash-es'
import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Bar,
} from 'recharts'

const RegistrationsByStatus = ({ registrations }) => {
    const formattedData = useMemo(() => {
        const byStatus = groupBy(registrations, 'status')
        return Object.keys(byStatus).map(status => ({
            status: RegistrationStatuses.asObject[status].label,
            count: byStatus[status].length,
        }))
    }, [registrations])

    return (
        <Box p={2}>
            <Typography paragraph variant="h6" align="center">
                By status
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
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="orange" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default RegistrationsByStatus
