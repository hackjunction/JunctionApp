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
import { debugGroup } from 'utils/debuggingTools'
import { useTranslation } from 'react-i18next'

export default ({
    initialData = {},
    formikSubmitAction = () => {},
    onBack = () => {},
    challengeOptions = [],
}) => {
    const { t } = useTranslation()
    const TeamSchema = {
        name: yup
            .string()
            .min(3, ({ min }) =>
                t('Field_validation_min_chars_', { fieldName: 'name', min }),
            )
            .max(50, ({ max }) =>
                t('Field_validation_max_chars_', { fieldName: 'name', max }),
            )
            .required('Team name is required'),
        subtitle: yup
            .string()
            .min(3, ({ min }) =>
                t('Field_validation_min_chars_', {
                    fieldName: 'subtitle',
                    min,
                }),
            )
            .max(50, ({ max }) =>
                t('Field_validation_max_chars_', {
                    fieldName: 'subtitle',
                    max,
                }),
            ),
        description: yup
            .string()
            .min(3, ({ min }) =>
                t('Field_validation_min_chars_', {
                    fieldName: 'description',
                    min,
                }),
            )
            .max(150, ({ max }) =>
                t('Field_validation_max_chars_', {
                    fieldName: 'description',
                    max,
                }),
            ),
        ideaTitle: yup
            .string()
            .min(3, ({ min }) =>
                t('Field_validation_min_chars_', {
                    fieldName: 'idea title',
                    min,
                }),
            )
            .max(50, ({ max }) =>
                t('Field_validation_max_chars_', {
                    fieldName: 'idea title',
                    max,
                }),
            ),
        ideaDescription: yup
            .string()
            .when('ideaTitle', {
                is: title => title && title.length > 0,
                then: yup
                    .string()
                    .required(
                        t('Field_validation_team_idea_description_required_'),
                    ),
            })
            .min(3, ({ min }) =>
                t('Field_validation_min_chars_', {
                    fieldName: 'idea description',
                    min,
                }),
            )
            .max(150, ({ max }) =>
                t('Field_validation_max_chars_', {
                    fieldName: 'idea description',
                    max,
                }),
            ),
        email: yup
            .string()
            .when(['discord', 'telegram', 'slack'], {
                is: (discord, telegram, slack) =>
                    !discord && !telegram && !slack,
                then: yup.string().required('One contact option is required.'),
            })
            .min(3, ({ min }) =>
                t('Field_validation_min_chars_', { fieldName: 'email', min }),
            )
            .max(50, ({ max }) =>
                t('Field_validation_max_chars_', {
                    fieldName: 'email',
                    max,
                }),
            )
            .email(t('Field_validation_invalid_email_')),
        discord: yup.string('Invalid discord url').max(50, ({ max }) =>
            t('Field_validation_max_chars_', {
                fieldName: 'Discord link',
                max,
            }),
        ),
        telegram: yup.string('Invalid telegram url').max(50, ({ max }) =>
            t('Field_validation_max_chars_', {
                fieldName: 'Telegram link',
                max,
            }),
        ),
        slack: yup.string('Invalid slack url').max(150, ({ max }) =>
            t('Field_validation_max_chars_', {
                fieldName: 'Slack link',
                max,
            }),
        ),
    }

    const formMode =
        initialData && Object.keys(initialData).length > 0 ? 'Edit' : 'Create'

    debugGroup('Prop data', [
        initialData,
        formikSubmitAction,
        onBack,
        challengeOptions,
    ])

    if (Array.isArray(challengeOptions) && challengeOptions.length > 0) {
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
                            {t('Back_')}
                        </Button>
                    </div>
                    <div>
                        <Typography
                            className="tw-font-bold tw-tracking-tight"
                            variant="h4"
                            component="h4"
                        >
                            {formMode === 'Create'
                                ? t('Team_create_')
                                : t('Team_edit_')}
                        </Typography>
                        <Typography
                            className="tw-text-lg tw-text-gray-600"
                            variant="body1"
                            component="p"
                        >
                            {t('Fields_with_mark_are_required_')}
                        </Typography>
                    </div>
                    <div>
                        <FastField name="name">
                            {({ field, form }) => (
                                <FormControl
                                    label={`${t('Team_name_')} *`}
                                    hint={t('Team_name_hint_')}
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
                    {/* <div>
                        <FastField name="teamColor">
                            {({ field, form }) => (
                                <FormControl
                                    label="Team banner colors"
                                    hint="Select one option for your team banner colors gradient"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <Select
                                        label="Select team banner colors"
                                        options="gradient-list"
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
                        --- 
                    </div> */}
                    {Array.isArray(challengeOptions) &&
                        challengeOptions.length > 0 && (
                            <div>
                                <FastField name="challenge">
                                    {({ field, form }) => (
                                        <FormControl
                                            label={t('Challenge_')}
                                            hint={t('Team_challenge_hint_')}
                                            touched={
                                                form.touched[field.name] ||
                                                formikProps.submitCount > 0
                                            }
                                            error={form.errors[field.name]}
                                        >
                                            <Select
                                                label={t('Select_challenge_')}
                                                options={challengeOptions}
                                                value={field.value}
                                                onChange={value =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        value,
                                                    )
                                                }
                                                onBlur={() =>
                                                    form.setFieldTouched(
                                                        field.name,
                                                    )
                                                }
                                            />
                                        </FormControl>
                                    )}
                                </FastField>
                            </div>
                        )}
                    <div>
                        <FastField name="subtitle">
                            {({ field, form }) => (
                                <FormControl
                                    label={t('Team_subtitle_')}
                                    hint={t('Team_subtitle_hint_')}
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
                                    label={t('Team_description_')}
                                    hint={t('Team_description_hint_')}
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
                                        minRows={3}
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="ideaTitle">
                            {({ field, form }) => (
                                <FormControl
                                    label={t('Team_idea_title_')}
                                    hint={t('Team_idea_title_hint_')}
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
                                    label={t('Team_idea_description_')}
                                    hint={t('Team_idea_description_hint_')}
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
                                        minRows={3}
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="teamRoles">
                            {({ field, form }) => (
                                <FormControl
                                    label={t('Team_available_roles_label_')}
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
                                    label={t('Team_email_label_')}
                                    hint={t('Team_email_hint_')}
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
                        <FastField name="slack">
                            {({ field, form }) => (
                                <FormControl
                                    label={t('Team_slack_label_')}
                                    hint=""
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
                                        placeholder="Your team's Slack"
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="telegram">
                            {({ field, form }) => (
                                <FormControl
                                    label={t('Team_telegram_label_')}
                                    hint=""
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
                                    label={t('Team_discord_label_')}
                                    hint=""
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
