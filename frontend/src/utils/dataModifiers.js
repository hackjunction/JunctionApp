import _ from 'lodash'
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

export const slugify = inputString => {
    //Replaces spaces in strings with lodashes
    if (!inputString || typeof inputString !== 'string') {
        return
    }
    return inputString.toLowerCase().replace(/\s/g, '_')
}

//TODO create CRON job or organizer action to delete projects without a valid team instead of using this function
export const filterProjectsWithTeam = (projects, teams) => {
    const projectsFiltered = _.compact(
        projects.map(project => {
            const teamFound = teams.find(team => {
                return team._id === project.team
            })
            if (teamFound) {
                project.teamCode = teamFound.code
                project.teamName = teamFound.name
                return project
            }
        }),
    )
    if (projectsFiltered.length > 0) {
        return projectsFiltered
    }
    return []
}

export const getProjectsForChallenge = (
    allProjects,
    allTeams,
    challengeSlug,
) => {
    const projectsWithTeam = filterProjectsWithTeam(allProjects, allTeams)
    return projectsWithTeam.filter(project => {
        return (
            project.challenges &&
            project.challenges.indexOf(challengeSlug) !== -1
        )
    })
}

export const getProjectsForTrack = (allProjects, allTeams, trackSlug) => {
    const projectsWithTeam = filterProjectsWithTeam(allProjects, allTeams)
    return projectsWithTeam.filter(project => project.track === trackSlug)
}

export const flattenObject = (ob, skipArray = [], stringEscapeArray = []) => {
    //Utility to flatten nested objects for CSV export, used on attendees, projects and recruitment data exports
    //skipArray is an array of keys to skip and stringEscapeArray is an array of keys to escape if they might have commas or quotes
    let toReturn = {}
    for (let i in ob) {
        if (!ob.hasOwnProperty(i) || skipArray.some(val => val === i)) continue

        if (stringEscapeArray.some(val => val === i)) {
            toReturn[i] = ob[i].replace(/"/g, '""')
            continue
        } else if (typeof ob[i] === 'object' && ob[i] !== null) {
            // CustomAnswers is a special case for attendee registrations
            if (i === 'CustomAnswers') {
                for (let j in ob[i]) {
                    if (!ob[i].hasOwnProperty(j)) continue
                    const customAnswerLabel = ob[i][j].label
                    const customAnswerValue = ob[i][j].value
                    toReturn[customAnswerLabel] = customAnswerValue.replace(
                        /"/g,
                        '""',
                    )
                }
            } else {
                let flatObject = flattenObject(ob[i])
                for (let x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) continue
                    if (typeof flatObject[x] === 'string') {
                        toReturn[i + '.' + x] = flatObject[x].replace(
                            /"/g,
                            '""',
                        )
                    } else {
                        toReturn[i + '.' + x] = flatObject[x]
                    }
                }
            }
        } else {
            toReturn[i] = ob[i]
        }
    }
    return toReturn
}
