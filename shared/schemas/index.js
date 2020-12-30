const { GraphQLSchema, printSchema } = require('graphql')

const Address = require('./Address')
const Answers = require('./Answers')
const Challenge = require('./Challenge')
const CloudinaryImage = require('./CloudinaryImage')
const Education = require('./Education')
const EventTag = require('./EventTag')
const IBANAccount = require('./IBANAccount')
const LegalName = require('./LegalName')
const PhoneNumber = require('./PhoneNumber')
const RecruitmentOptions = require('./RecruitmentOptions')
const RegistrationConfig = require('./RegistrationConfig')
const RegistrationQuestion = require('./RegistrationQuestion')
const RegistrationQuestionSettings = require('./RegistrationQuestionSettings')
const RegistrationSection = require('./RegistrationSection')
const Role = require('./Role')
const Skill = require('./Skill')
const TeamOptions = require('./TeamOptions')
const Track = require('./Track')
const TravelGrantConfig = require('./TravelGrantConfig')
const TravelGrantDetails = require('./TravelGrantDetails')
const UserDetailsConfig = require('./UserDetailsConfig')
const UserDetailsConfigItem = require('./UserDetailsConfigItem')
const UserProfileFields = require('./UserProfileFields')
const Webhook = require('./Webhook')
const EventTheme = require('./EventTheme')
// const GraphQLSchema = makeExecutableSchema

const SharedSchema = new GraphQLSchema({
    types: [
        Address.graphql,
        Answers.graphql,
        Challenge.graphql,
        CloudinaryImage.graphql,
        Education.graphql,
        EventTag.graphql,
        IBANAccount.graphql,
        LegalName.graphql,
        PhoneNumber.graphql,
        RecruitmentOptions.graphql,
        RegistrationConfig.graphql,
        RegistrationQuestion.graphql,
        RegistrationQuestionSettings.graphql,
        RegistrationSection.graphql,
        Role.graphql,
        Skill.graphql,
        TeamOptions.graphql,
        Track.graphql,
        TravelGrantConfig.graphql,
        TravelGrantDetails.graphql,
        UserDetailsConfig.graphql,
        UserDetailsConfigItem.graphql,
        UserProfileFields.graphql,
        Webhook.graphql,
        EventTheme.graphql,
    ],
})

module.exports = {
    SharedGraphQLTypes: printSchema(SharedSchema),
}
