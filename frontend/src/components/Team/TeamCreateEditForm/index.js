import FormControl from 'components/inputs/FormControl'
import { FastField, Formik } from 'formik'
import Select from 'components/inputs/Select'

import TextInput from 'components/inputs/TextInput'
import TextAreaInput from 'components/inputs/TextAreaInput'
import BottomBar from 'components/inputs/BottomBar'

import * as yup from 'yup'

import React from 'react'
import Button from 'components/generic/Button'
import { Typography } from '@material-ui/core'

export default ({
    initialData = {},
    formikSubmitAction = () => {},
    onBack = () => {},
    challengeOptions = [],
}) => {
    const TeamSchema = {
        name: yup.string().required('Team name is required'),
        tagline: yup.string().required('Team tagline is required'),
        description: yup.string().required('Team description is required'),
        ideaTitle: yup.string(),
        ideaDescription: yup.string(),
        email: yup.string().email('Invalid email address'),
        discord: yup.string('Invalid discord url'),
        telegram: yup.string('Invalid telegram url'),
    }

    if (challengeOptions && challengeOptions.length > 0) {
        TeamSchema.challenge = yup
            .string()
            .required('One challenge is required')
    }

    return (
        <Formik
            validationSchema={yup
                .object()
                .shape(TeamSchema)
                .test({
                    name: 'contact-options',
                    test: values => {
                        if (
                            !values.email &&
                            !values.telegram &&
                            !values.discord
                        ) {
                            throw new yup.ValidationError(
                                'At least one contact option is required. Either email, telegram or discord.',
                            )
                        }
                        return true
                    },
                })}
            initialValues={initialData}
            enableReinitialize={true}
            onSubmit={formikSubmitAction}
        >
            {formikProps => (
                <div className="tw-flex tw-flex-col tw-gap-10">
                    <div>
                        <Button
                            color="outlined_button"
                            variant="jOutlined"
                            onClick={onBack}
                        >
                            Back
                        </Button>
                    </div>
                    <div>
                        <Typography
                            className="tw-font-bold tw-tracking-tight"
                            variant="h4"
                            component="h4"
                        >
                            Create your team
                        </Typography>
                        <Typography
                            className="tw-text-lg tw-text-gray-600"
                            variant="body1"
                            component="p"
                        >
                            Fields marked with * are required
                        </Typography>
                    </div>
                    <div>
                        {challengeOptions && challengeOptions.length > 0 && (
                            <FastField name="challenge">
                                {({ field, form }) => (
                                    <FormControl
                                        label="Challenge *"
                                        hint="Select one of the challenges"
                                        touched={
                                            form.touched[field.name] ||
                                            formikProps.submitCount > 0
                                        }
                                        error={form.errors[field.name]}
                                    >
                                        <Select
                                            label="Select challenge"
                                            options={challengeOptions}
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value,
                                                )
                                            }
                                            onBlur={() =>
                                                form.setFieldTouched(field.name)
                                            }
                                        />
                                    </FormControl>
                                )}
                            </FastField>
                        )}
                    </div>
                    <div>
                        <FastField name="name">
                            {({ field, form }) => (
                                <FormControl
                                    label="Team name *"
                                    hint="Write a name for your team"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        placeholder="Awesome team"
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="tagline">
                            {({ field, form }) => (
                                <FormControl
                                    label="Team subtitle *"
                                    hint="Write a subtitle for your team"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        placeholder="Solving problems with code"
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="description">
                            {({ field, form }) => (
                                <FormControl
                                    label="Brief description about your team *"
                                    hint="Share what your team is about"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextAreaInput
                                        placeholder="Our team is..."
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="ideaTitle">
                            {({ field, form }) => (
                                <FormControl
                                    label=" Title of the idea explored by your team *"
                                    hint="Write a title for your idea"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        placeholder="Great idea 1.0"
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="ideaDescription">
                            {({ field, form }) => (
                                <FormControl
                                    label="Brief explanation of the idea explored by your team *"
                                    hint="Explain your idea in a few sentences"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextAreaInput
                                        placeholder="Our team is working on..."
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="teamRoles">
                            {({ field, form }) => (
                                <FormControl
                                    label="Available roles in your team (optional)"
                                    error={form.errors[field.name]}
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                >
                                    <Select
                                        options="role"
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        isMulti
                                        isTeamRoles
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="email">
                            {({ field, form }) => (
                                <FormControl
                                    label="Team's contact email"
                                    hint="Your team must have at least an email, a discord or a telegram challenge"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        placeholder="team.email@email.com"
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="telegram">
                            {({ field, form }) => (
                                <FormControl
                                    label="Team's Telegram"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        placeholder="Your team's Telegram"
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="discord">
                            {({ field, form }) => (
                                <FormControl
                                    label="Team's Discord"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        placeholder="Your team's Discord"
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <BottomBar
                        onSubmit={formikProps.handleSubmit}
                        errors={formikProps.errors}
                        dirty={formikProps.dirty}
                        loading={formikProps.isSubmitting}
                    />
                </div>
            )}
        </Formik>
    )
}
