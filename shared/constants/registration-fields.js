const Genders = require('../constants/genders');
const Countries = require('../constants/countries');
const Languages = require('../constants/languages');
const Industries = require('../constants/industries');
const Themes = require('../constants/themes');
const Roles = require('../constants/roles');
const Skills = require('../constants/skills');
const Misc = require('../constants/misc');
const FieldTypes = require('./field-types');
const FilterTypes = require('./filter-types');
const FilterValues = require('./filter-values');

const Categories = {
    basicDetails: {
        label: 'Basic Details',
        order: 1
    },
    skillsAndInterests: {
        label: 'Skills & Interests',
        order: 2
    },
    links: {
        label: 'Links',
        order: 3
    },
    travelAndAccommodation: {
        label: 'Travel & Accommodation',
        order: 4
    },
    recruitment: {
        label: 'Opportunities',
        order: 5
    },
    other: {
        label: 'Other',
        order: 6
    }
};

const FieldProps = {
    firstName: {
        label: 'First name',
        hint: '',
        hintMarkdown: false,
        placeholder: 'Herbert',
        fieldType: FieldTypes.SHORT_TEXT,
        colSize: 12,
        userProfileConfig: {
            type: String,
            required: true,
            trim: true
        },
        schemaConfig: {
            defaultEnable: true,
            defaultRequire: true,
            editable: false
        },
        filters: [
            {
                path: '',
                label: 'First name',
                type: FilterTypes.STRING,
                valueType: FilterValues.STRING
            }
        ]
    },
    lastName: {
        label: 'Last name',
        hint: '',
        hintMarkdown: false,
        placeholder: 'Hacker',
        colSize: 12,
        fieldType: FieldTypes.SHORT_TEXT,
        userProfileConfig: {
            type: String,
            required: true,
            trim: true
        },
        schemaConfig: {
            defaultEnable: true,
            defaultRequire: true,
            editable: false
        },
        filters: [
            {
                path: '',
                label: 'Last name',
                type: FilterTypes.STRING,
                valueType: FilterValues.STRING
            }
        ]
    },
    email: {
        label: 'Email',
        hint: '',
        hintMarkdown: false,
        placeholder: 'herbert.hacker@bighackathon.com',
        fieldType: FieldTypes.EMAIL,
        userProfileConfig: {
            type: String,
            required: true,
            trim: true
        },
        schemaConfig: {
            defaultEnable: true,
            defaultRequire: true,
            editable: false
        },
        filters: [
            {
                path: '',
                label: 'Email',
                type: FilterTypes.STRING,
                valueType: FilterValues.STRING
            }
        ]
    },
    phoneNumber: {
        label: 'Phone number',
        hint: '',
        hintMarkdown: false,
        fieldType: FieldTypes.PHONE_NUMBER,
        userProfileConfig: {
            country_code: {
                type: String,
                enum: Countries.asArrayOfPhoneCodes
            },
            number: String
        },
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        }
    },
    dateOfBirth: {
        label: 'Date of Birth',
        hint: 'Please note that you must be at least 16 years old to register for this event',
        hintMarkdown: false,
        placeholder: 'Select date',
        fieldType: FieldTypes.DATE,
        userProfileConfig: {
            type: Date
        },
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        },
        filters: [
            {
                path: '',
                label: 'Date of birth',
                type: FilterTypes.DATE,
                valueType: FilterValues.DATE
            }
        ]
    },
    gender: {
        label: 'Gender',
        hint: '',
        hintMarkdown: false,
        fieldType: FieldTypes.GENDER,
        userProfileConfig: {
            type: String,
            enum: Genders
        },
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        },
        filters: [
            {
                path: '',
                label: 'Gender',
                type: FilterTypes.STRING,
                valueType: FilterValues.GENDER
            }
        ]
    },
    nationality: {
        label: 'Nationality',
        hint: '',
        hintMarkdown: false,
        fieldType: FieldTypes.NATIONALITY,
        userProfileConfig: {
            type: String,
            enum: Countries.asArrayOfNationalities
        },
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        },
        filters: [
            {
                path: '',
                label: 'Nationality',
                type: FilterTypes.STRING,
                valueType: FilterValues.NATIONALITY
            }
        ]
    },
    spokenLanguages: {
        label: 'Spoken languages',
        hint: 'Select all languages that you speak with working proficiency',
        hintMarkdown: false,
        fieldType: FieldTypes.LANGUAGES,
        userProfileConfig: [
            {
                type: String,
                enum: Languages.asArrayOfNames
            }
        ],
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        },
        filters: [
            {
                path: '',
                label: 'Spoken languages',
                type: FilterTypes.ARRAY,
                valueType: FilterValues.LANGUAGE
            }
        ]
    },
    countryOfResidence: {
        label: 'Country of residence',
        hint: 'Which country are you currently living in?',
        hintMarkdown: false,
        fieldType: FieldTypes.COUNTRY,
        userProfileConfig: {
            type: String,
            enum: Countries.asArrayOfName
        },
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        },
        filters: [
            {
                path: '',
                label: 'Country of Residence',
                type: FilterTypes.STRING,
                valueType: FilterValues.COUNTRY
            }
        ]
    },
    cityOfResidence: {
        label: 'City of residence',
        hint: 'Which city are you currently living in?',
        hintMarkdown: false,
        placeholder: 'Hackerville',
        fieldType: FieldTypes.SHORT_TEXT,
        userProfileConfig: {
            type: String,
            trim: true
        },
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        }
    },
    tShirtSize: {
        label: 'T-shirt size',
        hint: '',
        hintMarkdown: false,
        fieldType: FieldTypes.T_SHIRT_SIZE,
        userProfileConfig: {
            type: String,
            enum: Misc.tShirtSizes
        },
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        }
    },
    dietaryRestrictions: {
        label: 'Dietary Restrictions',
        hint:
            'Please select all dietary restrictions from the below list that apply to you - if none of the available options apply, you can leave this field empty.',
        hintMarkdown: false,
        fieldType: FieldTypes.DIETARY_RESTRICTIONS,
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        }
    },
    roles: {
        label: 'Roles',
        hint:
            'Add up to 5 roles you have working experience in. You can type into the field to search for a specific role, or filter by category by typing "Design", "Dev", "Business" or "Other".',
        hintMarkdown: false,
        fieldType: FieldTypes.ROLES,
        userProfileConfig: [
            {
                role: {
                    type: String,
                    enum: Roles.items
                },
                level: {
                    type: Number,
                    min: 1,
                    max: 5
                }
            }
        ],
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        }
    },
    skills: {
        label: 'Skills',
        hint: `
            Add up to 10 skills you consider yourself to be proficient at. Choose a level of experience that best describes your current
            level of proficiency in that skill. You can click on the experience level options to see the description for that level. 
            The skills are divided into four categories: Abstract Skills, Programming Languages, Programming Frameworks & Tools and Tools & Software - 
            you can type the name of a category to only see skills related to that category.
        `,
        hintMarkdown: false,
        fieldType: FieldTypes.SKILLS,
        userProfileConfig: {
            skill: {
                type: String,
                enum: Skills.items
            },
            level: {
                type: Number,
                min: 1,
                max: 5
            }
        },
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        }
    },
    industriesOfInterest: {
        label: 'Industries of Interest',
        hint: 'Choose up to 3 industries that are the most interesting to you',
        hintMarkdown: false,
        fieldType: FieldTypes.INDUSTRIES,
        userProfileConfig: [
            {
                type: String,
                enum: Industries.industries
            }
        ],
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        }
    },
    themesOfInterest: {
        label: 'Themes of Interest',
        hint: 'Choose up to 3 themes that are the most interesting to you',
        hintMarkdown: false,
        fieldType: FieldTypes.THEMES,
        userProfileConfig: [
            {
                type: String,
                enum: Themes.themes
            }
        ],
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        }
    },
    numHackathons: {
        label: 'Number of hackathons attended',
        hint:
            "Not your first hackathon? Let us know! But don't worry if it is, we always accept also people who've never attended hackathons before.",
        hintMarkdown: false,
        fieldType: FieldTypes.NUM_HACKATHONS,
        userProfileConfig: {
            type: Number
        },
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        }
    },
    education: {
        label: 'Education',
        hint:
            'Select your most recent education, or the one that you currently have in progress and your expected graduation year.',
        hintMarkdown: false,
        fieldType: FieldTypes.EDUCATION,
        userProfileConfig: {
            level: String,
            university: String,
            degree: String,
            graduationYear: Number
        },
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        }
    },
    motivation: {
        label: 'Motivation',
        hint:
            'Why do you want to be accepted to this hackathon, and why should we choose you? **Please note that we regard a well-written letter of motivation very highly when reviewing applications.**',
        hintMarkdown: true,
        fieldType: FieldTypes.LONG_TEXT,
        schemaConfig: {
            defaultEnable: false,
            defaultRequired: false,
            editable: true
        },
        filters: [
            {
                path: '',
                label: 'Motivation',
                type: FilterTypes.STRING,
                valueType: FilterValues.STRING
            }
        ]
    },
    portfolio: {
        label: 'Link to Portfolio',
        hint:
            "Have a portfolio website or some other place where we can see the cool things you've done in the past? Please provide a valid link beginning with https://, or http:// if you must",
        hintMarkdown: false,
        fieldType: FieldTypes.URL,
        userProfileConfig: {
            type: String,
            trim: true
        },
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        },
        filters: [
            {
                path: '',
                label: 'Link to Portfolio',
                type: FilterTypes.STRING,
                valueType: FilterValues.STRING
            }
        ]
    },
    github: {
        label: 'Link to Github',
        hint:
            "Do you have a public GitHub/GitLab/BitBucket/other profile you wouldn't mind us taking a look at when reviewing your application?",
        hintMarkdown: false,
        fieldType: FieldTypes.URL,
        userProfileConfig: {
            type: String,
            trim: true
        },
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        },
        filters: [
            {
                path: '',
                label: 'Link to GitHub',
                type: FilterTypes.STRING,
                valueType: FilterValues.STRING
            }
        ]
    },
    linkedin: {
        label: 'LinkedIn Profile',
        hint: 'Do you have a LinkedIn or similar online profile to showcase your professional experience?',
        hintMarkdown: false,
        fieldType: FieldTypes.URL,
        userProfileConfig: {
            type: String,
            trim: true
        },
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        },
        filters: [
            {
                path: '',
                label: 'LinkedIn profile',
                type: FilterTypes.STRING,
                valueType: FilterValues.STRING
            }
        ]
    },
    countryOfTravel: {
        label: 'Country of Travel',
        hint:
            "Where would you be travelling to the event from? If you're travelling from far away, make sure you apply for a travel grant - we would love to cover a part of your travel costs.",
        hintMarkdown: false,
        fieldType: FieldTypes.COUNTRY,
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        },
        filters: [
            {
                path: '',
                label: 'Country of Travel',
                type: FilterTypes.STRING,
                valueType: FilterValues.COUNTRY
            }
        ]
    },
    cityOfTravel: {
        label: 'City of Travel',
        hint: 'Which city are you travelling from?',
        hintMarkdown: false,
        fieldType: FieldTypes.SHORT_TEXT,
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        },
        filters: [
            {
                path: '',
                label: 'City of Travel',
                type: FilterTypes.STRING,
                valueType: FilterValues.STRING
            }
        ]
    },
    needsVisa: {
        label: 'Do you need a visa?',
        hint:
            'Do you need a visa to travel to the event? If you do, we will provide you with an invitation letter to make sure you get one. You can check e.g. [here](https://www.passportindex.org/comparebyPassport.php) if you need a visa to travel to the event.',
        hintMarkdown: true,
        fieldType: FieldTypes.BOOLEAN,
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        },
        filters: [
            {
                path: '',
                label: 'Link to Portfolio',
                type: FilterTypes.STRING,
                valueType: FilterValues.STRING
            }
        ]
    },
    needsTravelGrant: {
        label: 'Do you want to apply for a travel grant?',
        hint:
            "We can't cover all of your travel costs, but we offer the following travel grants for people travelling to the event from farther away: \n\n" +
            '- Finland (outside Greater Helsinki Region): 20€ \n' +
            '- Baltics: 40€ \n' +
            '- Nordics & Russia: 60€ \n' +
            '- Rest of Europe: 80€ \n' +
            '- Outside of Europe: 150€',
        hintMarkdown: true,
        fieldType: FieldTypes.BOOLEAN,
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        },
        filters: [
            {
                path: '',
                label: 'Applied for travel grant',
                type: FilterTypes.BOOLEAN,
                valueType: FilterValues.BOOLEAN
            }
        ]
    },
    needsAccommodation: {
        label: 'Do you need free accommodation?',
        hint:
            'We can provide a warm space and a roof over your head during the event, where you will need your own sleeping bag and matress. Let us know if you need it, or if you will arrange your own accommodation during the event :)',
        hintMarkdown: false,
        fieldType: FieldTypes.BOOLEAN,
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        },
        filters: [
            {
                path: '',
                label: 'Needs accommodation',
                type: FilterTypes.BOOLEAN,
                valueType: FilterValues.BOOLEAN
            }
        ]
    },
    recruitmentOptions: {
        label: 'Job opportunities',
        hint: '',
        fieldType: FieldTypes.RECRUITMENT_OPTIONS,
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        }
    },
    teamOptions: {
        label: 'Applying as a team?',
        hint:
            '' +
            'If you want to apply as a team, we will review your team as a whole, \n' +
            "and accept all team members even if some of them wouldn't get accepted on their own.\n\n" +
            'Please note: \n' +
            '- If you choose to apply as a team, **we will NOT review your application** before you have configured your team on the Event Dashboard after submitting your registration \n' +
            '- All team members will have to fill the application form individually, after which you can add the people to your team \n\n' +
            'If you do apply as a team, you can also choose to apply individually in the case that your team is not accepted. \n',
        hintMarkdown: true,
        fieldType: FieldTypes.TEAM_OPTIONS,
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        },
        filters: [
            {
                path: 'applyAsTeam',
                label: 'Team > Applied as team',
                type: FilterTypes.BOOLEAN,
                valueType: FilterValues.BOOLEAN
            },
            {
                path: 'applyAlone',
                label: 'Team > Applied also alone',
                type: FilterTypes.BOOLEAN,
                valueType: FilterValues.BOOLEAN
            }
        ]
    },
    secretCode: {
        label: 'Secret code',
        hint:
            "If you've received a secret code for this event, enter it here. Note: this is not the same as your team code, which you will be able to enter after completing your registration.",
        hintMarkdown: false,
        fieldType: FieldTypes.SHORT_TEXT,
        schemaConfig: {
            defaultEnable: false,
            defaultRequire: false,
            editable: true
        },
        filters: [
            {
                path: '',
                label: 'Secret Code',
                type: FilterTypes.STRING,
                valueType: FilterValues.STRING
            }
        ]
    }
};

