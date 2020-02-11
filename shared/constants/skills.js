const abstractSkills = require('../data/skills-abstract.json')
const programmingLanguages = require('../data/skills-programming-languages.json')
const programmingTools = require('../data/skills-programming-frameworks-tools.json')
const toolsAndSoftware = require('../data/skills-tools-and-software.json')

const categories = [
    {
        id: 'abstract-skills',
        label: 'Abstract Skills',
        items: abstractSkills,
    },
    {
        id: 'programming-languages',
        label: 'Programming Languages',
        items: programmingLanguages,
    },
    {
        id: 'programming-tools',
        label: 'Programming Frameworks & Tools',
        items: programmingTools,
    },
    {
        id: 'tools-and-software',
        label: 'Tools & Software',
        items: toolsAndSoftware,
    },
]

const skillLevels = {
    1: {
        label: 'Basic proficiency',
        description:
            'You have a common knowledge or an understanding of the basic techniques or concepts associated with this competency.',
    },
    2: {
        label: 'Novice',
        description:
            'You have the level of experience gained in a classroom and/or experimental scenarios or as a trainee on-the-job. You are expected to need help when performing this skill.',
    },
    3: {
        label: 'Intermediate',
        description:
            'You are able to successfully complete tasks in this competency as requested. Help from an expert may be required from time to time, but you can usually perform the skill independently.',
    },
    4: {
        label: 'Advanced',
        description:
            'You can perform the actions associated with this skill without assistance. You are recognized as ‘a person to ask’ when difficult questions arise regarding this skill.',
    },
    5: {
        label: 'Expert',
        description:
            'You are an expert in this area. You can provide guidance, troubleshoot and answer questions related to this area of expertise and the field where the skill is used.',
    },
}

const Skills = {}

Skills.categories = categories
Skills.items = categories.reduce((res, category) => {
    res = res.concat(category.items)
    return res
}, [])
Skills.itemsWithoutAbstract = categories.reduce((res, category) => {
    if (category.id !== 'abstract-skills') {
        res = res.concat(category.items)
    }
    return res
}, [])
Skills.skillLevelArray = Object.keys(skillLevels).map(idx => ({
    value: idx,
    ...skillLevels[idx],
}))
Skills.skillLevelLabelsArray = Object.keys(skillLevels).map(
    idx => skillLevels[idx].label
)
Skills.getLabelForSkillLevel = level =>
    skillLevels.hasOwnProperty(level) ? skillLevels[level].label : ''
Skills.getDescriptionForSkillLevel = level =>
    skillLevels.hasOwnProperty(level) ? skillLevels[level].description : ''

module.exports = Skills
