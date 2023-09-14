import React from 'react'

import { Box } from '@material-ui/core'
import { RegistrationFields } from '@hackjunction/shared'
import TextInput from 'components/inputs/TextInput'
import TextAreaInput from 'components/inputs/TextAreaInput'
import PhoneNumberInput from 'components/inputs/PhoneNumberInput'
import JobRoleInput from 'components/inputs/JobRoleInput'
import SkillsInput from 'components/inputs/SkillsInput'
import DateInput from 'components/inputs/DateInput'
import FormControl from 'components/inputs/FormControl'
import Select from 'components/inputs/Select'
import EducationInput from 'components/inputs/EducationInput'
import BooleanInput from 'components/inputs/BooleanInput'
import RecruitmentOptionInput from 'components/inputs/RecruitmentOptionInput'
import TeamOptionInput from 'components/inputs/TeamOptionInput'
import FileInput from 'pages/_organise/slug/edit/submission/components/inputs/FileInput'
import Switch from 'pages/_organise/slug/edit/submission/components/Switch'
const { fieldTypes } = RegistrationFields
// TODO file upload

const RegistrationQuestion = ({
    field,
    form,
    config,
    required,
    autoFocus,
    isCustom,
}) => {
    const renderInput = () => {
        switch (config.fieldType.id) {
            case fieldTypes.URL.id:
            case fieldTypes.EMAIL.id:
            case fieldTypes.SHORT_TEXT.id:
                return (
                    <FormControl
                        label={config.label}
                        error={form.errors[field.name]}
                        touched={form.touched[field.name]}
                        hint={config.hint}
                    >
                        <TextInput
                            autoFocus={autoFocus}
                            name={field.name}
                            value={field.value}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                )
            case fieldTypes.PHONE_NUMBER.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <PhoneNumberInput
                            autoFocus={autoFocus}
                            value={field.value}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                            onBlur={value => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                )
            case fieldTypes.DATE.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <DateInput
                            autoFocus={autoFocus}
                            value={field.value}
                            onChange={date =>
                                form.setFieldValue(field.name, date)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                )
            case fieldTypes.GENDER.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <Select
                            autoFocus={autoFocus}
                            label={config.label}
                            value={field.value}
                            onChange={gender =>
                                form.setFieldValue(field.name, gender)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                            options="gender"
                        />
                    </FormControl>
                )
            case fieldTypes.NATIONALITY.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <Select
                            autoFocus={autoFocus}
                            label={config.label}
                            value={field.value}
                            onChange={nationality =>
                                form.setFieldValue(field.name, nationality)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                            options="nationality"
                        />
                    </FormControl>
                )
            case fieldTypes.LANGUAGES.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <Select
                            autoFocus={autoFocus}
                            label={config.label}
                            value={field.value}
                            onChange={languages =>
                                form.setFieldValue(field.name, languages)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                            options="language"
                            isMulti={true}
                        />
                    </FormControl>
                )
            case fieldTypes.COUNTRY.id:
                return (
                    <FormControl
                        autoFocus={autoFocus}
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <Select
                            autoFocus={autoFocus}
                            label={config.label}
                            value={field.value}
                            onChange={country =>
                                form.setFieldValue(field.name, country)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                            options="country"
                        />
                    </FormControl>
                )
            case fieldTypes.ROLES.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <JobRoleInput
                            autoFocus={autoFocus}
                            value={field.value}
                            onChange={roles =>
                                form.setFieldValue(field.name, roles)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                )
            case fieldTypes.SKILLS.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <SkillsInput
                            autoFocus={autoFocus}
                            value={field.value}
                            onChange={skills =>
                                form.setFieldValue(field.name, skills)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                )
            case fieldTypes.INDUSTRIES.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <Select
                            autoFocus={autoFocus}
                            label={config.label}
                            value={field.value}
                            onChange={items =>
                                form.setFieldValue(field.name, items)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                            options="industry"
                            isMulti={true}
                        />
                    </FormControl>
                )
            case fieldTypes.THEMES.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <Select
                            autoFocus={autoFocus}
                            label={config.label}
                            value={field.value}
                            onChange={items =>
                                form.setFieldValue(field.name, items)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                            options="theme"
                            isMulti={true}
                        />
                    </FormControl>
                )
            case fieldTypes.EDUCATION.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <EducationInput
                            autoFocus={autoFocus}
                            value={field.value}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                )
            case fieldTypes.LONG_TEXT.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <TextAreaInput
                            autoFocus={autoFocus}
                            name={field.name}
                            value={field.value}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                )
            case fieldTypes.NUM_HACKATHONS.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <Select
                            autoFocus={autoFocus}
                            label={config.label}
                            value={field.value}
                            onChange={items =>
                                form.setFieldValue(field.name, items)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                            options="num-hackathons"
                        />
                    </FormControl>
                )
            case fieldTypes.T_SHIRT_SIZE.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <Select
                            autoFocus={autoFocus}
                            label={config.label}
                            value={field.value}
                            onChange={items =>
                                form.setFieldValue(field.name, items)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                            options="t-shirt-size"
                        />
                    </FormControl>
                )
            case fieldTypes.BOOLEAN.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <BooleanInput
                            autoFocus={autoFocus}
                            value={field.value}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                )
            case fieldTypes.DIETARY_RESTRICTIONS.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <Select
                            autoFocus={autoFocus}
                            label={config.label}
                            options="dietary-restriction"
                            value={field.value}
                            onChange={items =>
                                form.setFieldValue(field.name, items)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                            isMulti={true}
                        />
                    </FormControl>
                )
            case fieldTypes.TEAM_OPTIONS.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <TeamOptionInput
                            autoFocus={autoFocus}
                            value={field.value}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                )
            case fieldTypes.RECRUITMENT_OPTIONS.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <RecruitmentOptionInput
                            autoFocus={autoFocus}
                            value={field.value}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                )
            default:
                return null
        }
    }

    const renderCustomInput = () => {
        switch (config.fieldType) {
            case 'text':
            case 'link':
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <input
                            autoFocus={autoFocus}
                            onBlur={() => form.setFieldTouched(field.name)}
                            onChange={e =>
                                form.setFieldValue(field.name, e.target.value)
                            }
                            placeholder={config.placeholder}
                            value={field.value}
                            className={`tw-rounded-md tw-w-full tw-max-h-full tw-bg-gray-100 tw-border-gray-300 tw-px-2 tw-py-4 tw-items-start tw-justify-start tw-text-gray-800 tw-border-solid tw-transition-all tw-duration-400 tw-border-2 hover:tw-bg-gray-300`}
                        />
                    </FormControl>
                )
            case 'textarea':
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <TextAreaInput
                            autoFocus={autoFocus}
                            name={field.name}
                            value={field.value}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                            placeholder={config.placeholder}
                            onBlur={() => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                )
            case 'boolean': {
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <Switch
                            checked={field.value}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                            checkedText="Yes"
                            uncheckedText="No"
                        />
                    </FormControl>
                )
            }
            case 'single-choice':
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-border-gray-300 tw-border-solid tw-transition-all tw-duration-400 tw-border-2 hover:tw-bg-gray-300">
                            <Select
                                autoFocus={autoFocus}
                                label={'Choose one'}
                                options={config.settings.options.map(
                                    option => ({
                                        value: option,
                                        label: option,
                                    }),
                                )}
                                value={field.value}
                                onChange={items =>
                                    form.setFieldValue(field.name, items)
                                }
                                onBlur={() => form.setFieldTouched(field.name)}
                            />
                        </div>
                    </FormControl>
                )
            case 'multiple-choice':
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-border-gray-300 tw-border-solid tw-transition-all tw-duration-400 tw-border-2 hover:tw-bg-gray-300">
                            <Select
                                autoFocus={autoFocus}
                                label={'Choose many'}
                                options={config.settings.options.map(
                                    option => ({
                                        value: option,
                                        label: option,
                                    }),
                                )}
                                value={field.value}
                                onChange={items =>
                                    form.setFieldValue(field.name, items)
                                }
                                onBlur={() => form.setFieldTouched(field.name)}
                                isMulti={true}
                            />
                        </div>
                    </FormControl>
                )
            case 'attachment':
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        {/* TODO component for file input needs to be linked to the formik fields */}
                        <FileInput
                            value={field.value}
                            handleChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                        />
                    </FormControl>
                )
            default:
                return null
        }
    }

    if (isCustom) {
        return <Box display="flex">{renderCustomInput()}</Box>
    } else {
        return <Box display="flex">{renderInput()}</Box>
    }
}

export default RegistrationQuestion
