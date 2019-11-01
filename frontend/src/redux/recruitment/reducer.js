import * as ActionTypes from './actionTypes';
import { buildHandler } from 'redux/utils';

const initialState = {
  events: {
    data: [],
    loading: false,
    error: false,
    updated: 0
  },
  searchResults: {
    data: {
      data: [],
      count: 0
    },
    loading: false,
    error: false,
    updated: 0
  },
  filters: {},
  pagination: {
    page: 0,
    page_size: 24
  },
  actionHistory: {
    data: [],
    loading: false,
    error: false,
    updated: 0
  },
  adminRecruiters: {
    data: [],
    loading: false,
    error: false,
    updated: 0
  },
  adminSearchResults: {
    data: [],
    loading: false,
    error: false,
    updated: 0
  }
};

const eventsHandler = buildHandler('events');
const searchResultsHandler = buildHandler('searchResults');
const actionHistoryHandler = buildHandler('actionHistory');
const adminRecruitersHandler = buildHandler('adminRecruiters');
const adminSearchHandler = buildHandler('adminSearchResults');

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_EVENTS: {
      return eventsHandler(state, action);
    }
    case ActionTypes.UPDATE_SEARCH_RESULTS: {
      return searchResultsHandler(state, action);
    }
    case ActionTypes.UPDATE_ACTION_HISTORY: {
      return actionHistoryHandler(state, action);
    }
    case ActionTypes.ADMIN_UPDATE_RECRUITERS: {
      return adminRecruitersHandler(state, action);
    }
    case ActionTypes.ADMIN_UPDATE_SEARCH_RESULTS: {
      return adminSearchHandler(state, action);
    }
    case ActionTypes.ADMIN_UPDATE_USER: {
      return {
        ...state,
        adminRecruiters: {
          ...state.adminRecruiters,
          data: state.adminRecruiters.data.map(user => {
            if (user.userId === action.payload.userId) return action.payload;
            return user;
          })
        },
        adminSearchResults: {
          ...state.adminSearchResults,
          data: state.adminSearchResults.data.map(user => {
            if (user.userId === action.payload.userId) return action.payload;
            return user;
          })
        }
      };
    }
    case ActionTypes.SET_FILTERS: {
      return {
        ...state,
        filters: action.payload,
        pagination: {
          ...state.pagination,
          page: 0
        }
      };
    }
    case ActionTypes.SET_FILTERS_FIELD: {
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        },
        pagination: {
          ...state.pagination,
          page: 0
        }
      };
    }
    case ActionTypes.SET_PAGE_SIZE: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page_size: action.payload
        }
      };
    }
    case ActionTypes.SET_PAGE: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload
        }
      };
    }
    case ActionTypes.SET_PREV_PAGE: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: state.pagination.page - 1
        }
      };
    }
    case ActionTypes.SET_NEXT_PAGE: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: state.pagination.page + 1
        }
      };
    }
    default:
      return state;
  }
}