const Fields = {
    firstName: {
        ...FieldProps.firstName,
        category: Categories.basicDetails,
        default: (userProfile, idToken) => userProfile.firstName || idToken.given_name || '',
        validator: (joi, required) => {
            const allowArgs = [];
            if (!required) allowArgs.push('');
            return joi
                .string()
                .max(100)
                .allow(...allowArgs)
                .label(FieldProps.firstName.label);
        }
    },
    lastName: {
        ...FieldProps.lastName,
        category: Categories.basicDetails,
        default: (userProfile, idToken) => userProfile.lastName || idToken.family_name || '',
        validator: (joi, required) => {
            const allowArgs = [];
            if (!required) allowArgs.push('');
            return joi
                .string()
                .max(100)
                .allow(...allowArgs)
                .label(FieldProps.lastName.label);
        }
    },
    email: {
        ...FieldProps.email,
        category: Categories.basicDetails,
        default: (userProfile, idToken) => userProfile.email || idToken.email || '',
        validator: (joi, required) => {
            const allowArgs = [];
            if (!required) allowArgs.push('');
            return joi
                .string()
                .email()
                .allow(...allowArgs)
                .label(FieldProps.email.label);
        }
    },
    phoneNumber: {
        ...FieldProps.phoneNumber,
        category: Categories.basicDetails,
        default: (userProfile, idToken) => userProfile.phoneNumber || undefined,
        validator: (joi, required) => {
            const allowArgs = [];
            if (!required) {
                allowArgs.push('');
            }
            return joi
                .object()
                .allow(...allowArgs)
                .keys({
                    country_code: joi.string().valid(Countries.asArrayOfPhoneCodes),
                    number: joi
                        .string()
                        .regex(/^[0-9]{7,14}$/)
                        .label('Phone number')
                })
                .label(FieldProps.phoneNumber.label);
        }
    },
    dateOfBirth: {
        ...FieldProps.dateOfBirth,
        category: Categories.basicDetails,
        default: (userProfile, idToken) => userProfile.dateOfBirth || undefined,
        validator: (joi, required) =>
            joi
                .date()
                .max(Date.now() - 1000 * 60 * 60 * 24 * 364 * 16)
                .min(Date.now() - 1000 * 60 * 60 * 24 * 365 * 120)
                .label(FieldProps.dateOfBirth.label)
    },
    gender: {
        ...FieldProps.gender,
        category: Categories.basicDetails,
        default: (userProfile, idToken) => userProfile.gender || undefined,
        validator: (joi, required) =>
            joi
                .any()
                .valid(Genders)
                .label(FieldProps.gender.label)
    },
    nationality: {
        ...FieldProps.nationality,
        category: Categories.basicDetails,
        default: (userProfile, idToken) => userProfile.nationality || undefined,
        validator: (joi, required) =>
            joi
                .any()
                .valid(Countries.asArrayOfNationalities)
                .label(FieldProps.nationality.label)
    },
    spokenLanguages: {
        ...FieldProps.spokenLanguages,
        category: Categories.basicDetails,
        default: (userProfile, idToken) => userProfile.spokenLanguages || [],
        validator: (joi, required) => {
            return joi
                .array()
                .min(required ? 1 : 0)
                .items(joi.any().valid(Languages.asArrayOfNames))
                .label(FieldProps.spokenLanguages.label);
        }
    },
    countryOfResidence: {
        ...FieldProps.countryOfResidence,
        category: Categories.basicDetails,
        default: (userProfile, idToken) => userProfile.countryOfResidence || idToken.country || '',
        validator: (joi, required) =>
            joi
                .any()
                .valid(Countries.asArrayOfName)
                .label(FieldProps.countryOfResidence.label)
    },
    cityOfResidence: {
        ...FieldProps.cityOfResidence,
        category: Categories.basicDetails,
        default: (userProfile, idToken) => userProfile.cityOfResidence || idToken.city || '',
        validator: (joi, required) => {
            const allowArgs = [];
            if (!required) allowArgs.push('');
            return joi
                .string()
                .max(100)
                .allow(...allowArgs)
                .label(FieldProps.cityOfResidence.label);
        }
    },
    tShirtSize: {
        ...FieldProps.tShirtSize,
        category: Categories.basicDetails,
        default: userProfile => userProfile.tShirtSize || undefined,
        validator: joi => {
            return joi
                .any()
                .allow(Misc.tShirtSizes)
                .label(FieldProps.tShirtSize.label);
        }
    },
    dietaryRestrictions: {
        ...FieldProps.dietaryRestrictions,
        category: Categories.basicDetails,
        default: () => [],
        validator: (joi, required) => {
            return joi
                .array()
                .min(required ? 1 : 0)
                .items(joi.any().valid(Misc.dietaryRestrictions))
                .label(FieldProps.dietaryRestrictions.label);
        }
    },
    roles: {
        ...FieldProps.roles,
        category: Categories.skillsAndInterests,
        default: () => [],
        validator: (joi, required) =>
            joi
                .array()
                .min(required ? 1 : 0)
                .items(
                    joi
                        .object()
                        .keys({
                            role: joi
                                .any()
                                .valid(Roles.items)
                                .label('Role'),
                            years: joi
                                .number()
                                .min(1)
                                .max(5)
                                .label('Years of experience')
                        })
                        .label('Role')
                )
                .max(5)
                .label(FieldProps.roles.label)
    },
    skills: {
        ...FieldProps.skills,
        category: Categories.skillsAndInterests,
        default: (userProfile, idToken) => userProfile.skills || [],
        validator: (joi, required) =>
            joi
                .array()
                .min(required ? 1 : 0)
                .max(10)
                .items(
                    joi
                        .object()
                        .keys({
                            skill: joi.any().valid(Skills.items),
                            level: joi
                                .number()
                                .min(1)
                                .max(5)
                        })
                        .unknown()
                )
                .label(FieldProps.skills.label)
    },
    motivation: {
        ...FieldProps.motivation,
        category: Categories.skillsAndInterests,
        default: (userProfile, idToken) => '',
        validator: (joi, required) => {
            const allowArgs = [];
            if (!required) allowArgs.push('');

            return joi
                .string()
                .max(2000)
                .allow(...allowArgs)
                .label(FieldProps.motivation.label);
        }
    },
    industriesOfInterest: {
        ...FieldProps.industriesOfInterest,
        category: Categories.skillsAndInterests,
        default: (userProfile, idToken) => userProfile.industriesOfInterest || [],
        validator: (joi, required) =>
            joi
                .array()
                .min(required ? 1 : 0)
                .items(joi.any().valid(Industries.industries))
                .max(3)
                .label(FieldProps.industriesOfInterest.label)
    },
    themesOfInterest: {
        ...FieldProps.themesOfInterest,
        category: Categories.skillsAndInterests,
        default: (userProfile, idToken) => userProfile.themesOfInterest || [],
        validator: (joi, required) =>
            joi
                .array()
                .min(required ? 1 : 0)
                .items(joi.any().valid(Themes.themes))
                .max(3)
                .label(FieldProps.themesOfInterest.label)
    },
    numHackathons: {
        ...FieldProps.numHackathons,
        category: Categories.skillsAndInterests,
        default: (userProfile, idToken) => userProfile.numHackathons || undefined,
        validator: (joi, required) =>
            joi
                .number()
                .min(0)
                .max(5)
                .label(FieldProps.numHackathons.label)
    },
    education: {
        ...FieldProps.education,
        category: Categories.skillsAndInterests,
        default: (userProfile, idToken) => userProfile.education || undefined,
        validator: (joi, required) =>
            joi
                .object()
                .keys({
                    level: joi
                        .string()
                        .label('Level of Education')
                        .required(),
                    university: joi.string().label('University'),
                    degree: joi.string().label('Degree'),
                    graduationYear: joi.number().label('Graduation year')
                })
                .optional()
                .unknown()
                .allow({})
                .label('Education')
    },
    portfolio: {
        ...FieldProps.portfolio,
        category: Categories.links,
        default: (userProfile, idToken) => userProfile.portfolio || undefined,
        validator: (joi, required) =>
            joi
                .string()
                .uri()
                .label(FieldProps.portfolio.label)
    },
    github: {
        ...FieldProps.github,
        category: Categories.links,
        default: (userProfile, idToken) => userProfile.github || undefined,
        validator: (joi, required) =>
            joi
                .string()
                .uri()
                .label(FieldProps.github.label)
    },
    linkedin: {
        ...FieldProps.linkedin,
        category: Categories.links,
        default: (userProfile, idToken) => userProfile.linkedin || undefined,
        validator: (joi, required) =>
            joi
                .string()
                .uri()
                .label(FieldProps.linkedin.label)
    },
    countryOfTravel: {
        ...FieldProps.countryOfTravel,
        category: Categories.travelAndAccommodation,
        default: userProfile => userProfile.countryOfResidence || undefined,
        validator: joi =>
            joi
                .any()
                .valid(Countries.asArrayOfName)
                .label(FieldProps.countryOfTravel.label)
    },
    cityOfTravel: {
        ...FieldProps.cityOfTravel,
        category: Categories.travelAndAccommodation,
        default: userProfile => userProfile.cityOfResidence || undefined,
        validator: (joi, required) => {
            const allowArgs = required ? [] : [''];
            return joi
                .string()
                .allow(...allowArgs)
                .max(100)
                .label(FieldProps.cityOfTravel.label);
        }
    },
    needsVisa: {
        ...FieldProps.needsVisa,
        category: Categories.travelAndAccommodation,
        default: () => false,
        validator: (joi, required) => joi.boolean().label(FieldProps.needsVisa.label)
    },
    needsTravelGrant: {
        ...FieldProps.needsTravelGrant,
        category: Categories.travelAndAccommodation,
        default: () => false,
        validator: (joi, required) => joi.boolean().label(FieldProps.needsTravelGrant.label)
    },
    needsAccommodation: {
        ...FieldProps.needsAccommodation,
        category: Categories.travelAndAccommodation,
        default: () => false,
        validator: (joi, required) => joi.boolean().label(FieldProps.needsAccommodation.label)
    },
    teamOptions: {
        ...FieldProps.teamOptions,
        category: Categories.other,
        default: () => {},
        validator: joi =>
            joi
                .object()
                .keys({
                    applyAsTeam: joi.boolean(),
                    applyAlone: joi.boolean()
                })
                .unknown()
                .label(FieldProps.teamOptions.label)
    },
    secretCode: {
        ...FieldProps.secretCode,
        category: Categories.other,
        default: () => '',
        validator: joi =>
            joi
                .string()
                .allow('')
                .max(500)
                .label(FieldProps.secretCode.label)
    },
    recruitmentOptions: {
        ...FieldProps.recruitmentOptions,
        category: Categories.recruitment,
        default: () => {},
        validator: joi =>
            joi
                .object()
                .keys({
                    status: joi.string(),
                    consent: joi.boolean(),
                    relocation: joi.string()
                })
                .unknown()
                .label(FieldProps.recruitmentOptions.label)
    }
};

