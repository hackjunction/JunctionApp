import React, { useMemo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { RegistrationFields } from '@hackjunction/shared';
import TextInput from 'components/inputs/TextInput';
import PhoneNumberInput from 'components/inputs/PhoneNumberInput';
import DateInput from 'components/inputs/DateInput';
import Select from 'components/inputs/Select';
import FormControl from 'components/inputs/FormControl';

const { fieldTypes } = RegistrationFields;

const useStyles = makeStyles(theme => ({
    label: {
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    hint: {
        marginTop: theme.spacing(0.5)
    },
    fieldWrapper: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    }
}));

const RegistrationQuestion = ({ field, form, config, required }) => {
    const classes = useStyles();
    // const renderInputForField = () => {
    //     switch (field.fieldConfig.fieldType.id) {
    //         case fieldTypes.EMAIL.id:
    //         case fieldTypes.URL.id:
    //         case fieldTypes.SHORT_TEXT.id:
    //             return (
    //                 <TextInput
    //                     name={field.name}
    //                     label={field.fieldConfig.placeholder}
    //                     value={field.value}
    //                     onChange={field.onChange}
    //                     rawOnChange
    //                 />
    //             );
    //         default:
    //             return null;
    //     }
    // };

    console.log('RENDER', form);

    const renderInput = () => {
        switch (config.fieldType.id) {
            case fieldTypes.EMAIL.id:
            case fieldTypes.URL.id:
            case fieldTypes.SHORT_TEXT.id:
                return (
                    <TextInput
                        name={field.name}
                        error={form.touched[field.name] ? form.errors[field.name] : null}
                        label={config.label}
                        value={field.value}
                        onChange={value => form.setFieldValue(field.name, value)}
                        onBlur={() => form.setFieldTouched(field.name)}
                    />
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
                            value={field.value}
                            onChange={value => form.setFieldValue(field.name, value)}
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
                        <DateInput value={field.value} onChange={date => form.setFieldValue(field.name, date)} />
                    </FormControl>
                );
            case fieldTypes.GENDER.id:
                return (
                    <Select
                        label={config.label}
                        helperText={config.hint}
                        value={field.value}
                        onChange={gender => form.setFieldValue(field.name, gender)}
                        type="gender"
                    />
                );
            case fieldTypes.NATIONALITY.id:
                return (
                    <Select
                        label={config.label}
                        value={field.value}
                        onChange={nationality => form.setFieldValue(field.name, nationality)}
                        type="nationality"
                    />
                );
            case fieldTypes.LANGUAGES.id:
                return (
                    <Select
                        label={config.label}
                        helperText={config.hint}
                        value={field.value}
                        onChange={languages => form.setFieldValue(field.name, languages)}
                        type="language"
                        multiple={true}
                    />
                );
            case fieldTypes.COUNTRY.id:
                return (
                    <Select
                        label={config.label}
                        helperText={config.hint}
                        value={field.value}
                        onChange={country => form.setFieldValue(field.name, country)}
                        type="country"
                    />
                );
            case fieldTypes.ROLES.id:
                return null;
            // return (
            //     <JobRoleForm
            //         value={field.value}
            //         name={field.name}
            //         validateField={form.validateField}
            //         setFieldTouched={form.setFieldTouched}
            //         setFieldValue={form.setFieldValue}
            //         touched={form.touched[field.name]}
            //     />
            // );
            case fieldTypes.SKILLS.id:
                return null;
            // return (
            //     <SkillsForm
            //         value={field.value}
            //         name={field.name}
            //         validateField={form.validateField}
            //         setFieldTouched={form.setFieldTouched}
            //         setFieldValue={form.setFieldValue}
            //         touched={form.touched[field.name]}
            //     />
            // );
            case fieldTypes.INDUSTRIES.id:
                return (
                    <Select
                        label="Select all that apply"
                        value={field.value}
                        onChange={items => form.setFieldValue(field.name, items)}
                        type="industry"
                        multiple={true}
                    />
                );
            case fieldTypes.THEMES.id:
                return (
                    <Select
                        label="Select all that apply"
                        value={field.value}
                        onChange={items => form.setFieldValue(field.name, items)}
                        type="theme"
                        multiple={true}
                    />
                );
            case fieldTypes.EDUCATION.id:
                return null;
            // return (
            //     <EducationForm
            //         value={field.value}
            //         name={field.name}
            //         validateField={form.validateField}
            //         setFieldTouched={form.setFieldTouched}
            //         setFieldValue={form.setFieldValue}
            //         touched={form.touched[field.name]}
            //     />
            // );
            case fieldTypes.LONG_TEXT.id:
                return null;
            // return (
            //     <Input.TextArea
            //         {...field}
            //         size="large"
            //         autosize={{ minRows: 5, maxRows: 15 }}
            //         placeholder={fieldConfig.placeholder}
            //     />
            // );
            case fieldTypes.NUM_HACKATHONS.id:
                return (
                    <Select
                        label="Choose one"
                        type="num-hackathons"
                        value={field.value}
                        onChange={value => form.setFieldValue(field.name, value)}
                    />
                );
            case fieldTypes.T_SHIRT_SIZE.id:
                return null;
            // return (
            //     <TShirtSizeSelect
            //         value={field.value}
            //         name={field.name}
            //         setFieldValue={form.setFieldValue}
            //         validateField={form.validateField}
            //         setFieldTouched={form.setFieldTouched}
            //         touched={form.touched[field.name]}
            //     />
            // );
            case fieldTypes.BOOLEAN.id:
                return null;
            // return (
            //     <BooleanField
            //         value={field.value}
            //         name={field.name}
            //         setFieldValue={form.setFieldValue}
            //         validateField={form.validateField}
            //         setFieldTouched={form.setFieldTouched}
            //         touched={form.touched[field.name]}
            //     />
            // );
            case fieldTypes.DIETARY_RESTRICTIONS.id:
                return (
                    <Select
                        label={config.label}
                        helperText={config.hint}
                        type="dietary-restriction"
                        value={field.value}
                        onChange={items => form.setFieldValue(field.name, items)}
                        multiple={true}
                    />
                );
            case fieldTypes.TEAM_OPTIONS.id:
                return null;
            // return (
            //     <TeamOptionForm
            //         value={field.value}
            //         name={field.name}
            //         setFieldValue={form.setFieldValue}
            //         validateField={form.validateField}
            //         setFieldTouched={form.setFieldTouched}
            //         touched={form.touched[field.name]}
            //     />
            // );
            case fieldTypes.RECRUITMENT_OPTIONS.id:
                return null;
            // return (
            //     <RecruitmentOptionForm
            //         value={field.value}
            //         name={field.name}
            //         setFieldValue={form.setFieldValue}
            //         validateField={form.validateField}
            //         setFieldTouched={form.setFieldTouched}
            //         touched={form.touched[field.name]}
            //     />
            // );
            default:
                return null;
        }
    };

    return <Box display="flex">{renderInput()}</Box>;
};

export default RegistrationQuestion;
