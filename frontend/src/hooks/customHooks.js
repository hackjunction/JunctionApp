import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

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
