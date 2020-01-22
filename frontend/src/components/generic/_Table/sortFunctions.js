import { memoize } from 'lodash-es'

const getValues = (rowA, rowB, key, defaultValue) => {
    return [
        rowA?.values?.[key] ?? defaultValue,
        rowB?.values?.[key] ?? defaultValue,
    ]
}

export const Numeric = (rowA, rowB, key) => {
    const [a, b] = getValues(rowA, rowB, key, 0)
    return a - b
}

export const Alphabetic = (rowA, rowB, key) => {
    const [a, b] = getValues(rowA, rowB, key, '')
    return memoize((a, b) => {
        return a.localeCompare(b)
    })(a, b)
}

export const DateTime = (rowA, rowB, key) => {
    const [a, b] = getValues(rowA, rowB, key, 0)
    return memoize((a, b) => {
        return new Date(a) - new Date(b)
    })(a, b)
}

export const ArrayLength = (rowA, rowB, key) => {
    const [a, b] = getValues(rowA, rowB, key, [])
    return memoize((a, b) => {
        return a.length - b.length
    })(a, b)
}
