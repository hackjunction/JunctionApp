import { createSelector } from 'reselect'
export const events = state => state.recruitment.events.data
export const eventsLoading = state => state.recruitment.events.loading
export const eventsError = state => state.recruitment.events.error
export const eventsUpdated = state => state.recruitment.events.updated

export const eventsMap = createSelector(events, events =>
    events.reduce((res, event) => {
        res[event._id] = event
        return res
    }, {}),
)

export const searchResults = state => state.recruitment.searchResults.data
export const searchResultsCount = state => state.recruitment.searchResults.count
export const searchResultsLoading = state =>
    state.recruitment.searchResults.loading
export const searchResultsError = state => state.recruitment.searchResults.error
export const searchResultsUpdated = state =>
    state.recruitment.searchResults.updated

export const actionHistory = state => state.recruitment.actionHistory.data
export const actionHistoryByUser = state => state.recruitment.actionHistory.map
export const actionHistoryLoading = state =>
    state.recruitment.actionHistory.loading
export const actionHistoryError = state => state.recruitment.actionHistory.error
export const actionHistoryUpdated = state =>
    state.recruitment.actionHistory.updated

export const _adminRecruiters = state => state.recruitment.adminRecruiters.data
export const adminRecruitersLoading = state =>
    state.recruitment.adminRecruiters.loading
export const adminRecruitersError = state =>
    state.recruitment.adminRecruiters.error
export const adminRecruitersUpdated = state =>
    state.recruitment.adminRecruiters.updated

export const adminRecruiters = createSelector(_adminRecruiters, recruiters =>
    recruiters.filter(recruiter => recruiter.recruiterEvents.length > 0),
)

export const adminSearchResults = state =>
    state.recruitment.adminSearchResults.data
export const adminSearchResultsLoading = state =>
    state.recruitment.adminSearchResults.loading
export const adminSearchResultsError = state =>
    state.recruitment.adminSearchResults.error
export const adminSearchResultsUpdated = state =>
    state.recruitment.adminSearchResults.updated

export const favorites = createSelector(actionHistory, actions => {
    return actions
        .filter(action => action.type === 'favorite')
        .map(action => {
            return action._user
        })
})

export const filters = state => state.recruitment.filters
export const filtersRecruitmentStatuses = createSelector(
    filters,
    filters => filters.recruitmentStatuses || [],
)

export const page = state => state.recruitment.pagination.page
export const pageSize = state => state.recruitment.pagination.page_size
export const pageCount = createSelector(
    searchResultsCount,
    pageSize,
    (count, pageSize) => Math.ceil(count / pageSize),
)
