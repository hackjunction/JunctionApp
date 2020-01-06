/** The new cleaned up implementation of registration fields */
const Countries = require('./countries')
const Genders = require('./genders')
const Languages = require('./languages')
const Misc = require('./misc')
const Roles = require('./roles')
const Skills = require('./skills')
const Industries = require('./industries')
const Themes = require('./themes')

const Schemas = require('../jsonschemas/RegistrationFields')
const FieldTypes = require('./field-types')

const Categories = {
    BASIC_DETAILS: {
        label: 'Basic Details',
        order: 1,
    },
    SKILLS_AND_INTERESTS: {
        label: 'Skills & Interests',
        order: 2,
    },
    LINKS: {
        label: 'Links',
        order: 3,
    },
    TRAVEL_AND_ACCOMMODATION: {
        label: 'Travel & Accommodation',
        order: 4,
    },
    RECRUITMENT: {
        label: 'Opportunities',
        order: 5,
    },
    OTHER: {
        label: 'Other',
        order: 6,
    },
}

const Fields = {
    firstName: {
        /** The JSON validation schema for this field */
        schema: Schemas.firstName,
        /** Field configuration */
        config: {
            /** The type of input to show in the registration form */
            fieldType: FieldTypes.SHORT_TEXT,
            /** If provided, copy the answer from this field to the user's profile on registration updated */
            userProfile: {
                /** The name of the field in the user profile */
                field: 'firstName',
                /** The mongoose schema definition of the field */
                schema: {
                    type: String,
                    required: true,
                    trim: true,
                },
            },
            /** Should this field be shown in the registration form (by default)? */
            defaultEnabled: true,
            /** Should this field be required in the registration form (by default)? */
            defaultRequired: true,
            /** Are the two above values editable in the admin panel? */
            editable: false,
        },
        /** Field metadata */
        meta: {
            /** The hint to show in the registration form question for this field */
            hint: '',
            /** The hint to show in the admin panel for this field, if not self-explanatory */
            adminHint: '',
            /** The placeholder value to show in the registration form question for this field */
            placeholder: 'Herbert',
            /** The category this question belongs to (registration form is grouped into sections by category) */
            category: Categories.basicDetails,
        },
    },
    lastName: {
        schema: Schemas.lastName,
        config: {
            fieldType: FieldTypes.SHORT_TEXT,
            userProfile: {
                field: 'lastName',
                schema: {
                    type: String,
                    required: true,
                    trim: true,
                },
            },
            defaultEnabled: true,
            defaultRequired: true,
            editable: false,
        },
        meta: {
            hint: '',
            adminHint: '',
            placeholder: 'Hacker',
            category: Categories.basicDetails,
        },
    },
    email: {
        schema: Schemas.email,
        config: {
            fieldType: FieldTypes.EMAIL,
            userProfile: {
                field: 'email',
                schema: {
                    type: String,
                    required: true,
                    trim: true,
                },
            },
            defaultEnabled: true,
            defaultRequired: true,
            editable: false,
        },
        meta: {
            hint:
                'The email address you wish to receive notifications related to your registration to.',
            adminHint: '',
            placeholder: 'herbert.hacker@bighackathon.com',
            category: Categories.basicDetails,
        },
    },
    phoneNumber: {
        schema: Schemas.phoneNumber,
        config: {
            fieldType: FieldTypes.PHONE_NUMBER,
            userProfile: {
                field: 'phoneNumber',
                schema: {
                    country_code: {
                        type: String,
                        enum: Countries.asArrayOfPhoneCodes,
                    },
                    number: {
                        type: String,
                    },
                },
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint:
                'Your phone number, in case we need to contact you in urgent matters.',
            adminHint: '',
            placeholder: '+123 123 1234',
            category: Categories.basicDetails,
        },
    },
    dateOfBirth: {
        schema: Schemas.dateOfBirth,
        config: {
            fieldType: FieldTypes.DATE,
            userProfile: {
                field: 'dateOfBirth',
                schema: {
                    type: Date,
                },
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint:
                'Please note that you must be at least 16 years of age to register to this event.',
            adminHint: '',
            placeholder: '+123 123 1234',
            category: Categories.basicDetails,
        },
    },
    gender: {
        schema: Schemas.gender,
        config: {
            fieldType: FieldTypes.GENDER,
            userProfile: {
                field: 'gender',
                schema: {
                    type: String,
                    enum: Genders,
                },
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint: '',
            adminHint: '',
            placeholder: '',
            category: Categories.basicDetails,
        },
    },
    nationality: {
        schema: Schemas.nationality,
        config: {
            fieldType: FieldTypes.NATIONALITY,
            userProfile: {
                field: 'nationality',
                schema: {
                    type: String,
                    enum: Countries.asArrayOfNationalities,
                },
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint: '',
            adminHint: '',
            placeholder: '',
            category: Categories.basicDetails,
        },
    },
    spokenLanguages: {
        schema: Schemas.spokenLanguages,
        config: {
            fieldType: FieldTypes.LANGUAGES,
            userProfile: {
                field: 'spokenLanguages',
                schema: [
                    {
                        type: String,
                        enum: Languages.asArrayOfNames,
                    },
                ],
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint:
                'Select all languages which you speak with working efficiency.',
            adminHint: '',
            placeholder: '',
            category: Categories.basicDetails,
        },
    },
    countryOfResidence: {
        schema: Schemas.countryOfResidence,
        config: {
            fieldType: FieldTypes.COUNTRY,
            userProfile: {
                field: 'countryOfResidence',
                schema: {
                    type: String,
                    enum: Countries.asArrayOfName,
                },
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint: 'What country are you currently living in?',
            adminHint: '',
            placeholder: '',
            category: Categories.basicDetails,
        },
    },
    cityOfResidence: {
        schema: Schemas.cityOfResidence,
        config: {
            fieldType: FieldTypes.SHORT_TEXT,
            userProfile: {
                field: 'cityOfResidence',
                schema: {
                    type: String,
                    trim: true,
                },
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint: 'Which city do you currently live in?',
            adminHint: '',
            placeholder: 'Hackerville',
            category: Categories.basicDetails,
        },
    },
    tShirtSize: {
        schema: Schemas.tShirtSize,
        config: {
            fieldType: FieldTypes.T_SHIRT_SIZE,
            userProfile: {
                field: 'tShirtSize',
                schema: {
                    type: String,
                    enum: Misc.tShirtSizes,
                },
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint: `What size T-shirt do you want?`,
            adminHint: '',
            placeholder: '',
            category: Categories.basicDetails,
        },
    },
    dietaryRestrictions: {
        schema: Schemas.dietaryRestrictions,
        config: {
            fieldType: FieldTypes.DIETARY_RESTRICTIONS,
            userProfile: null,
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint:
                'Please select all dietary restrictions from the below list that apply to you - if none of the available options apply, you can leave this field empty.',
            adminHint: '',
            placeholder: '',
            category: Categories.basicDetails,
        },
    },
    headline: {
        schema: Schemas.headline,
        config: {
            fieldType: FieldTypes.SHORT_TEXT,
            userProfile: {
                field: 'headline',
                schema: {
                    type: String,
                    trim: true,
                },
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint: 'In one sentence, who are you / what do you do?',
            adminHint:
                'LinkedIn style short introduction, i.e. Software Developer at Apple',
            placeholder: 'Professional Hacker at BigHackathon Corp.',
            category: Categories.SKILLS_AND_INTERESTS,
        },
    },
    biography: {
        schema: Schemas.biography,
        config: {
            fieldType: FieldTypes.LONG_TEXT,
            userProfile: {
                field: 'biography',
                schema: {
                    type: String,
                    trim: true,
                },
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint: `Add a bit of personal touch to your profile by writing a little bit more about yourself and what you do. Especially if you're looking to catch the attention of some of our recruiting partners and get hired, this is a good chance to stand out from the crowd!`,
            adminHint:
                'Long text field to where the user can write up to a 2000 character introduction of themselves',
            placeholder: '',
            category: Categories.SKILLS_AND_INTERESTS,
        },
    },
    roles: {
        schema: Schemas.roles,
        config: {
            fieldType: FieldTypes.ROLES,
            userProfile: {
                field: 'roles',
                schema: [
                    {
                        role: {
                            type: String,
                            enum: Roles.items,
                        },
                        years: {
                            type: Number,
                            min: 1,
                            max: 5,
                        },
                    },
                ],
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint: 'Add up to 5 roles you have working experience in.',
            adminHint:
                'Allow the user to select professional roles they have working experience in, i.e. Software Developer (8+ years)',
            placeholder: '',
            category: Categories.SKILLS_AND_INTERESTS,
        },
    },
    skills: {
        schema: Schemas.skills,
        config: {
            fieldType: FieldTypes.SKILLS,
            userProfile: {
                field: 'skills',
                schema: [
                    {
                        skill: {
                            type: String,
                            enum: Skills.items,
                        },
                        level: {
                            type: Number,
                            min: 1,
                            max: 5,
                        },
                    },
                ],
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint: `Add up to 10 skills you consider yourself to be proficient at.`,
            adminHint:
                'Allow the user to select skills they are proficient at, i.e. Test-driven Development (Advanced)',
            placeholder: '',
            category: Categories.SKILLS_AND_INTERESTS,
        },
    },
    industriesOfInterest: {
        schema: Schemas.industriesOfInterest,
        config: {
            fieldType: FieldTypes.INDUSTRIES,
            userProfile: {
                field: 'industriesOfInterest',
                schema: [
                    {
                        type: String,
                        enum: Industries.industries,
                    },
                ],
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint:
                'Choose up to 3 industries that are the most interesting to you',
            adminHint:
                'Allow the user to select up to 3 industries that they are interested (Banking & Finance, Healthcare, Hospitality, etc.)',
            placeholder: '',
            category: Categories.SKILLS_AND_INTERESTS,
        },
    },
    themesOfInterest: {
        schema: Schemas.themesOfInterest,
        config: {
            fieldType: FieldTypes.THEMES,
            userProfile: {
                field: 'themesOfInterest',
                schema: [
                    {
                        type: String,
                        enum: Themes.themes,
                    },
                ],
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint: 'Choose up to 3 themes that are the most interesting to you',
            adminHint:
                'Allow the user to select up to 3 themes that they are interested (Artificial Intelligence, Space, Blockchain, etc.)',
            placeholder: '',
            category: Categories.SKILLS_AND_INTERESTS,
        },
    },
    numHackathons: {
        schema: Schemas.numHackathons,
        config: {
            fieldType: FieldTypes.NUM_HACKATHONS,
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint: `Not your first hackathon? Let us know! But don't worry if it is, we always accept also people who've never attended hackathons before.`,
            adminHint: `Allow the user to select how many hackathons they've been to, on a scale of 0 to 5+`,
            placeholder: '',
            category: Categories.SKILLS_AND_INTERESTS,
        },
    },
    education: {
        schema: Schemas.education,
        config: {
            fieldType: FieldTypes.EDUCATION,
            userProfile: {
                field: 'education',
                schema: {
                    level: {
                        type: String,
                    },
                    university: {
                        type: String,
                    },
                    degree: {
                        type: String,
                    },
                    graduationYear: {
                        type: Number,
                    },
                },
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint: `Enter your most recent level of education, or the one that you currently have in progress and your expected graduation year.`,
            adminHint:
                'Allow the user to enter their most recent education and graduation year (or the one currently in progress)',
            placeholder: '',
            category: Categories.SKILLS_AND_INTERESTS,
        },
    },
    motivation: {
        schema: Schemas.motivation,
        config: {
            fieldType: FieldTypes.LONG_TEXT,
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint:
                'Why do you want to attend this event, and why should we choose you? **Please note that we regard a well-written letter of motivation very highly**, and this is a good opportunity for you to stand out from the crowd.',
            adminHint:
                'Allow the user to enter a letter of motivation for this event',
            placeholder: '',
            category: Categories.SKILLS_AND_INTERESTS,
        },
    },
    portfolio: {
        schema: Schemas.portfolio,
        config: {
            fieldType: FieldTypes.URL,
            userProfile: {
                field: 'portfolio',
                schema: {
                    type: String,
                    trim: true,
                },
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint: `Have a portfolio website or some other place where we can see the cool things you've done in the past? Let us know!`,
            adminHint:
                'Allow the user to enter a link to a portfolio website (or similar)',
            placeholder: 'https://...',
            category: Categories.LINKS,
        },
    },
    github: {
        schema: Schemas.github,
        config: {
            fieldType: FieldTypes.URL,
            userProfile: {
                field: 'github',
                schema: {
                    type: String,
                    trim: true,
                },
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint: `Do you have a public GitHub/GitLab/BitBucket/other profile you wouldn't mind us taking a look at when reviewing your application?`,
            adminHint:
                'Allow the user to enter a link to their GitHub/GitLab/BitBucket profile (or similar)',
            placeholder: 'https://...',
            category: Categories.LINKS,
        },
    },
    linkedin: {
        schema: Schemas.linkedin,
        config: {
            fieldType: FieldTypes.URL,
            userProfile: {
                field: 'linkedin',
                schema: {
                    type: String,
                    trim: true,
                },
            },
            defaultEnabled: false,
            defaultRequired: false,
            editable: true,
        },
        meta: {
            hint: `Do you have a LinkedIn profile, or similar online profile to showcase your professional experience?`,
            adminHint:
                'Allow the user to enter a link to their LinkedIn profile (or similar)',
            placeholder: 'https://...',
            category: Categories.LINKS,
        },
    },
}

module.exports = {
    Fields,
    Categories,
}
