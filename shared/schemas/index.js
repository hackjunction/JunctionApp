const { GraphQLSchema, printSchema, astFromValue } = require('graphql')

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
    ],
    // Answers: Answers.graphql,
    // Challenge: Challenge.graphql,
    // CloudinaryImage: CloudinaryImage.graphql,
    // Education: Education.graphql,
    // IBANAccount: IBANAccount.graphql,
    // LegalName: LegalName.graphql,
    // PhoneNumber: PhoneNumber.graphql,
    // RecruitmentOptions: RecruitmentOptions.graphql,
    // RegistrationQuestion: RegistrationQuestion.graphql,
    // RegistrationSection: RegistrationSection.graphql,
    // Role: Role.graphql,
    // Skill: Skill.graphql,
    // TeamOptions: TeamOptions.graphql,
    // Track: Track.graphql,
    // TravelGrantConfig: TravelGrantConfig.graphql,
    // TravelGrantDetails: TravelGrantDetails.graphql,
})

module.exports = {
    SharedGraphQLTypes: printSchema(SharedSchema),
}
