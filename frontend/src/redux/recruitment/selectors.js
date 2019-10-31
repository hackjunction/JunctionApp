import { createSelector } from 'reselect';

export const searchResults = state => state.recruitment.searchResults.data.data;
export const searchResultsCount = state => state.recruitment.searchResults.data.count;
export const searchResultsLoading = state => state.recruitment.searchResults.loading;
export const searchResultsError = state => state.recruitment.searchResults.error;
export const searchResultsUpdated = state => state.recruitment.searchResults.updated;

export const actionHistory = state => state.recruitment.actionHistory.data;
export const actionHistoryLoading = state => state.recruitment.actionHistory.loading;
export const actionHistoryError = state => state.recruitment.actionHistory.error;
export const actionHistoryUpdated = state => state.recruitment.actionHistory.updated;

export const favorites = createSelector(
    actionHistory,
    actions => actionHistory.filter(action => action.type === 'favorite')
);

export const filters = state => state.recruitment.filters;
export const filtersRecruitmentStatuses = createSelector(
    filters,
    filters => filters.recruitmentStatuses || []
);

export const page = state => state.recruitment.pagination.page;
export const pageSize = state => state.recruitment.pagination.page_size;
export const pageCount = createSelector(
    searchResultsCount,
    pageSize,
    (count, pageSize) => Math.ceil(count / pageSize)
);
