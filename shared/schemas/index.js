const { GraphQLSchema, printSchema } = require('graphql')

const Address = require('./Address')
const Answers = require('./Answers')
const Challenge = require('./Challenge')
const CloudinaryImage = require('./CloudinaryImage')
const Education = require('./Education')
const IBANAccount = require('./IBANAccount')
const LegalName = require('./LegalName')
const PhoneNumber = require('./PhoneNumber')
const RecruitmentOptions = require('./RecruitmentOptions')
const RegistrationQuestion = require('./RegistrationQuestion')
const RegistrationSection = require('./RegistrationSection')
const Role = require('./Role')
const Skill = require('./Skill')
const TeamOptions = require('./TeamOptions')
const Track = require('./Track')
const TravelGrantConfig = require('./TravelGrantConfig')
const TravelGrantDetails = require('./TravelGrantDetails')
const UserDetailsConfig = require('./UserDetailsConfig')
const UserDetailsConfigItem = require('./UserDetailsConfigItem')
const EventTag = require('./EventTag')
const RegistrationQuestionSettings = require('./RegistrationQuestionSettings')

// const GraphQLSchema = makeExecutableSchema

const SharedSchema = new GraphQLSchema({
    types: [
        CloudinaryImage.graphql,
        Address.graphql,
        Track.graphql,
        Challenge.graphql,
        TravelGrantConfig.graphql,
        UserDetailsConfigItem.graphql,
        UserDetailsConfig.graphql,
        RegistrationSection.graphql,
        EventTag.graphql,
        RegistrationQuestionSettings.graphql,
        Answers.graphql,
        TravelGrantDetails.graphql,
        Education.graphql,
        IBANAccount.graphql,
        LegalName.graphql,
        PhoneNumber.graphql,
        RecruitmentOptions.graphql,
        RegistrationQuestion.graphql,
        Role.graphql,
        Skill.graphql,
        TeamOptions.graphql,
    ],
})

module.exports = {
    SharedGraphQLTypes: printSchema(SharedSchema),
}
