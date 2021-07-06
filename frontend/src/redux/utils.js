import { handle } from 'redux-pack'
import { reduce, cloneDeep, set } from 'lodash-es'

/**
 * Custom redux-pack handler for reducers. If you want to produce this kind of state:
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
    (field, mapByField, mapIsArray) => (state, action) =>
        handle(state, action, {
            start: prevState => ({
                ...prevState,
                [field]: {
                    ...prevState[field],
                    loading: true,
                    error: false,
                },
            }),
            finish: prevState => ({
                ...prevState,
                [field]: {
                    ...prevState[field],
                    loading: false,
                },
            }),
            failure: prevState => ({
                ...prevState,
                [field]: {
                    ...prevState[field],
                    error: true,
                },
            }),
            success: prevState => {
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
                        ...prevState,
                        [field]: {
                            ...prevState[field],
                            data: action.payload,
                            map,
                            updated: Date.now(),
                        },
                    }
                }

                return {
                    ...prevState,
                    [field]: {
                        ...prevState[field],
                        data: action.payload,
                        updated: Date.now(),
                    },
                }
            },
        })

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
