import React, { useEffect, useState, useCallback } from 'react';

import { PageHeader, Table, Dropdown, Menu, Icon, Tag, Button, Menu } from 'antd';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash-es';
import { RegistrationStatuses } from '@hackjunction/shared';

import MiscUtils from 'utils/misc';
import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';
import Divider from 'components/generic/Divider';
import AttendeeDrawer from './AttendeeDrawer';
import FiltersDrawer from 'pages/OrganiserDashboard/OrganiserEditEvent/OrganiserEditEventAttendees/FiltersDrawer';

const OrganiserEditEventAttendees = ({
    slug,
    idToken,
    getEventBySlug,
    updateAttendees,
    getAttendeeByEvent,
    getAttendeeIds,
    getAttendeeFilters
}) => {
    const [activeItem, setActiveItem] = useState();
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const event = getEventBySlug(slug);
    const attendeeIds = getAttendeeIds(slug);
    const filters = getAttendeeFilters(slug);
    const hasFilters = !isEmpty(filters);

    const updateAttendeesCallback = useCallback(() => {
        updateAttendees(slug)
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [slug, updateAttendees]);

    useEffect(() => {
        setLoading(true);
        updateAttendeesCallback();
    }, [updateAttendeesCallback]);

    async function handleFiltersClosed() {
        setFiltersOpen(false);
        setLoading(true);
        await MiscUtils.sleep(1000);
        updateAttendees(slug)
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function renderTop() {
        return <p>View who has registered to your event</p>;
    }

    function renderContent() {
        return (
            <div style={{ width: '100%', overflowX: 'scroll' }}>
                <Table
                    rowKey={'user'}
                    bordered={true}
                    style={{ background: 'white' }}
                    loading={loading}
                    rowSelection={{
                        selectedRowKeys,
                        onChange: setSelectedRowKeys
                    }}
                    columns={[
                        {
                            title: 'First Name',
                            dataIndex: 'answers.firstName'
                        },
                        {
                            title: 'Last Name',
                            dataIndex: 'answers.lastName'
                        },
                        {
                            title: 'Email',
                            dataIndex: 'answers.email'
                        },
                        {
                            title: 'Status',
                            dataIndex: 'status',
                            render: (status, record) => {
                                const { color, label } = RegistrationStatuses.asObject[status];
                                return <Tag color={color}>{label}</Tag>;
                            }
                        },
                        {
                            title: 'Actions',
                            dataIndex: 'email',
                            render: (email, record) => {
                                return (
                                    <Dropdown
                                        overlay={() => (
                                            <Menu>
                                                <Menu.Item onClick={() => setActiveItem(record._id)}>Show</Menu.Item>
                                                <Menu.Item>Full Details</Menu.Item>
                                                <Menu.Item>Show Profile</Menu.Item>
                                                <Menu.Item>Delete</Menu.Item>
                                            </Menu>
                                        )}
                                    >
                                        <div>
                                            Actions <Icon type="down" />
                                        </div>
                                    </Dropdown>
                                );
                            }
                        }
                    ]}
                    dataSource={attendeeIds.map(id => getAttendeeByEvent(slug, id))}
                    pagination={false}
                    footer={() => <span>{selectedRowKeys.length} selected</span>}
                />
            </div>
        );
    }

    return (
        <React.Fragment>
            <Menu>
                <Menu.Item key="search">Search</Menu.Item>
                <Menu.Item key="search">Assigned to me</Menu.Item>
                <Menu.Item key="search">3rd section</Menu.Item>
            </Menu>
            <PageHeader
                title="Attendees"
                children={renderTop()}
                extra={[
                    hasFilters && (
                        <Tag key="filtersLabel" color="orange">
                            Filters active
                        </Tag>
                    ),
                    <Button key="filtersButton" onClick={() => setFiltersOpen(true)}>
                        Filters <Icon type="filter" />
                    </Button>
                ]}
                footer={
                    <React.Fragment>
                        <Divider size={1} />
                        {!error && renderContent()}
                        <AttendeeDrawer
                            event={event}
                            slug={slug}
                            registrationId={activeItem}
                            isOpen={typeof activeItem !== 'undefined'}
                            onClose={() => setActiveItem(undefined)}
                        />
                        <FiltersDrawer event={event} isOpen={filtersOpen} onClose={handleFiltersClosed} />
                        <Divider size={3} />
                    </React.Fragment>
                }
            />
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    idToken: AuthSelectors.getIdToken(state),
    getEventBySlug: OrganiserSelectors.getEventBySlug(state),
    getAttendeeByEvent: OrganiserSelectors.getAttendeeByEvent(state),
    getAttendeeIds: OrganiserSelectors.getAttendeeIdsForEvent(state),
    getAttendeeFilters: OrganiserSelectors.getAttendeesFiltersForEvent(state)
});

const mapDispatchToProps = dispatch => ({
    updateAttendees: slug => dispatch(OrganiserActions.updateAttendeesForEvent(slug))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganiserEditEventAttendees);
