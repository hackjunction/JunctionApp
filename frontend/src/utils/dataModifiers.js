//Utility to convert team.meta object of objects to array of objects for user profile rendering
export const objToArr = (objectOfObjects, itemIndexToReturn = 0) =>
    Object.entries(objectOfObjects)
        .map(([key, value]) => ({ [key]: value }))
        .map(item => Object.values(item)[itemIndexToReturn])
