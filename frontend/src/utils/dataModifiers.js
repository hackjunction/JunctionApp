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

export const projectURLgenerator = (eventSlug, projectId) => {
    //Utility to generate public project URL, with the shape /projects/:eventSlug/view/:projectId
    const originURL = window.location.origin
    let projectURL
    if (!!projectId && !!eventSlug && !!originURL) {
        projectURL = `${originURL}/projects/${eventSlug}/view/${projectId}`
    }
    return projectURL
}

export const addTeamCodeToProjectAndFilterNoTeam = (projects, teams) => {
    // Add teams code to projects and filters the projects which no longer have a team
    // TODO Delete projects which don't have a team anymore
    const projectsWithTeam = projects
        .map(project => {
            const projectModified = { ...project }
            const teamFound = teams.find(team => {
                return team._id === projectModified.team
            })
            if (teamFound) {
                projectModified.teamCode = teamFound.code
            } else {
                projectModified.teamCode = 'No team'
            }
            return projectModified
        })
        .filter(project => project.teamCode !== 'No team')
    return projectsWithTeam
}
