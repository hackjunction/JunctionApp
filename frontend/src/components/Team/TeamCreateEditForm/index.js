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
        name: yup
            .string()
            .min(
                3,
                ({ min }) => `The name must have at least ${min} characters`,
            )
            .max(50, ({ max }) => `The name can have up to ${max} characters`)
            .required('Team name is required'),
        subtitle: yup
            .string()
            .min(
                3,
                ({ min }) =>
                    `The subtitle must have at least ${min} characters`,
            )
            .max(
                100,
                ({ max }) => `The subtitle can have up to ${max} characters`,
            ),
        description: yup
            .string()
            .min(
                3,
                ({ min }) =>
                    `The description must have at least ${min} characters`,
            )
            .max(
                300,
                ({ max }) => `The description can have up to ${max} characters`,
            ),
        ideaTitle: yup
            .string()
            .min(
                3,
                ({ min }) =>
                    `The title of your idea must have at least ${min} characters`,
            )
            .max(
                50,
                ({ max }) =>
                    `The title of your idea can have up to ${max} characters`,
            ),
        ideaDescription: yup
            .string()
            .when('ideaTitle', {
                is: title => title && title.length > 0,
                then: yup
                    .string()
                    .required(
                        'If you have an idea title, description for the idea is required',
                    ),
            })
            .min(
                3,
                ({ min }) =>
                    `The description of your idea must have at least ${min} characters`,
            )
            .max(
                300,
                ({ max }) =>
                    `The description of your idea can have up to ${max} characters`,
            ),
        email: yup
            .string()
            .when(['discord', 'telegram'], {
                is: (discord, telegram) => !discord && !telegram,
                then: yup.string().required('One contact option is required.'),
            })
            .min(
                3,
                ({ min }) => `The email must have at least ${min} characters`,
            )
            .max(100, ({ max }) => `The email can have up to ${max} characters`)
            .email('Invalid email address'),
        discord: yup
            .string('Invalid discord url')
            .max(
                50,
                ({ max }) => `Discord links can have up to ${max} characters`,
            ),
        telegram: yup
            .string('Invalid telegram url')
            .max(
                50,
                ({ max }) => `Telegram links can have up to ${max} characters`,
            ),
    }

    if (challengeOptions && challengeOptions.length > 0) {
        TeamSchema.challenge = yup.string().required('A challenge is required')
    }

    return (
        <Formik
            validationSchema={yup.object().shape(TeamSchema)}
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
                    {challengeOptions && challengeOptions.length > 0 && (
                        <div>
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
                        </div>
                    )}
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
                        <FastField name="subtitle">
                            {({ field, form }) => (
                                <FormControl
                                    label="Team subtitle"
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
                                    label="Brief description about your team"
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
                                    label=" Title of the idea explored by your team"
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
                                    label="Brief explanation of the idea explored by your team"
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
                                    hint="Your team must have at least an email, a discord or a telegram channel"
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
                        errors={
                            formikProps.touched?.name &&
                            formikProps.touched?.description
                                ? formikProps.errors
                                : {}
                        }
                        dirty={formikProps.dirty}
                        loading={formikProps.isSubmitting}
                    />
                </div>
            )}
        </Formik>
    )
}
