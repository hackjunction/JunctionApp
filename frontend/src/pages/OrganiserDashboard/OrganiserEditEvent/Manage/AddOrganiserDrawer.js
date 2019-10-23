import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Drawer, Row, Col, Button, Input, List, notification } from 'antd';

import * as AuthSelectors from 'redux/auth/selectors';
import Divider from 'components/generic/Divider';
import UserProfilesService from 'services/userProfiles';

const AddOrganiserDrawer = ({ isOpen, onClose, onAdded, idToken, organisers, slug }) => {
    const [results, setResults] = useState([]);

    function getResults(search) {
        UserProfilesService.getUsersByEmail(search, idToken)
            .then(users => {
                if (users.length === 0) {
                    notification.error({
                        message: 'No users found',
                        description:
                            "Please make sure you've written their email correctly, and that they've created an account already."
                    });
                }
                setResults(users);
            })
            .catch(err => {
                notification.error({
                    message: 'Oops, something went wrong',
                    description: 'Unable to search users'
                });
            });
    }

    function handleAdd(user) {
        onAdded(user.userId);
        // const hideMessage = message.loading('Adding organiser', 0);
        // EventsService.addOrganiserToEvent(idToken, slug, user.userId)
        //     .then(userId => {
        //         hideMessage();
        //         onAdded(userId);
        //         message.success('Added organiser');
        //     })
        //     .catch(err => {
        //         hideMessage();
        //         notification.error({
        //             message: 'Oops, something went wrong',
        //             description: 'Please try again'
        //         });
        //     });
    }

    function renderRow(item) {
        const exists = organisers.indexOf(item.userId) !== -1;
        return (
            <List.Item
                actions={[
                    <Button disabled={exists} type="link" onClick={() => handleAdd(item)}>
                        {exists ? 'Added' : 'Add'}
                    </Button>
                ]}
            >
                <List.Item.Meta title={item.firstName + ' ' + item.lastName} description={item.userId} />
            </List.Item>
        );
    }

    return (
        <Drawer
            title="Search for users"
            placement="right"
            closable="false"
            onClose={onClose}
            visible={isOpen}
            width={500}
        >
            <Row gutter={16}>
                <Col xs={24}>
                    <Input.Search
                        placeholder="Search by email address"
                        enterButton="Search"
                        size="large"
                        onSearch={value => getResults(value)}
                    />
                    <Divider size={1} />
                    <List
                        itemLayout="horizontal"
                        dataSource={results}
                        rowKey="userId"
                        bordered={true}
                        renderItem={renderRow}
                    />
                </Col>
            </Row>
        </Drawer>
    );
};

const mapStateToProps = state => ({
    idToken: AuthSelectors.getIdToken(state)
});

export default connect(mapStateToProps)(AddOrganiserDrawer);
