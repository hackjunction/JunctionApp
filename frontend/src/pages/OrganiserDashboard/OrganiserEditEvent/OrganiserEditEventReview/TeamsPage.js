import React from 'react';
import styles from './TeamsPage.module.scss';

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

export default TeamsPage;
