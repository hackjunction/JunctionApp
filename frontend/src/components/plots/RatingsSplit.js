import React, { useMemo } from 'react'
import { sortBy } from 'lodash-es'
import { useSelector } from 'react-redux'

import * as OrganiserSelectors from 'redux/organiser/selectors'

import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Bar,
} from 'recharts'

export default () => {
    const data = useSelector(OrganiserSelectors.registrationsByRating)
    const formattedData = useMemo(() => {
        const result = []

        Object.keys(data).forEach(rating => {
            result.push({
                rating: rating,
                applications: data[rating],
            })
        })

        return sortBy(result, 'rating')
    }, [data])

    return (
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
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="orange" />
            </BarChart>
        </ResponsiveContainer>
    )
}
