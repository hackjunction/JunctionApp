import getSlug from 'speakingurl'

export const objToArr = (objectOfObjects, itemIndexToReturn = 0) => {
    //Utility to convert team.meta object of objects to array of objects for user profile rendering
    if (typeof objectOfObjects === 'object') {
        return Object.entries(objectOfObjects)
            .map(([key, value]) => ({ [key]: value }))
            .map(item => Object.values(item)[itemIndexToReturn])
    } else {
        return []
    }
}

export const removeNumbers = (str, replace = '') => {
    return str.replace(/[0-9]/g, replace)
}

export const generateSlug = (str, replaceNumValue = '') => {
    return getSlug(removeNumbers(str, replaceNumValue))
}
