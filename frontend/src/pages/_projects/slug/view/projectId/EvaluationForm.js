import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Box, Typography } from '@material-ui/core'
import RadioScore from 'components/generic/RadioScore'
import TextAreaInput from 'components/inputs/TextAreaInput'
import FormControl from 'components/inputs/FormControl'
import BottomBar from 'components/inputs/BottomBar'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'

const EvaluationForm = ({ submit = () => {}, score, scoreCriteria }) => {
    const { t } = useTranslation()
    const allScoresSet = evalScores => {
        const scoreList = evalScores.map(value => {
            return value?.score ? value.score : null
        })
        return _.every(scoreList, _.isNumber)
    }

    const calculateScore = (criterias, decimalPlaces) => {
        const multiplier = Math.pow(10, decimalPlaces)
        const scoreAverage =
            criterias.reduce((acc, curr) => {
                if (!curr.score) return acc
                return curr.score + acc
            }, 0) / criterias.length
        const scoreAverageFormatted =
            Math.floor(scoreAverage * multiplier) / multiplier
        return scoreAverageFormatted
    }

    if (
        scoreCriteria &&
        scoreCriteria.length > 0 &&
        score.scoreCriteria &&
        score.scoreCriteria.length > 0
    ) {
        const scoreFiltered = score.scoreCriteria.filter(criteria =>
            _.includes(
                scoreCriteria.map(crit => crit.criteria),
                criteria.criteria,
            ),
        )
        score.scoreCriteria = scoreFiltered
    }

    return (
        <>
            <Formik
                initialValues={{ ...score }}
                enableReinitialize={true}
                onSubmit={submit}
            >
                {formikProps => {
                    return (
                        <Form className="tw-flex tw-flex-col tw-gap-8 tw-bg-white tw-rounded-md tw-shadow-md sm:tw-p-4 tw-p-2">
                            <Field name="scoreCriteria">
                                {({ field, form }) => (
                                    <>
                                        <FormControl
                                            label={t('Project_evaluation_')}
                                            hint={t('Project_evatuation_hint_')}
                                            touched={
                                                form.touched[field.name] ||
                                                formikProps.submitCount > 0
                                            }
                                            error={form.errors[field.name]}
                                        >
                                            <div className="tw-flex tw-flex-col tw-gap-4">
                                                {field.value &&
                                                    scoreCriteria.map(
                                                        (
                                                            { criteria, label },
                                                            index,
                                                        ) => {
                                                            return (
                                                                <RadioScore
                                                                    key={
                                                                        criteria
                                                                    }
                                                                    criteria={
                                                                        criteria
                                                                    }
                                                                    label={
                                                                        label
                                                                    }
                                                                    value={
                                                                        field
                                                                            .value[
                                                                            index
                                                                        ]
                                                                            ? field
                                                                                  .value[
                                                                                  index
                                                                              ]
                                                                                  .score
                                                                            : null
                                                                    }
                                                                    onSelectionChange={score => {
                                                                        form.setFieldTouched(
                                                                            field.name,
                                                                        )
                                                                        const updatedField =
                                                                            field.value
                                                                        if (
                                                                            !updatedField[
                                                                                index
                                                                            ]
                                                                        ) {
                                                                            updatedField[
                                                                                index
                                                                            ] =
                                                                                {
                                                                                    criteria,
                                                                                    label,
                                                                                }
                                                                        }
                                                                        updatedField[
                                                                            index
                                                                        ].score =
                                                                            score
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            updatedField,
                                                                        )
                                                                        const updatedScore =
                                                                            calculateScore(
                                                                                updatedField,
                                                                                2,
                                                                            )

                                                                        if (
                                                                            allScoresSet(
                                                                                updatedField,
                                                                            )
                                                                        ) {
                                                                            form.setFieldValue(
                                                                                'score',
                                                                                updatedScore,
                                                                            )
                                                                        }
                                                                        return
                                                                    }}
                                                                />
                                                            )
                                                        },
                                                    )}
                                            </div>
                                        </FormControl>
                                    </>
                                )}
                            </Field>
                            <Field name="score">
                                {({ field, form }) => (
                                    <div className="tw-flex tw-gap-2">
                                        <Typography
                                            className="tw-font-semibold"
                                            variant="body1"
                                            component="p"
                                        >
                                            {t(
                                                'Project_evaluation_final_score_',
                                            )}
                                            :
                                        </Typography>
                                        {field.value > 0 ? (
                                            <Typography
                                                variant="body1"
                                                component="p"
                                            >
                                                {field.value}
                                            </Typography>
                                        ) : (
                                            <Typography
                                                variant="body1"
                                                component="p"
                                            >
                                                {t(
                                                    'Project_evaluation_final_score_hint_',
                                                )}
                                            </Typography>
                                        )}
                                    </div>
                                )}
                            </Field>
                            <Field name="message">
                                {({ field, form }) => (
                                    <FormControl
                                        label={t(
                                            'Project_evaluation_feedback_',
                                        )}
                                        hint={t(
                                            'Project_evaluation_feedback_hint_',
                                        )}
                                        touched={
                                            form.touched[field.name] ||
                                            formikProps.submitCount > 0
                                        }
                                        error={form.errors[field.name]}
                                    >
                                        <TextAreaInput
                                            id="feedback-message"
                                            value={field.value}
                                            placeholder={t(
                                                'Project_evaluation_feedback_placeholder_',
                                            )}
                                            onChange={value =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value,
                                                )
                                            }
                                            onBlur={() =>
                                                form.setFieldTouched(field.name)
                                            }
                                            minRows={2}
                                            maxLength={500}
                                        />
                                    </FormControl>
                                )}
                            </Field>
                            <BottomBar
                                onSubmit={formikProps.handleSubmit}
                                errors={formikProps.errors}
                                dirty={formikProps.dirty}
                                loading={formikProps.isSubmitting}
                            />
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default EvaluationForm
