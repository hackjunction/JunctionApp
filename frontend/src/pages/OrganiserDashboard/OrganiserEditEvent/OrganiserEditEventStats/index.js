import React, { useEffect } from 'react';
import styles from './OrganiserEditEventStats.module.scss';

import { connect } from 'react-redux';
import { PageHeader, Row, Col, Card } from 'antd';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

import Divider from 'components/generic/Divider';
import PageWrapper from 'components/PageWrapper';
import ApplicationsOverTime from 'components/plots/ApplicationsOverTime';
import RatingsSplit from 'components/plots/RatingsSplit';
import ReviewersList from 'components/plots/ReviewersList';

import ApplicationsCount from 'components/plots/ApplicationsCount';
import TeamsCount from 'components/plots/TeamsCount';
import ReviewedPercent from 'components/plots/ReviewedPercent';
import ReviewedAverage from 'components/plots/ReviewedAverage';
import ApplicationsLast24h from 'components/plots/ApplicationsLast24h';

const OrganiserEditEventStats = ({ slug, loading }) => {
    const renderContent = () => {
        return (
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Divider size={1} />
                    <Card>
                        <ApplicationsCount />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Divider size={1} />
                    <Card>
                        <TeamsCount />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Divider size={1} />
                    <Card>
                        <ReviewedPercent />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Divider size={1} />
                    <Card>
                        <ReviewedAverage />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Divider size={1} />
                    <Card>
                        <ApplicationsLast24h />
                    </Card>
                </Col>
                <Col xs={24}>
                    <Divider size={1} />
                    <Card title="Applications over time">
                        <ApplicationsOverTime />
                    </Card>
                </Col>
                <Col xs={24}>
                    <Divider size={1} />
                    <Card title="Ratings split">
                        <RatingsSplit />
                    </Card>
                </Col>
                <Col xs={24}>
                    <Divider size={1} />
                    <Card title="Top reviewers">
                        <ReviewersList />
                    </Card>
                </Col>
            </Row>
        );
    };

    return (
        <PageWrapper loading={loading}>
            <PageHeader title="Stats" children={<p>Key stats for the event</p>} footer={renderContent()} />
        </PageWrapper>
    );
};

const mapState = state => ({
    loading:
        OrganiserSelectors.registrationsLoading(state) ||
        OrganiserSelectors.teamsLoading(state) ||
        OrganiserSelectors.organisersLoading(state)
});

export default connect(mapState)(OrganiserEditEventStats);
