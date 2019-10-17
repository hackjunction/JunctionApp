import React from 'react';

// import joi from 'joi-browser';
// import moment from 'moment';

// import TextInput from 'components/inputs/TextInput';
// import DateInput from 'components/inputs/DateInput';
// import Select from 'components/inputs/Select';

// import FormikField from '../FormikField';
// import PhoneNumberInput from '../PhoneNumberInput/index';
// import SkillsForm from '../SkillsForm';
// import EducationForm from '../EducationForm';
// import JobRoleForm from '../JobRoleForm';
// import BooleanField from '../BooleanField';
// import { Input } from 'antd';
// import { RegistrationFields, RegistrationValidator, Misc } from '@hackjunction/shared';
// import TShirtSizeSelect from 'components/FormComponents/TShirtSizeSelect';
// import TeamOptionForm from 'components/FormComponents/TeamOptionForm';
// import RecruitmentOptionForm from 'components/FormComponents/RecruitmentOptionForm';
// const { fieldTypes } = RegistrationFields;
// const Validator = new RegistrationValidator(joi, false);

// const RegistrationField = React.memo(({ name, required, isFast, fieldConfig }) => {
//     if (!fieldConfig) {
//         return null;
//     }

//     const renderInputForField = ({ field, form }) => {
//         switch (fieldConfig.fieldType.id) {
//             case fieldTypes.EMAIL.id:
//             case fieldTypes.URL.id:
//             case fieldTypes.SHORT_TEXT.id:
//                 return (
//                     <TextInput
//                         name={field.name}
//                         label={fieldConfig.placeholder}
//                         value={field.value}
//                         onChange={field.onChange}
//                         rawOnChange
//                     />
//                 );
//             case fieldTypes.PHONE_NUMBER.id:
//                 return (
//                     <PhoneNumberInput
//                         value={field.value}
//                         name={field.name}
//                         onBlur={field.onBlur}
//                         setFieldValue={form.setFieldValue}
//                         setFieldTouched={form.setFieldTouched}
//                         validateField={form.validateField}
//                         touched={form.touched[field.name]}
//                     />
//                 );
//             case fieldTypes.DATE.id:
//                 return <DateInput value={field.value} onChange={date => form.setFieldValue(field.name, date)} />;
//             case fieldTypes.GENDER.id:
//                 return (
//                     <Select
//                         label="Select gender"
//                         value={field.value}
//                         onChange={gender => form.setFieldValue(field.name, gender)}
//                         type="gender"
//                     />
//                 );
//             case fieldTypes.NATIONALITY.id:
//                 return (
//                     <Select
//                         label="Select nationality"
//                         value={field.value}
//                         onChange={nationality => form.setFieldValue(field.name, nationality)}
//                         type="nationality"
//                     />
//                 );
//             case fieldTypes.LANGUAGES.id:
//                 return (
//                     <Select
//                         label="Select languages"
//                         value={field.value}
//                         onChange={languages => form.setFieldValue(field.name, languages)}
//                         type="language"
//                         multiple={true}
//                     />
//                 );
//             case fieldTypes.COUNTRY.id:
//                 return (
//                     <Select
//                         label="Select country"
//                         value={field.value}
//                         onChange={country => form.setFieldValue(field.name, country)}
//                         type="country"
//                     />
//                 );
//             case fieldTypes.ROLES.id:
//                 return (
//                     <JobRoleForm
//                         value={field.value}
//                         name={field.name}
//                         validateField={form.validateField}
//                         setFieldTouched={form.setFieldTouched}
//                         setFieldValue={form.setFieldValue}
//                         touched={form.touched[field.name]}
//                     />
//                 );
//             case fieldTypes.SKILLS.id:
//                 return (
//                     <SkillsForm
//                         value={field.value}
//                         name={field.name}
//                         validateField={form.validateField}
//                         setFieldTouched={form.setFieldTouched}
//                         setFieldValue={form.setFieldValue}
//                         touched={form.touched[field.name]}
//                     />
//                 );
//             case fieldTypes.INDUSTRIES.id:
//                 return (
//                     <Select
//                         label="Select all that apply"
//                         value={field.value}
//                         onChange={items => form.setFieldValue(field.name, items)}
//                         type="industry"
//                         multiple={true}
//                     />
//                 );
//             case fieldTypes.THEMES.id:
//                 return (
//                     <Select
//                         label="Select all that apply"
//                         value={field.value}
//                         onChange={items => form.setFieldValue(field.name, items)}
//                         type="theme"
//                         multiple={true}
//                     />
//                 );
//             case fieldTypes.EDUCATION.id:
//                 return (
//                     <EducationForm
//                         value={field.value}
//                         name={field.name}
//                         validateField={form.validateField}
//                         setFieldTouched={form.setFieldTouched}
//                         setFieldValue={form.setFieldValue}
//                         touched={form.touched[field.name]}
//                     />
//                 );
//             case fieldTypes.LONG_TEXT.id:
//                 return (
//                     <Input.TextArea
//                         {...field}
//                         size="large"
//                         autosize={{ minRows: 5, maxRows: 15 }}
//                         placeholder={fieldConfig.placeholder}
//                     />
//                 );
//             case fieldTypes.NUM_HACKATHONS.id:
//                 return (
//                     <Select
//                         label="Choose one"
//                         type="num-hackathons"
//                         value={field.value}
//                         onChange={value => form.setFieldValue(field.name, value)}
//                     />
//                 );
//             case fieldTypes.T_SHIRT_SIZE.id:
//                 return (
//                     <TShirtSizeSelect
//                         value={field.value}
//                         name={field.name}
//                         setFieldValue={form.setFieldValue}
//                         validateField={form.validateField}
//                         setFieldTouched={form.setFieldTouched}
//                         touched={form.touched[field.name]}
//                     />
//                 );
//             case fieldTypes.BOOLEAN.id:
//                 return (
//                     <BooleanField
//                         value={field.value}
//                         name={field.name}
//                         setFieldValue={form.setFieldValue}
//                         validateField={form.validateField}
//                         setFieldTouched={form.setFieldTouched}
//                         touched={form.touched[field.name]}
//                     />
//                 );
//             case fieldTypes.DIETARY_RESTRICTIONS.id:
//                 return (
//                     <Select
//                         label="Select all that apply"
//                         type="dietary-restriction"
//                         value={field.value}
//                         onChange={items => form.setFieldValue(field.name, items)}
//                         multiple={true}
//                     />
//                 );
//             case fieldTypes.TEAM_OPTIONS.id:
//                 return (
//                     <TeamOptionForm
//                         value={field.value}
//                         name={field.name}
//                         setFieldValue={form.setFieldValue}
//                         validateField={form.validateField}
//                         setFieldTouched={form.setFieldTouched}
//                         touched={form.touched[field.name]}
//                     />
//                 );
//             case fieldTypes.RECRUITMENT_OPTIONS.id:
//                 return (
//                     <RecruitmentOptionForm
//                         value={field.value}
//                         name={field.name}
//                         setFieldValue={form.setFieldValue}
//                         validateField={form.validateField}
//                         setFieldTouched={form.setFieldTouched}
//                         touched={form.touched[field.name]}
//                     />
//                 );
//             default:
//                 return null;
//         }
//     };

