import React, { useEffect } from 'react';
import styles from './AttendeesOverview.module.scss';

import { Row, Col, Card, Statistic, Icon } from 'antd';
import RegistrationsService from 'services/registrations';

const STATS = [
    {
        label: 'Applications',
        getValue: () => 272
    },
    {
        label: 'Amount rated',
        getValue: () => 16,
        suffix: '%'
    }
];

const AttendeesOverview = () => {
    const renderStatCards = () => {
        return STATS.map(stat => {
            return (
                <Col xs={24} md={12} lg={8}>
                    <Card>
                        <Statistic title={stat.label} value={stat.getValue()} suffix={stat.suffix} />
                    </Card>
                </Col>
            );
        });
    };

    return <Row gutter={16}>{renderStatCards()}</Row>;
};

export default AttendeesOverview;
