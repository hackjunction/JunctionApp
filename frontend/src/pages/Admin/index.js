import React, { PureComponent } from 'react';

import PageWrapper from 'components/layouts/PageWrapper';
import CenteredContainer from 'components/generic/CenteredContainer';

class AdminPage extends PureComponent {
    componentDidMount() {}

    render() {
        return (
            <PageWrapper>
                <CenteredContainer>
                    <h1>God mode</h1>
                </CenteredContainer>
            </PageWrapper>
        );
    }
}

export default AdminPage;
