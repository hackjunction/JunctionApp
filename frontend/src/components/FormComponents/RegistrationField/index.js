import React from 'react';
import styles from './RegistrationField.module.scss';

import joi from 'joi-browser';
import moment from 'moment';

import FormikField from '../FormikField';
import DatePicker from '../DatePicker';
import GenderSelect from '../GenderSelect';
import NationalitySelect from '../NationalitySelect';
import LanguageSelect from '../LanguageSelect';
import CountrySelect from '../CountrySelect';
import PhoneNumberInput from '../PhoneNumberInput/index';
import SkillsForm from '../SkillsForm';
import IndustrySelect from '../IndustrySelect';
import ThemeSelect from '../ThemeSelect';
import EducationForm from '../EducationForm';
import JobRoleForm from '../JobRoleForm';
import BooleanField from '../BooleanField';

import TextInput from 'components/inputs/TextInput';

import { RegistrationFields, RegistrationValidator, Misc } from '@hackjunction/shared';
import NumHackathonsSelect from 'components/FormComponents/NumHackathonsSelect';
import TShirtSizeSelect from 'components/FormComponents/TShirtSizeSelect';
import DietaryRestrictionsSelect from 'components/FormComponents/DietaryRestrictionSelect';
import TeamOptionForm from 'components/FormComponents/TeamOptionForm';
import RecruitmentOptionForm from 'components/FormComponents/RecruitmentOptionForm';
const { fieldTypes } = RegistrationFields;
const Validator = new RegistrationValidator(joi, false);