//     const renderValueForField = value => {
//         switch (fieldConfig.fieldType.id) {
//             case fieldTypes.DATE.id: {
//                 return moment(value).format('MMM Do, YYYY');
//             }
//             case fieldTypes.ROLES.id: {
//                 const mapped = value.map(role => role.role);
//                 if (mapped.length < 3) {
//                     return mapped.join(', ');
//                 } else {
//                     return `${mapped.slice(0, 2).join(', ')} and ${mapped.length - 2} more`;
//                 }
//             }
//             case fieldTypes.SKILLS.id: {
//                 const mapped = value.map(skill => skill.skill);
//                 if (mapped.length < 3) {
//                     return mapped.join(', ');
//                 } else {
//                     return `${mapped.slice(0, 2).join(', ')} and ${mapped.length - 2} more`;
//                 }
//             }
//             case fieldTypes.INDUSTRIES.id: {
//                 if (value.length < 3) {
//                     return value.join(', ');
//                 } else {
//                     return `${value.slice(0, 2).join(', ')} and ${value.length - 2} more`;
//                 }
//             }
//             case fieldTypes.THEMES.id: {
//                 if (value.length < 3) {
//                     return value.join(', ');
//                 } else {
//                     return `${value.slice(0, 2).join(', ')} and ${value.length - 2} more`;
//                 }
//             }
//             case fieldTypes.EDUCATION.id: {
//                 if (value) {
//                     return value.level + (value.degree ? `, ${value.degree}` : '');
//                 } else {
//                     return '';
//                 }
//             }
//             case fieldTypes.LANGUAGES.id: {
//                 if (value.length < 3) {
//                     return value.join(', ');
//                 } else {
//                     return `${value.slice(0, 2).join(', ')} and ${value.length - 2} more`;
//                 }
//             }
//             case fieldTypes.LONG_TEXT.id: {
//                 if (value.length > 100) {
//                     return value.slice(0, 100) + '...';
//                 }
//                 return value;
//             }
//             case fieldTypes.PHONE_NUMBER.id: {
//                 if (value) {
//                     return value.country_code + ' ' + value.number;
//                 }
//                 return '';
//             }
//             case fieldTypes.NUM_HACKATHONS.id: {
//                 if (value) {
//                     return Misc.numHackathonOptions.getLabelForValue(value);
//                 }
//                 return '';
//             }
//             case fieldTypes.BOOLEAN.id: {
//                 if (value === true) {
//                     return 'Yes';
//                 }
//                 if (value === false) {
//                     return 'No';
//                 }
//                 return '';
//             }
//             case fieldTypes.DIETARY_RESTRICTIONS.id: {
//                 if (value) {
//                     if (value.length < 3) {
//                         return value.join(', ');
//                     } else {
//                         return `${value.slice(0, 2).join(', ')} and ${value.length - 2} more`;
//                     }
//                 }
//                 return '';
//             }
//             case fieldTypes.TEAM_OPTIONS.id: {
//                 if (value) {
//                     if (value.applyAsTeam === true) {
//                         return 'Yes';
//                     }
//                     if (value.applyAsTeam === false) {
//                         return 'No';
//                     }
//                 }
//                 return '';
//             }
//             case fieldTypes.RECRUITMENT_OPTIONS.id: {
//                 return '';
//             }
//             default:
//                 return value;
//         }
//     };

//     return (
//         <FormikField
//             name={name}
//             hint={fieldConfig.hint}
//             hintMarkdown={fieldConfig.hintMarkdown}
//             label={fieldConfig.label}
//             isFast={isFast}
//             required={required}
//             validate={Validator.validate(name, required)}
//             alwaysFocused={fieldConfig.alwaysFocused || false}
//             render={renderInputForField}
//             renderValue={renderValueForField}
//         />
//     );
// });

const RegistrationField = () => null;

export default RegistrationField;
