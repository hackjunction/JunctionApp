import React, { useMemo } from 'react'
import { Formik, FastField, Field } from 'formik'
import { Grid, Typography, Box } from '@material-ui/core'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import FormControl from 'components/inputs/FormControl'
import TextInput from 'components/inputs/TextInput'
import Select from 'components/inputs/Select'
import Button from 'components/generic/Button'
import DateInput from 'components/inputs/DateInput'
import BooleanInput from 'components/inputs/BooleanInput'
import PdfUpload from 'components/inputs/PdfUpload'
import StreetAddressForm from 'components/inputs/StreetAddressForm'
import ErrorsBox from 'components/generic/ErrorsBox'

import * as UserSelectors from 'redux/user/selectors'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import { TravelGrantDetailsValidationSchema as schema } from '@hackjunction/shared'

export default () => {
    const dispatch = useDispatch()
    const userProfile = useSelector(UserSelectors.userProfile)
    const registration = useSelector(DashboardSelectors.registration)
    const event = useSelector(DashboardSelectors.event)

    const initialValues = useMemo(() => {
        if (registration.travelGrantDetails) {
            return registration.travelGrantDetails
        } else {
            return {
                legalName: {
                    firstName: userProfile.firstName,
                    middleName: '',
                    lastName: userProfile.lastName,
                },
                email: userProfile.email,
                dateOfBirth: userProfile.dateOfBirth,
                address: {},
                hasSSN: false,
                SSN: '',
                hasIBAN: true,
                IBAN: {},
                receiptsPdf: {},
                receiptsSum: 0,
            }
        }
    }, [registration, userProfile])

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true)
                const error = await dispatch(
                    DashboardActions.updateRegistrationGrantDetails(
                        event.slug,
                        values,
                    ),
                )
                if (error) {
                    dispatch(
                        SnackbarActions.error('Oops, something went wrong...'),
                    )
                } else {
                    dispatch(SnackbarActions.success('Success!'))
                }
                actions.setSubmitting(false)
            }}
            validationSchema={props => {
                return yup.lazy(values => {
                    return yup.object().shape(schema)
                })
            }}
        >
            {formikProps => (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FastField
                            name="legalName"
                            render={({ field, form }) => (
                                <FormControl
                                    label="Legal name"
                                    hint="Enter your full legal name, including any middle names"
                                    error={form.errors[field.name]}
                                    touched={form.touched[field.name]}
                                >
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={6}>
                                            <TextInput
                                                label="First name(s)"
                                                value={field.value.firstName}
                                                onChange={value =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        {
                                                            ...field.value,
                                                            firstName: value,
                                                        },
                                                    )
                                                }
                                                onBlur={() =>
                                                    form.setFieldTouched(
                                                        field.name,
                                                    )
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextInput
                                                label="Middle name(s)"
                                                value={field.value.middleName}
                                                onChange={value =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        {
                                                            ...field.value,
                                                            middleName: value,
                                                        },
                                                    )
                                                }
                                                onBlur={() =>
                                                    form.setFieldTouched(
                                                        field.name,
                                                    )
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextInput
                                                label="Last name"
                                                value={field.value.lastName}
                                                onChange={value =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        {
                                                            ...field.value,
                                                            lastName: value,
                                                        },
                                                    )
                                                }
                                                onBlur={() =>
                                                    form.setFieldTouched(
                                                        field.name,
                                                    )
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FastField
                            name="email"
                            render={({ field, form }) => {
                                return (
                                    <FormControl
                                        label="Email address"
                                        hint="For communication related to receiving your travel grant payment"
                                        error={form.errors[field.name]}
                                        touched={form.touched[field.name]}
                                    >
                                        <TextInput
                                            label="Email address"
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
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FastField
                            name="gender"
                            render={({ field, form }) => (
                                <FormControl
                                    label="Gender"
                                    hint="Please select your legal gender, either male or female. This information is required by tax authorities."
                                    error={form.errors[field.name]}
                                    touched={form.touched[field.name]}
                                >
                                    <Select
                                        label="Gender"
                                        options={[
                                            {
                                                label: 'Male',
                                                value: 'Male',
                                            },
                                            {
                                                label: 'Female',
                                                value: 'Female',
                                            },
                                        ]}
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
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FastField
                            name="dateOfBirth"
                            render={({ field, form }) => (
                                <FormControl
                                    label="Date of birth"
                                    hint="Enter your birthdate"
                                    error={form.errors[field.name]}
                                    touched={form.touched[field.name]}
                                >
                                    <DateInput
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
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FastField
                            name="hasSSN"
                            render={({ field, form }) => (
                                <FormControl label="Do you have a Finnish social security number?">
                                    <BooleanInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                    />
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="SSN"
                            render={({ field, form }) => {
                                if (form.values.hasSSN) {
                                    return (
                                        <FormControl
                                            label="Social security number (Hetu)"
                                            hint="Fill in your social security number - this makes receiving your travel grant payments easier."
                                            error={form.errors[field.name]}
                                            touched={form.touched[field.name]}
                                        >
                                            <TextInput
                                                label="Social security number"
                                                placeholder="000000-000X"
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
                                    )
                                }
                                return null
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="address"
                            render={({ field, form }) => (
                                <FormControl
                                    label="Home address"
                                    hint="Enter your home address in your current country of residence"
                                    error={form.errors[field.name]}
                                    touched={form.touched[field.name]}
                                >
                                    <StreetAddressForm
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
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FastField
                            name="hasIBAN"
                            render={({ field, form }) => {
                                return (
                                    <FormControl
                                        label="Do you have an IBAN bank account?"
                                        hint="...or a possibility to get one"
                                    >
                                        <BooleanInput
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value,
                                                )
                                            }
                                        />
                                    </FormControl>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="IBAN"
                            render={({ field, form }) => {
                                if (!form.values.hasIBAN) {
                                    return (
                                        <Typography variant="subtitle1">
                                            If you don't have an IBAN account,
                                            you will later need to fill in your
                                            bank details in a separate service.
                                        </Typography>
                                    )
                                }
                                return (
                                    <FormControl
                                        label="IBAN account details"
                                        hint="Fill in your IBAN account details"
                                        error={form.errors[field.name]}
                                        touched={form.touched[field.name]}
                                    >
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <TextInput
                                                    label="Account number"
                                                    value={
                                                        field.value
                                                            .accountNumber
                                                    }
                                                    onChange={value =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            {
                                                                ...field.value,
                                                                accountNumber:
                                                                    value,
                                                            },
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        form.setFieldTouched(
                                                            field.name,
                                                        )
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextInput
                                                    label="SWIFT/BIC"
                                                    value={field.value.swift}
                                                    onChange={value =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            {
                                                                ...field.value,
                                                                swift: value,
                                                            },
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        form.setFieldTouched(
                                                            field.name,
                                                        )
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextInput
                                                    label="Bank name"
                                                    value={field.value.bankName}
                                                    onChange={value =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            {
                                                                ...field.value,
                                                                bankName: value,
                                                            },
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        form.setFieldTouched(
                                                            field.name,
                                                        )
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </FormControl>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FastField
                            name="receiptsPdf"
                            render={({ field, form }) => (
                                <FormControl
                                    label="Travel receipts"
                                    hint="Upload a .pdf file containing your travel receipts. If you have multiple travel receipts you wish to upload, first combine them into a single .pdf file and then upload the receipts here. Maximum file size: 10mb"
                                    error={form.errors[field.name]}
                                    touched={form.touched[field.name]}
                                >
                                    <PdfUpload
                                        uploadUrl={`/api/upload/${event.slug}/travel-grant-receipts`}
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                    />
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FastField
                            name="receiptsSum"
                            render={({ field, form }) => (
                                <FormControl
                                    label="Sum of receipts"
                                    hint="Enter the total sum of your receipts, in Euros"
                                    error={form.errors[field.name]}
                                    touched={form.touched[field.name]}
                                >
                                    <TextInput
                                        label="€"
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
                        />
                    </Grid>
                    {Object.keys(formikProps.errors).length > 0 ? (
                        <Grid item xs={12}>
                            <ErrorsBox errors={formikProps.errors} />
                        </Grid>
                    ) : (
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                            >
                                <Box width="100%" maxWidth="300px">
                                    <Button
                                        loading={formikProps.isSubmitting}
                                        fullWidth
                                        color="primary"
                                        variant="contained"
                                        onClick={formikProps.submitForm}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            )}
        </Formik>
    )
}
