// const fs = require('fs')
// const mongoose = require('mongoose')
// const Promise = require('bluebird')
// const Project = require('../modules/project/model')

// const ProjectData = require('../../projectData.json')

// const content = 'Some content!'

// module.exports = {
//         index: 27,
//         name: '27-migrate-projects-to-final',
//         description: 'migrate juntion 23 event projects to final for gavel testing',
//         run: async () => {
//             // Update emailConfig.senderEmail field for documents with an empty senderEmail
//             const projects = await mongoose
//                 .model('Project')
//                 .find(
//                     { event: '647860c38fd56d0036cc6033'}
//                 )

//                 console.log("found", projects.length)
//                         projects.forEach( p => {
//            Project.findById(p._id).then(project => {
//             const found = ProjectData.find(data => {
//                 //console.log("data", project._id, data._id, project._id === data._id, typeof(project._id.), typeof(data._id))
//                 return project._id.toString() === data._id
//             })
//             //console.log("found",project._id, JSON.stringify(found))
                
//                 //  project = {
//                 //     ...project,
//                 //     submissionFormAnswers: found.submissionFormAnswers
//                 // }

//                 project.submissionFormAnswers = found.submissionFormAnswers
//                 console.log(project)
                
                
//             return project.save()
//         }
//             )
//     })

//                 // const mapped = projects.map(p => {
//                 //     return {
//                 //     _id: p._id,
//                 //     submissionFormAnswers: p.submissionFormAnswers,
//                 //     }
//                 // })


// // fs.writeFile('../projectData.json', JSON.stringify(mapped)
// // , err => {
// //   if (err) {
// //     console.error(err);
// //   }
// //   // file written successfully
// // })

// console.log('Done migrate projects to final')

//         return Promise.resolve()
//     },
// }

// // const mongoose = require('mongoose')
// // const Promise = require('bluebird')
// // const Project = require('../modules/project/model')

// // module.exports = {
// //     index: 27,
// //     name: '27-migrate-projects-to-final',
// //     description: 'migrate juntion 23 event projects to final for gavel testing',
// //     run: async () => {
// //         // Update emailConfig.senderEmail field for documents with an empty senderEmail
// //         const projects = await mongoose
// //             .model('Project')
// //             .find(
// //                 { event: '647860c38fd56d0036cc6033'},
// //                 { status: "draft "}
// //             )

// //         projects.forEach( p => {
// //            Project.findById(p._id).then(project => {
            
// //                 project.status ="final"
            
// //             return project.save()
// //         }
// //             )
// //     })
// //         console.log('Done migrate projects to final')

// //         return Promise.resolve()
// //     },
// // }
