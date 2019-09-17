import React from 'react';
import styles from './TeamsPage.module.scss';

import { connect } from 'react-redux';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

import { Table } from 'antd';

const TeamsPage = ({ idToken, slug }) => {
    return (
        <React.Fragment>
            <h3>Teams here</h3>
            <Table dataSource={[]} loading={false} rowKey="code">
                <Table.Column title="Code" dataIndex="code" key="code" />
                <Table.Column title="Locked?" dataIndex="locked" key="locked" />
            </Table>
        </React.Fragment>
    );
};

const mapState = state => ({
    teams: OrganiserSelectors.teams(state)
});

const mapDispatch = dispatch => ({
    updateTeams: slug => dispatch(OrganiserActions.updateTeamsForEvent(slug))
});

export default connect(
    mapState,
    mapDispatch
)(TeamsPage);
