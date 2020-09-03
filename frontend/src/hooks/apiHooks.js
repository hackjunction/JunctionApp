import { useState, useCallback } from 'react'

export const usePromise = promise => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const handleDone = useCallback(data => {
        setData(data)
        setLoading(false)
    }, [])

    const handleErr = useCallback(err => {
        setLoading(false)
        setError(err)
    }, [])

    const fetch = useCallback(
        (...args) => {
            promise(...args)
                .then(data => {
                    handleDone(data)
                })
                .catch(err => {
                    handleErr(err)
                })
        },
        [handleDone, handleErr, promise],
    )

    return { data, loading, error, fetch }
}
