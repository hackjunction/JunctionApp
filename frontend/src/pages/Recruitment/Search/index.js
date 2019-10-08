import React from 'react';
import { Typography } from '@material-ui/core';

import PageWrapper from 'components/PageWrapper';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';

const SearchPage = () => {
    return (
        <PageWrapper>
            <SearchBox />
            <SearchResults />
        </PageWrapper>
    );
};

export default SearchPage;
