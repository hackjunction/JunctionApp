import React from 'react';
import { Formik, FastField, Field } from 'formik';
import FormControl from 'components/inputs/FormControl';
import TextInput from 'components/inputs/TextInput';
import Select from 'components/inputs/Select';
import Button from 'components/generic/Button';
import DateInput from 'components/inputs/DateInput';
import StreetAddressForm from 'components/inputs/StreetAddressForm';

import * as yup from 'yup';
import { TravelGrantDetailsValidationSchema as schema } from '@hackjunction/shared';

export default function index() {
    // const example = {
    //     key1: 'value1',
    //     key2: {
    //         key3: 'value3',
    //         key4: {
    //             key6: 'value6'
    //         }
    //     }
    // };
    // REKURSIO!!! KUTSUU ITSEÄÄN FUNCTION SISÄLLÄ!
    // const renderErrors = errors => {
    //     return Object.keys(errors).map(key => {
    //         const value = errors[key];
    //         if (typeof value === 'object') {
    //             return renderErrors(value);
    //         } else {
    //             return <p>{value}</p>;
    //         }
    //     });
    // };

    return (
        <Formik
            initialValues={{
                legalName: {},
                dateOfBirth: {},
                socialSecurityNumber: {},
                address: {},
                bankDetails: {},
                travelReceipt: {}
            }}
            enableReinitialize={true}
            onSubmit={values => console.log(values)}
            validationSchema={props => {
                return yup.lazy(values => {
                    return yup.object().shape(schema);
                });
            }}
        >
            {formikProps => (
                <React.Fragment>
                    {console.log(formikProps)}
                    <FastField
                        name="gender"
                        render={({ field, form }) => (
                            <FormControl
                                label="Gender"
                                hint="Required by authorities"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <Select
                                    label="Gender"
                                    options="gender"
                                    value={field.value}
                                    onChange={value => form.setFieldValue(field.name, value)}
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </FormControl>
                        )}
                    />
                    <FastField
                        name="legalName"
                        render={({ field, form }) => (
                            <FormControl
                                label="Legal name"
                                hint="Enter your full legal name"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <TextInput
                                    label="First name"
                                    value={field.value.firstName}
                                    onChange={value =>
                                        form.setFieldValue(field.name, {
                                            ...field.value,
                                            firstName: value
                                        })
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                                <TextInput
                                    label="Middle name"
                                    value={field.value.middleName}
                                    onChange={value =>
                                        form.setFieldValue(field.name, {
                                            ...field.value,
                                            middleName: value
                                        })
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                                <TextInput
                                    label="Last name"
                                    value={field.value.lastName}
                                    onChange={value =>
                                        form.setFieldValue(field.name, {
                                            ...field.value,
                                            lastName: value
                                        })
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </FormControl>
                        )}
                    />
                    <FastField
                        name="dateOfBirth"
                        render={({ field, form }) => (
                            <FormControl
                                label="Date of birth"
                                hint="Enter your birthday"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <DateInput
                                    value={field.value}
                                    onChange={value => form.setFieldValue(field.name, value)}
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </FormControl>
                        )}
                    />
                    <FastField
                        name="socialSecurityNumber"
                        render={({ field, form }) => (
                            <FormControl
                                label="Social security number"
                                hint="Fill in your social security number and the issuing country"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <Select
                                    label="Issuing country"
                                    value={field.value.issuingCountry}
                                    onChange={value =>
                                        form.setFieldValue(field.name, {
                                            ...field.value,
                                            issuingCountry: value
                                        })
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                    options="country"
                                />
                                <TextInput
                                    label="Social security number"
                                    value={field.value.number}
                                    onChange={value =>
                                        form.setFieldValue(field.name, {
                                            ...field.value,
                                            number: value
                                        })
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </FormControl>
                        )}
                    />
                    <Field
                        name="address"
                        render={({ field, form }) => (
                            <FormControl
                                label="Address"
                                hint="Fill in address details"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <StreetAddressForm
                                    value={field.value}
                                    onChange={value => form.setFieldValue(field.name, value)}
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </FormControl>
                        )}
                    />
                    <FastField
                        name="bankDetails"
                        render={({ field, form }) => (
                            <FormControl
                                label="Bank details"
                                hint="Fill in bank details"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <TextInput
                                    label="Account number"
                                    value={field.value.accountNumber}
                                    onChange={value =>
                                        form.setFieldValue(field.name, {
                                            ...field.value,
                                            accountNumber: value
                                        })
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                                <TextInput
                                    label="Swift"
                                    value={field.value.swift}
                                    onChange={value =>
                                        form.setFieldValue(field.name, {
                                            ...field.value,
                                            swift: value
                                        })
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                                <TextInput
                                    label="Bank name"
                                    value={field.value.bankName}
                                    onChange={value =>
                                        form.setFieldValue(field.name, {
                                            ...field.value,
                                            bankName: value
                                        })
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                                <TextInput
                                    label="Email address"
                                    value={field.value.email}
                                    onChange={value =>
                                        form.setFieldValue(field.name, {
                                            ...field.value,
                                            email: value
                                        })
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </FormControl>
                        )}
                    />
                    <FastField
                        name="travelReceipt"
                        render={({ field, form }) => (
                            <FormControl
                                label="Travel receipt"
                                hint="Fill in travel receipt details"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <TextInput
                                    label="URL"
                                    value={field.value.url}
                                    onChange={value =>
                                        form.setFieldValue(field.name, {
                                            ...field.value,
                                            url: value
                                        })
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                                <TextInput
                                    label="Public ID"
                                    value={field.value.publicId}
                                    onChange={value =>
                                        form.setFieldValue(field.name, {
                                            ...field.value,
                                            publicId: value
                                        })
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </FormControl>
                        )}
                    />
                    <FastField
                        name="sumOfReceipts"
                        render={({ field, form }) => (
                            <FormControl
                                label="Sum Of receipts"
                                hint="Enter the total sum of your receipts"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <TextInput
                                    label="€"
                                    value={field.value}
                                    onChange={value => form.setFieldValue(field.name, value)}
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </FormControl>
                        )}
                    />
                    {/* {renderErrors(example)} */}
                    <Button color="primary" variant="contained" onClick={formikProps.submitForm}>
                        Submit
                    </Button>
                </React.Fragment>
            )}
        </Formik>
    );
}
