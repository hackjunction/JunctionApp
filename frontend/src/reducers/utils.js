import { reduce, cloneDeep, set } from 'lodash-es'

/**
 * Custom handler for reducers. If you want to produce this kind of state:
 *
 * const initialState = {
 *   something: {
 *     data: {},
 *     loading: false,
 *     error: false,
 *     updated: 0
 *   },
 *   other: {
 *     data: {},
 *     loading: false,
 *     error: false,
 *     updated: 0
 *   }
 * }
 *
 * You can just do this:
 *
 * export default function reducer(state = initialState, action) {
 *   switch(action.type) {
 *     case ActionTypes.UPDATE_SOMETHING: {
 *       return buildHandler('something')(state, action)
 *     }
 *     case ActionTypes.UPDATE_OTHER: {
 *       return buildHandler('other')(state, action)
 *     }
 *   }
 * }
 *
 * If the action payload is an array of objects, you can also generate a "map" property
 * on the state object, keyed by a certain field by adding the optional "mapByField" parameter.
 * This is useful performance-wise if you need to frequently find items from the data by a certain field,
 * like _id.
 */

export const buildHandler =
    (field, mapByField, mapIsArray) => (state, action) => {
        switch(action.status) {
            case 'start':
                return {
                    ...state,
                    [field]: {
                        ...state[field],
                        loading: true,
                        error: false,
                    },
                }
            case 'finish':
                return {
                    ...state,
                    [field]: {
                        ...state[field],
                        loading: false,
                    },
                }
            case 'failure':
                return {
                    ...state,
                    [field]: {
                        ...state[field],
                        error: true,
                    },
                }
            case 'success':
                if (mapByField) {
                    const map = reduce(
                        action.payload,
                        (res, object) => {
                            const key = object[mapByField]
                            if (mapIsArray) {
                                if (res.hasOwnProperty(key)) {
                                    res[key] = res[key].concat(object)
                                } else {
                                    res[key] = [object]
                                }
                            } else {
                                res[key] = object
                            }
                            return res
                        },
                        {},
                    )

                    return {
                        ...state,
                        [field]: {
                            ...state[field],
                            data: action.payload,
                            map,
                            updated: Date.now(),
                        },
                    }
                }

                return {
                    ...state,
                    [field]: {
                        ...state[field],
                        data: action.payload,
                        updated: Date.now(),
                    },
                }
            default:
                return state
        }
    }

/** Simple function for reducing this boilerplate:
 *
 * return {
 *   ...state,
 *   someField: {
 *     ...state.someField,
 *     nestedField: {
 *       ...state.someField.nestedField,
 *       data: 'foobar'
 *     }
 *   }
 * }
 *
 * To this:
 *
 * return buildUpdatePath('someField.nestedField.data')(state, 'foobar');
 */

export const buildUpdatePath = path => (state, data) => {
    const newState = cloneDeep(state)
    set(newState, path, data)
    return newState
}
