import { useLocation, useHistory } from 'react-router-dom'

export function useQuery() {
    const { search } = useLocation()
    const history = useHistory()

    function getQuery(key) {
        const params = new URLSearchParams(search)
        return params.get(key)
    }

    function setQuery(key, value) {
        const params = new URLSearchParams(search)
        params.set(key, value)
        history.push({ search: params.toString() })
    }

    return { getQuery, setQuery }
}
