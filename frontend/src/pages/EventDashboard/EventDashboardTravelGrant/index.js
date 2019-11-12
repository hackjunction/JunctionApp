import React from 'react';
import { Formik, FastField, Field } from 'formik';
import FormControl from 'components/inputs/FormControl';
import TextInput from 'components/inputs/TextInput';
import Select from 'components/inputs/Select';
import Button from 'components/generic/Button';
import * as yup from 'yup';

// const Countries = require("../constants/countries");

const SignupSchema = yup.object().shape({
    legalName: {
        firstName: yup.string().required(),
        middleName: yup.string(),
        lastName: yup.string().required()
    },
    dateOfBirth: yup
        .date()
        .min(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 120))
        .max(new Date(Date.now() - 1000 * 60 * 60 * 24 * 364 * 16))
        .required(),
    socialSecurityNumber: {
        issuingCountry: yup.string().required(),
        number: yup.string().required()
    },
    address: {
        country: yup
            .string()
            // .oneOf(Countries.asArrayOfName)
            .required(),
        addressLine: yup.string().required(),
        addressLine2: yup.string(),
        city: yup.string().required(),
        postalCode: yup.string().required()
    },
    bankDetails: {
        required: true,
        accountNumber: yup.string(),
        swift: yup.string(),
        bankName: yup.string(),
        email: yup.string().email()
    },
    travelReceipt: {
        url: yup
            .string()
            .url()
            .required(),
        publicId: yup.string().required()
    },
    sumOfReceipts: yup.number().required()
});

export default function index() {
    return (
        <Formik
            initialValues={{}}
            enableReinitialize={true}
            onSubmit={(values) => console.log(values)}
            validationSchema={SignupSchema}
        >
            {formikProps => (
                <React.Fragment>
                    <FastField
                        name="name"
                        render={({ field, form }) => (
                            <FormControl
                                label="Event name"
                                hint="The name of your event"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <TextInput
                                    name="name"
                                    placeholder="Big Hackathon 2020"
                                    value={field.value}
                                    onChange={value => form.setFieldValue(field.name, value)}
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </FormControl>
                        )}
                    />
                    <FastField
                        name="name"
                        render={({ field, form }) => (
                            <FormControl
                                label="Date of birth"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <TextInput
                                    name="name"
                                    placeholder="dd.mm.yyyy"
                                    value={field.value}
                                    onChange={value => form.setFieldValue(field.name, value)}
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </FormControl>
                        )}
                    />
                    <FastField
                        name="name"
                        render={({ field, form }) => (
                            <FormControl
                                label="Event name"
                                hint="The name of your event"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <TextInput
                                    name="name"
                                    placeholder="Big Hackathon 2020"
                                    value={field.value}
                                    onChange={value => form.setFieldValue(field.name, value)}
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </FormControl>
                        )}
                    />
                    <FastField
                        name="name2"
                        render={({ field, form }) => (
                            <FormControl
                                label="Event name"
                                hint="The name of your event"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <Select
                                    label="terve"
                                    value={field.value}
                                    onChange={value => form.setFieldValue(field.name, value)}
                                    onBlur={() => form.setFieldTouched(field.name)}
                                    options={[
                                        {
                                            label: "moikku",
                                            value: "moikku",
                                        },
                                        {
                                            label: "terkku",
                                            value: "terkku"
                                        }
                                    ]}
                                />
                            </FormControl>
                        )}
                    />
                    <Field
                        name="Birthday2"
                        render={({ field, form }) => (
                            <FormControl
                                label="Birthday"
                                hint="Enter your birthday"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <Select
                                    label="day"
                                    value={field.value}
                                    onChange={value => form.setFieldValue(field.name, value)}
                                    onBlur={() => form.setFieldTouched(field.name)}
                                    options="day"
                                />
                                <Select
                                    label="month"
                                    value={field.value}
                                    onChange={value => form.setFieldValue(field.name, value)}
                                    onBlur={() => form.setFieldTouched(field.name)}
                                    options="month"
                                />
                                <Select
                                    label="year"
                                    value={field.value}
                                    onChange={value => form.setFieldValue(field.name, value)}
                                    onBlur={() => form.setFieldTouched(field.name)}
                                    options="year"
                                />
                            </FormControl>
                        )}
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={formikProps.submitForm}
                    >
                        Submit
                    </Button>
                </React.Fragment>
            )}
        </Formik>
    )
}