function buildFieldToLabelMap() {
    const result = {};

    Object.keys(Fields).forEach(fieldName => {
        result[fieldName] = Fields[fieldName].label;
    });

    return result;
}

function buildFiltersArray() {
    const fields = Object.keys(Fields);
    const baseFilters = [
        {
            path: 'rating',
            label: 'Rating',
            type: FilterTypes.NUMBER,
            valueType: FilterValues.NUMBER
        },
        {
            path: 'status',
            label: 'Status',
            type: FilterTypes.STRING,
            valueType: FilterValues.STATUS
        },
        {
            path: 'tags',
            label: 'Tags',
            type: FilterTypes.ARRAY,
            valueType: FilterValues.TAG
        }
    ];
    const answerFilters = fields.reduce((res, fieldKey) => {
        const field = Fields[fieldKey];
        if (!Array.isArray(field.filters) || !field.filters.length) return res;
        const filters = field.filters.map(filter => {
            if (filter.path.length) {
                filter.path = `answers.${fieldKey}.${filter.path}`;
            } else {
                filter.path = `answers.${fieldKey}`;
            }
            return filter;
        });
        return res.concat(filters);
    }, []);

    return baseFilters.concat(answerFilters);
}

const Helpers = {
    getLabel: field => {
        if (Fields.hasOwnProperty(field)) {
            return Fields[field].label || field;
        }
        return field;
    },
    getFields: () => Fields,
    getField: field => Fields[field],
    getFieldType: field => (Fields[field] ? Fields[field].fieldType.id : null),
    filters: buildFiltersArray(),
    fieldToLabelMap: buildFieldToLabelMap(),
    fieldTypes: FieldTypes,
    getCategory: field => {
        if (Fields.hasOwnProperty(field)) {
            return Fields[field].category.label;
        }
        return '';
    },
    getDefaultValue: (field, userProfile, idToken) => {
        if (Fields.hasOwnProperty(field)) {
            return Fields[field].default(userProfile, idToken);
        }
        return null;
    },
    getDefaultValueCustom: question => {
        if (['boolean', 'checkbox'].indexOf(question.fieldType) !== -1) {
            return question.settings.default || false;
        }
    },
    getDefaultValuesFromConfig: (config, customQuestions, userProfile, idToken) => {
        const result = {};

        Object.keys(config).forEach(field => {
            if (config[field].enable) {
                result[field] = Helpers.getDefaultValue(field, userProfile, idToken);
            }
        });

        customQuestions.forEach(customSection => {
            customSection.questions.forEach(question => {
                result[question.name] = Helpers.getDefaultValueCustom(question);
            });
        });

        return result;
    },
    getDefaultValuesForFields: (fields, userProfile, idToken) => {
        const result = {};

        fields.forEach(field => {
            result[field] = Helpers.getDefaultValue(field, userProfile, idToken);
        });

        return result;
    },
    getValidator: (joi, field, required) => {
        if (!joi) {
            throw new Error('Must pass an instance of joi to getValidator');
        }
        if (Fields.hasOwnProperty(field) && typeof Fields[field].validator === 'function') {
            return Fields[field].validator(joi, required);
        } else {
            return joi.any();
        }
    },
    getCategoryOrderByLabel: categoryLabel => {
        for (let categoryId of Object.keys(Categories)) {
            const category = Categories[categoryId];
            if (category.label === categoryLabel) {
                return category.order;
            }
        }
        return 1000;
    }
};

module.exports = Helpers;
