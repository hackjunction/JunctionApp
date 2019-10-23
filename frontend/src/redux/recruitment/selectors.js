import { createSelector } from 'reselect';

export const searchResults = state => state.recruitment.searchResults.data.data;
export const searchResultsCount = state => state.recruitment.searchResults.data.count;
export const searchResultsLoading = state => state.recruitment.searchResults.loading;
export const searchResultsError = state => state.recruitment.searchResults.error;
export const searchResultsUpdated = state => state.recruitment.searchResults.updated;

export const filters = state => state.recruitment.filters;
export const page = state => state.recruitment.pagination.page;
export const pageSize = state => state.recruitment.pagination.page_size;
export const pageCount = createSelector(
    searchResultsCount,
    pageSize,
    (count, pageSize) => Math.ceil(count / pageSize)
);
