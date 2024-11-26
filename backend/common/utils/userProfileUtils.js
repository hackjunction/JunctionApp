//TODO move this code into the user profile helpers

const userProfileUtils = {
    publicProfileBuilder: profileData => {
        //Do not include any sensitive information (email, nationality, gender, date of birth) in the public profile
        return {
            userId: profileData.userId,
            profile: {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                spokenLanguages: profileData.spokenLanguages,
                avatar: profileData.avatar || null,
                headline: profileData.headline,
                biography: profileData.biography,
            },
            skills: profileData.skills,
            roles: profileData.roles,
            industriesOfInterest: profileData.industriesOfInterest,
            themesOfInterest: profileData.themesOfInterest,
            education: profileData.education,
            social: {
                github: profileData.github,
                linkedin: profileData.linkedin,
                portfolio: profileData.portfolio,
                curriculumVitae: profileData.curriculumVitae,
            },
        }
    },
    recruitmentProfileBuilder: (registrationData, profileData) => {
        //This combines the registration data with the profile data
        //Don't include personal information like gender, nationality or date of birth
        return {
            userId: profileData.userId,
            profile: {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                email: profileData.email,
                countryOfResidence: registrationData.answers.countryOfResidence
                    ? registrationData.answers.countryOfResidence
                    : profileData.countryOfResidence,
                spokenLanguages: registrationData.answers.spokenLanguages
                    ? registrationData.answers.spokenLanguages
                    : profileData.spokenLanguages,
                avatar: profileData.avatar || null,
                headline: registrationData.answers.headline
                    ? registrationData.answers.headline
                    : profileData.headline,
                biography: registrationData.answers.biography
                    ? registrationData.answers.biography
                    : profileData.biography,
            },
            skills: registrationData.answers.skills
                ? registrationData.answers.skills
                : profileData.skills,
            roles: registrationData.answers.roles
                ? registrationData.answers.roles
                : profileData.roles,
            industriesOfInterest: registrationData.answers.industriesOfInterest
                ? registrationData.answers.industriesOfInterest
                : profileData.industriesOfInterest,
            themesOfInterest: registrationData.answers.themesOfInterest
                ? registrationData.answers.themesOfInterest
                : profileData.themesOfInterest,
            education: registrationData.answers.education
                ? registrationData.answers.education
                : profileData.education,
            social: {
                github: registrationData.answers.github
                    ? registrationData.answers.github
                    : profileData.github,
                linkedin: registrationData.answers.linkedin
                    ? registrationData.answers.linkedin
                    : profileData.linkedin,
                portfolio: registrationData.answers.portfolio
                    ? registrationData.answers.portfolio
                    : profileData.portfolio,
                curriculumVitae: registrationData.answers.curriculumVitae
                    ? registrationData.answers.curriculumVitae
                    : profileData.curriculumVitae,
            },
            recruitmentOptions: registrationData.answers.recruitmentOptions
                ? registrationData.answers.recruitmentOptions
                : profileData.recruitmentOptions,
            registrations: profileData.registrations,
        }
    },
}

module.exports = userProfileUtils
