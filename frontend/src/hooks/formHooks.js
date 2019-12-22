import { useState, useCallback } from 'react'

export const useFormField = (
    initialValue,
    validate = () => null,
    initialError = null,
    onChangeEvent = true
) => {
    const [value, setValue] = useState(initialValue)
    const [error, setError] = useState(initialError)

    const onChange = useCallback(
        e => {
            const value = onChangeEvent ? e.target.value : e
            setValue(value)
            if (error) {
                const newError = validate(value)

                if (newError) {
                    setError(newError)
                } else {
                    setError(null)
                }
            }
        },
        [error, validate, onChangeEvent]
    )

    const reset = useCallback(() => {
        setValue(initialValue)
        setError(undefined)
    }, [initialValue])

    const handleValidate = useCallback(() => {
        const err = validate(value)
        if (err) {
            setError(err)
            return err
        } else {
            setError()
            return
        }
    }, [value, validate])

    return {
        value,
        setValue,
        onChange,
        reset,
        error,
        setError,
        validate: handleValidate,
        dirty: value !== initialValue,
    }
}
