import { reduce, cloneDeep, set, endsWith, replace } from 'lodash-es'

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
        console.log('ACTION FROM UTILS>>>>>>')
        console.log(action.type)
        // action.status = action.status || 'sucess'
        console.log(action)
        switch (action.status) {
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
                        loading: false,
                        error: true,
                    },
                }
            case 'success':
                console.log('success is running>>>>>>>')
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
                            loading: false,
                            updated: Date.now(),
                        },
                    }
                }

                return {
                    ...state,
                    [field]: {
                        ...state[field],
                        data: action.payload,
                        loading: false,
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

export const asyncThunkModifier = action => {
    // Adds the promise status to the action being ran to match the buildHandler logic
    if (endsWith(action.type, '/fulfilled')) {
        action.baseType = replace(action.type, '/fulfilled', '')
        action.status = 'success'
    }
    if (endsWith(action.type, '/pending')) {
        action.baseType = replace(action.type, '/pending', '')
        action.status = 'start'
    }
    if (endsWith(action.type, '/rejected')) {
        action.baseType = replace(action.type, '/rejected', '')
        action.status = 'failure'
    }
    return action
}
