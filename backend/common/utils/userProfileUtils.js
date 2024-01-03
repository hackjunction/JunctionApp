//TODO move this code into the user profile helpers

const userProfileUtils = {
    publicProfileBuilder: profileData => {
        return {
            userId: profileData.userId,
            profile: {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                email: profileData.email,
                gender: profileData.gender,
                nationality: profileData.nationality,
                countryOfResidence: profileData.countryOfResidence,
                dateOfBirth: profileData.dateOfBirth,
                spokenLanguages: profileData.spokenLanguages,
                // TODO remove profilePicture and replace with avatar property
                profilePicture: profileData.avatar || null,
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
    recruitmentProfileBuilder: function (profileData) {
        return {
            ...this.publicProfileBuilder(profileData),
            recruitmentOptions: profileData.recruitmentOptions,
            registrations: profileData.registrations,
        }
    },
}

module.exports = userProfileUtils
