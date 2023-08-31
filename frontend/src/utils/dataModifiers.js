//Utility to convert team.meta object of objects to array of objects for user profile rendering
export const objToArr = (objectOfObjects, itemIndexToReturn = 0) => {
    if (typeof objectOfObjects === 'object') {
        return Object.entries(objectOfObjects)
            .map(([key, value]) => ({ [key]: value }))
            .map(item => Object.values(item)[itemIndexToReturn])
    } else {
        return []
    }
}
