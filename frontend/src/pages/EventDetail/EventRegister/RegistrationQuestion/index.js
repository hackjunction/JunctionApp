import React from 'react';

import { Box } from '@material-ui/core';
import { RegistrationFields } from '@hackjunction/shared';
import TextInput from 'components/inputs/TextInput';
import TextAreaInput from 'components/inputs/TextAreaInput';
import PhoneNumberInput from 'components/inputs/PhoneNumberInput';
import JobRoleInput from 'components/inputs/JobRoleInput';
import SkillsInput from 'components/inputs/SkillsInput';
import DateInput from 'components/inputs/DateInput';
import FormControl from 'components/inputs/FormControl';
import Select from 'components/inputs/Select';
const { fieldTypes } = RegistrationFields;

const RegistrationQuestion = ({ field, form, config, required, autoFocus }) => {
    const renderInput = () => {
        switch (config.fieldType.id) {
            case fieldTypes.EMAIL.id:
            case fieldTypes.URL.id:
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
                            onChange={value => form.setFieldValue(field.name, value)}
                            onBlur={() => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                );
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
                            onChange={value => form.setFieldValue(field.name, value)}
                            onBlur={value => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                );
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
                            onChange={date => form.setFieldValue(field.name, date)}
                            onBlur={() => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                );
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
                            onChange={gender => form.setFieldValue(field.name, gender)}
                            onBlur={() => form.setFieldTouched(field.name)}
                            options="gender"
                        />
                    </FormControl>
                );
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
                            onChange={nationality => form.setFieldValue(field.name, nationality)}
                            onBlur={() => form.setFieldTouched(field.name)}
                            options="nationality"
                        />
                    </FormControl>
                );
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
                            onChange={languages => form.setFieldValue(field.name, languages)}
                            onBlur={() => form.setFieldTouched(field.name)}
                            options="language"
                            isMulti={true}
                        />
                    </FormControl>
                );
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
                            onChange={country => form.setFieldValue(field.name, country)}
                            onBlur={() => form.setFieldTouched(field.name)}
                            options="country"
                        />
                    </FormControl>
                );
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
                            onChange={roles => form.setFieldValue(field.name, roles)}
                            onBlur={() => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                );
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
                            onChange={skills => form.setFieldValue(field.name, skills)}
                            onBlur={() => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                );
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
                            onChange={items => form.setFieldValue(field.name, items)}
                            onBlur={() => form.setFieldTouched(field.name)}
                            options="industry"
                            isMulti={true}
                        />
                    </FormControl>
                );
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
                            onChange={items => form.setFieldValue(field.name, items)}
                            onBlur={() => form.setFieldTouched(field.name)}
                            options="theme"
                            isMulti={true}
                        />
                    </FormControl>
                );
            case fieldTypes.EDUCATION.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <span>Education form</span>
                    </FormControl>
                );
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
                            onChange={value => form.setFieldValue(field.name, value)}
                            onBlur={() => form.setFieldTouched(field.name)}
                        />
                    </FormControl>
                );
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
                            onChange={items => form.setFieldValue(field.name, items)}
                            onBlur={() => form.setFieldTouched(field.name)}
                            options="num-hackathons"
                        />
                    </FormControl>
                );
            case fieldTypes.T_SHIRT_SIZE.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <span>T-shirt size select</span>
                    </FormControl>
                );
            case fieldTypes.BOOLEAN.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <span>Boolean here</span>
                    </FormControl>
                );
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
                            onChange={items => form.setFieldValue(field.name, items)}
                            onBlur={() => form.setFieldTouched(field.name)}
                            isMulti={true}
                        />
                    </FormControl>
                );
            case fieldTypes.TEAM_OPTIONS.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <span>Team options here</span>
                    </FormControl>
                );
            case fieldTypes.RECRUITMENT_OPTIONS.id:
                return (
                    <FormControl
                        label={config.label}
                        hint={config.hint}
                        touched={form.touched[field.name]}
                        error={form.errors[field.name]}
                    >
                        <span>Recruitment options</span>
                    </FormControl>
                );
            default:
                return null;
        }
    };

    return <Box display="flex">{renderInput()}</Box>;
};

export default RegistrationQuestion;
