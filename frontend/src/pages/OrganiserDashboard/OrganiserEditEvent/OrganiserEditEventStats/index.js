import React, { useEffect, useCallback } from 'react';
import styles from './OrganiserEditEventStats.module.scss';

import { isEmpty } from 'lodash-es';
import { connect } from 'react-redux';
import moment from 'moment';
import { PageHeader, Row, Col, Statistic, Card, List, Empty, Icon, Rate } from 'antd';

import Divider from 'components/generic/Divider';
import Button from 'components/generic/Button';
import PageWrapper from 'components/PageWrapper';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';
import ApplicationsOverTime from 'components/plots/ApplicationsOverTime';
import RatingsSplit from 'components/plots/RatingsSplit';
import ReviewersList from 'components/plots/ReviewersList';

const OrganiserEditEventStats = ({ stats, statsLoading, slug, updateEventStats, organisersMap }) => {
    const updateStats = useCallback(() => {
        updateEventStats(slug);
    }, [slug, updateEventStats]);

    console.log(stats);

    const renderContent = () => {
        if (isEmpty(stats)) {
            return (
                <Empty
                    description={
                        <React.Fragment>
                            <div className={styles.emptyWrapper}>
                                <p>No data</p>
                                <Button
                                    text="Run report"
                                    button={{
                                        onClick: updateStats,
                                        loading: statsLoading
                                    }}
                                />
                            </div>
                        </React.Fragment>
                    }
                />
            );
        }

        return (
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Divider size={1} />
                    <Card>
                        <Statistic title="Applications" value={stats.numRegistrations} />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Divider size={1} />
                    <Card>
                        <Statistic title="Teams" value={stats.numTeams} />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Divider size={1} />
                    <Card>
                        <Statistic
                            title="Reviewed"
                            value={(stats.numRegistrationsReviewed * 100) / stats.numRegistrations}
                            precision={2}
                            suffix={'%'}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Divider size={1} />
                    <Card>
                        <Statistic
                            title="Avg. Rating"
                            value={stats.registrationsAvgRating}
                            precision={2}
                            suffix={<Icon type="star" />}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Divider size={1} />
                    <Card>
                        <Statistic title="Applications in the last 24h" value={stats.numRegistrationsLastDay} />
                    </Card>
                </Col>
                <Col xs={24}>
                    <Divider size={1} />
                    <Card title="Applications over time">
                        <ApplicationsOverTime data={stats.registrationsByDay} />
                    </Card>
                </Col>
                <Col xs={24}>
                    <Divider size={1} />
                    <Card title="Ratings split">
                        <RatingsSplit data={stats.registrationsSplit} />
                    </Card>
                </Col>
                <Col xs={24}>
                    <Divider size={1} />
                    <Card title="Top reviewers">
                        <ReviewersList data={stats.registrationsByReviewer} userProfilesMap={organisersMap} />
                    </Card>
                </Col>
                <Col xs={24}>
                    <Divider size={1} />
                    <Card title="Last 5 applications">
                        <List
                            itemLayout="horizontal"
                            dataSource={stats.registrationsLastFive}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.answers.firstName + ' ' + item.answers.lastName}
                                        description={moment(item.createdAt).fromNow()}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col xs={24}>
                    <Divider size={1} />
                    <Card title="Most used secret codes">
                        <List
                            itemLayout="horizontal"
                            dataSource={stats.registrationsTopSecretCodes}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta title={item.code} description={'Used ' + item.count + ' times'} />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        );
    };

    return (
        <PageWrapper loading={statsLoading}>
            <PageHeader title="Stats" children={<p>Key stats for the event</p>} footer={renderContent()} />
        </PageWrapper>
    );
};

const mapStateToProps = state => ({
    stats: OrganiserSelectors.stats(state),
    statsLoading: OrganiserSelectors.statsLoading(state),
    organisersMap: OrganiserSelectors.organisersMap(state)
});

const mapDispatchToProps = dispatch => ({
    updateEventStats: slug => dispatch(OrganiserActions.updateEventStats(slug))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganiserEditEventStats);
