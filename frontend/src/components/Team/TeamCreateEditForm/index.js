import FormControl from 'components/inputs/FormControl'
import { FastField, Formik } from 'formik'
import Select from 'components/inputs/Select'

import TextInput from 'components/inputs/TextInput'
import TextAreaInput from 'components/inputs/TextAreaInput'
import BottomBar from 'components/inputs/BottomBar'

import React from 'react'

export default ({
    initialData = {},
    formikSubmitAction = () => {},
    challengeOptions,
}) => {
    console.log(initialData)
    console.log(challengeOptions)
    return (
        <Formik initialValues={initialData} onSubmit={formikSubmitAction}>
            {formikProps => (
                <div>
                    <div>
                        {challengeOptions && (
                            <FastField name="challenge">
                                {({ field, form }) => (
                                    <FormControl
                                        label="Challenge"
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
                                    label="Team name"
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
                                    label="Team tagline"
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
                                    label="Available roles in your team"
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
