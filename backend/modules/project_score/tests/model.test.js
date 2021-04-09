const mongoose = require('mongoose')
const { ProjectScore } = require('../model')
// const { Project } = require('../../project/model')

test('Creates project score model', () => {
    // const project = {}
    // const projectModel = new Project({ ...project })

    const score = {
        project: '5fa5934efe2a9500432f9900',
        event: '5f15987616d671004965753a',
        status: 'submitted',
        scoreGiver: 'Martti Jagerson',
        score: 69,
        maxScore: 10,
        message: 'Aitoo menoa',
        track: undefined,
    }
    const projectScoreModel = new ProjectScore({ ...score })
    console.log(projectScoreModel)
})
