import React, { useMemo } from 'react';
import { sortBy } from 'lodash-es';

import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar } from 'recharts';

const ApplicationsOverTime = ({ data }) => {
    const formattedData = useMemo(() => {
        const result = [];

        Object.keys(data).forEach(date => {
            result.push({
                date: date,
                applications: data[date]
            });
        });

        return sortBy(result, 'date');
    }, [data]);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={formattedData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ApplicationsOverTime;