const RegistrationField = React.memo(({ name, required, isFast, fieldConfig }) => {
    if (!fieldConfig) {
        return null;
    }

    const renderInputForField = ({ field, form }) => {
        switch (fieldConfig.fieldType.id) {
            case fieldTypes.SHORT_TEXT.id:
                return <TextInput {...field} placeholder={fieldConfig.placeholder} rawOnChange />;
            case fieldTypes.EMAIL.id:
                return <TextInput {...field} placeholder={fieldConfig.placeholder} rawOnChange />;
            case fieldTypes.PHONE_NUMBER.id:
                return (
                    <PhoneNumberInput
                        value={field.value}
                        name={field.name}
                        onBlur={field.onBlur}
                        setFieldValue={form.setFieldValue}
                        setFieldTouched={form.setFieldTouched}
                        validateField={form.validateField}
                        touched={form.touched[field.name]}
                    />
                );
            case fieldTypes.DATE.id:
                return (
                    <DatePicker
                        value={field.value}
                        name={field.name}
                        setFieldValue={form.setFieldValue}
                        setFieldTouched={form.setFieldTouched}
                        validateField={form.validateField}
                        touched={form.touched[field.name]}
                        placeholder={fieldConfig.placeholder}
                    />
                );
            case fieldTypes.GENDER.id:
                return (
                    <GenderSelect
                        value={field.value}
                        name={field.name}
                        validateField={form.validateField}
                        setFieldTouched={form.setFieldTouched}
                        setFieldValue={form.setFieldValue}
                        touched={form.touched[field.name]}
                    />
                );
            case fieldTypes.NATIONALITY.id:
                return (
                    <NationalitySelect
                        value={field.value}
                        name={field.name}
                        validateField={form.validateField}
                        setFieldTouched={form.setFieldTouched}
                        setFieldValue={form.setFieldValue}
                        touched={form.touched[field.name]}
                    />
                );
            case fieldTypes.LANGUAGES.id:
                return (
                    <LanguageSelect
                        value={field.value}
                        name={field.name}
                        onBlur={field.onBlur}
                        setFieldValue={form.setFieldValue}
                    />
                );
            case fieldTypes.COUNTRY.id:
                return (
                    <CountrySelect
                        value={field.value}
                        name={field.name}
                        validateField={form.validateField}
                        setFieldTouched={form.setFieldTouched}
                        setFieldValue={form.setFieldValue}
                        touched={form.touched[field.name]}
                    />
                );
            case fieldTypes.ROLES.id:
                return (
                    <JobRoleForm
                        value={field.value}
                        name={field.name}
                        validateField={form.validateField}
                        setFieldTouched={form.setFieldTouched}
                        setFieldValue={form.setFieldValue}
                        touched={form.touched[field.name]}
                    />
                );
            case fieldTypes.SKILLS.id:
                return (
                    <SkillsForm
                        value={field.value}
                        name={field.name}
                        validateField={form.validateField}
                        setFieldTouched={form.setFieldTouched}
                        setFieldValue={form.setFieldValue}
                        touched={form.touched[field.name]}
                    />
                );
            case fieldTypes.INDUSTRIES.id:
                return (
                    <IndustrySelect
                        value={field.value}
                        name={field.name}
                        validateField={form.validateField}
                        setFieldTouched={form.setFieldTouched}
                        setFieldValue={form.setFieldValue}
                        touched={form.touched[field.name]}
                    />
                );
            case fieldTypes.THEMES.id:
                return (
                    <ThemeSelect
                        value={field.value}
                        name={field.name}
                        validateField={form.validateField}
                        setFieldTouched={form.setFieldTouched}
                        setFieldValue={form.setFieldValue}
                        touched={form.touched[field.name]}
                    />
                );
            case fieldTypes.EDUCATION.id:
                return (
                    <EducationForm
                        value={field.value}
                        name={field.name}
                        validateField={form.validateField}
                        setFieldTouched={form.setFieldTouched}
                        setFieldValue={form.setFieldValue}
                        touched={form.touched[field.name]}
                    />
                );
            case fieldTypes.LONG_TEXT.id:
                return <span>TEXT AREA!</span>;
            // return (
            //     <Input.TextArea
            //         {...field}
            //         autosize={{ minRows: 5, maxRows: 15 }}
            //         placeholder={fieldConfig.placeholder}
            //     />
            // );
            case fieldTypes.NUM_HACKATHONS.id:
                return (
                    <NumHackathonsSelect
                        value={field.value}
                        name={field.name}
                        validateField={form.validateField}
                        setFieldTouched={form.setFieldTouched}
                        setFieldValue={form.setFieldValue}
                        touched={form.touched[field.name]}
                    />
                );
            case fieldTypes.T_SHIRT_SIZE.id:
                return (
                    <TShirtSizeSelect
                        value={field.value}
                        name={field.name}
                        setFieldValue={form.setFieldValue}
                        validateField={form.validateField}
                        setFieldTouched={form.setFieldTouched}
                        touched={form.touched[field.name]}
                    />
                );
            case fieldTypes.URL.id:
                return <TextInput {...field} placeholder="https://" />;
            case fieldTypes.BOOLEAN.id:
                return (
                    <BooleanField
                        value={field.value}
                        name={field.name}
                        setFieldValue={form.setFieldValue}
                        validateField={form.validateField}
                        setFieldTouched={form.setFieldTouched}
                        touched={form.touched[field.name]}
                    />
                );
            case fieldTypes.DIETARY_RESTRICTIONS.id:
                return (
                    <DietaryRestrictionsSelect
                        value={field.value}
                        name={field.name}
                        setFieldValue={form.setFieldValue}
                        validateField={form.validateField}
                        setFieldTouched={form.setFieldTouched}
                        touched={form.touched[field.name]}
                    />
                );
            case fieldTypes.TEAM_OPTIONS.id:
                return (
                    <TeamOptionForm
                        value={field.value}
                        name={field.name}
                        setFieldValue={form.setFieldValue}
                        validateField={form.validateField}
                        setFieldTouched={form.setFieldTouched}
                        touched={form.touched[field.name]}
                    />
                );
            case fieldTypes.RECRUITMENT_OPTIONS.id:
                return (
                    <RecruitmentOptionForm
                        value={field.value}
                        name={field.name}
                        setFieldValue={form.setFieldValue}
                        validateField={form.validateField}
                        setFieldTouched={form.setFieldTouched}
                        touched={form.touched[field.name]}
                    />
                );
            default:
                return null;
        }
    };

    const renderValueForField = value => {
        switch (fieldConfig.fieldType.id) {
            case fieldTypes.DATE.id: {
                return moment(value).format('MMM Do, YYYY');
            }
            case fieldTypes.ROLES.id: {
                const mapped = value.map(role => role.role);
                if (mapped.length < 3) {
                    return mapped.join(', ');
                } else {
                    return `${mapped.slice(0, 2).join(', ')} and ${mapped.length - 2} more`;
                }
            }
            case fieldTypes.SKILLS.id: {
                const mapped = value.map(skill => skill.skill);
                if (mapped.length < 3) {
                    return mapped.join(', ');
                } else {
                    return `${mapped.slice(0, 2).join(', ')} and ${mapped.length - 2} more`;
                }
            }
            case fieldTypes.INDUSTRIES.id: {
                if (value.length < 3) {
                    return value.join(', ');
                } else {
                    return `${value.slice(0, 2).join(', ')} and ${value.length - 2} more`;
                }
            }
            case fieldTypes.THEMES.id: {
                if (value.length < 3) {
                    return value.join(', ');
                } else {
                    return `${value.slice(0, 2).join(', ')} and ${value.length - 2} more`;
                }
            }
            case fieldTypes.EDUCATION.id: {
                if (value) {
                    return value.level + (value.degree ? `, ${value.degree}` : '');
                } else {
                    return '';
                }
            }
            case fieldTypes.LANGUAGES.id: {
                if (value.length < 3) {
                    return value.join(', ');
                } else {
                    return `${value.slice(0, 2).join(', ')} and ${value.length - 2} more`;
                }
            }
            case fieldTypes.LONG_TEXT.id: {
                if (value.length > 100) {
                    return value.slice(0, 100) + '...';
                }
                return value;
            }
            case fieldTypes.PHONE_NUMBER.id: {
                if (value) {
                    return value.country_code + ' ' + value.number;
                }
                return '';
            }
            case fieldTypes.NUM_HACKATHONS.id: {
                if (value) {
                    return Misc.numHackathonOptions.getLabelForValue(value);
                }
                return '';
            }
            case fieldTypes.BOOLEAN.id: {
                if (value === true) {
                    return 'Yes';
                }
                if (value === false) {
                    return 'No';
                }
                return '';
            }
            case fieldTypes.DIETARY_RESTRICTIONS.id: {
                if (value) {
                    if (value.length < 3) {
                        return value.join(', ');
                    } else {
                        return `${value.slice(0, 2).join(', ')} and ${value.length - 2} more`;
                    }
                }
                return '';
            }
            case fieldTypes.TEAM_OPTIONS.id: {
                if (value) {
                    if (value.applyAsTeam === true) {
                        return 'Yes';
                    }
                    if (value.applyAsTeam === false) {
                        return 'No';
                    }
                }
                return '';
            }
            case fieldTypes.RECRUITMENT_OPTIONS.id: {
                return '';
            }
            default:
                return value;
        }
    };

    return (
        <FormikField
            name={name}
            hint={fieldConfig.hint}
            hintMarkdown={fieldConfig.hintMarkdown}
            label={fieldConfig.label}
            isFast={isFast}
            required={required}
            validate={Validator.validate(name, required)}
            alwaysFocused={fieldConfig.alwaysFocused || false}
            render={renderInputForField}
            renderValue={renderValueForField}
        />
    );
});

export default RegistrationField;
