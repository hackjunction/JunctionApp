import React from 'react'
import { useState, useCallback, useEffect } from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
// import { push } from 'connected-react-router'

// import { useMyEvents, useActiveEvents } from 'graphql/queries/events'
// import * as UserSelectors from 'redux/user/selectors'

export const useStateWithReset = initialValue => {
    const [value, setValue] = useState(initialValue)
    const resetValue = () => setValue(initialValue)

    return [value, setValue, resetValue]
}

export const useToggle = initialValue => {
    const [value, setValue] = useState(initialValue)
    const toggleValue = useCallback(() => {
        setValue(!value)
    }, [value])

    return [value, toggleValue]
}

export const useArray = (initialValue = []) => {
    const [value, setValue] = useState(initialValue)

    if (!Array.isArray(value)) {
        throw new Error('useArray cannot be provided a non-array value')
    }

    const addValue = useCallback(
        item => {
            setValue(value.concat(item))
        },
        [value],
    )

    const removeValue = useCallback(
        index => {
            const newValue = [...value]
            newValue.splice(index, 1)
            setValue(newValue)
        },
        [value],
    )

    const editValue = useCallback(
        (index, edited) => {
            const newValue = [...value]
            newValue[index] = edited
            setValue(newValue)
        },
        [value],
    )

    return [value, addValue, removeValue, editValue, setValue]
}

export const useInitialFocus = ref => {
    useEffect(() => {
        ref.current.focus()
    }, [ref])
}

export const useDebounce = (value, delay) => {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(
        () => {
            // Set debouncedValue to value (passed in) after the specified delay
            const handler = setTimeout(() => {
                setDebouncedValue(value)
            }, delay)

            // Return a cleanup function that will be called every time ...
            // ... useEffect is re-called. useEffect will only be re-called ...
            // ... if value changes (see the inputs array below).
            // This is how we prevent debouncedValue from changing if value is ...
            // ... changed within the delay period. Timeout gets cleared and restarted.
            // To put it in context, if the user is typing within our app's ...
            // ... search box, we don't want the debouncedValue to update until ...
            // ... they've stopped typing for more than 500ms.
            return () => {
                clearTimeout(handler)
            }
        },
        // Only re-call effect if value changes
        // You could also add the "delay" var to inputs array if you ...
        // ... need to be able to change that dynamically.
        [value, delay],
    )

    return debouncedValue
}

export function useQueryParams() {
    const { search } = useLocation()

    return React.useMemo(() => new URLSearchParams(search), [search])
}

// export const useRedirectDashboard = () => {
//     const dispatch = useDispatch()
//     const recruiterEvents = useSelector(UserSelectors.userProfileRecruiterEvents)
//     const [organizerEvents, loading] = useMyEvents()//TODO: move to user state
//     const participantEvents = useSelector(UserSelectors.userProfileRegistrations)
//     const [activeEvents] = useActiveEvents({}) //active events, from these we select where to rediret, or default

//     console.log("activeEvents", activeEvents)
//     console.log("organizerEvents", organizerEvents)
//     console.log("recruiterEvents", recruiterEvents)
//     console.log("participantEvents", participantEvents)

//     var defaultPage = activeEvents?.find(active => recruiterEvents?.some(e => e.eventId === active._id))
//     console.log("defaultPage?", defaultPage)
//     //abstract equality
//     if (defaultPage == null) {
//         defaultPage = activeEvents?.find(active => organizerEvents?.some(e => e._id === active._id))
//         console.log("defaultPage organizerEvents", defaultPage)
//     }
//     if (defaultPage == null) {
//         defaultPage = activeEvents?.find(active => participantEvents?.some(e => e.event === active._id))
//         console.log("defaultPage participantEvents", defaultPage)
//     }
//     console.log("defaultPage", defaultPage != null ? "not null" : "null")


//     if (defaultPage != null) {
//         console.log(`/dashboard/${defaultPage.slug}`)
//         dispatch(push(`/dashboard/${defaultPage.slug}`))
//     } else {
//         console.log(`/dashboard`)
//         dispatch(push(`/dashboard`))
//     }



// }