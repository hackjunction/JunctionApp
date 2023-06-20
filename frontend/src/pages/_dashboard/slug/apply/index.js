import FormControl from 'components/inputs/FormControl'
import Container from 'components/generic/Container'
import PageHeader from 'components/generic/PageHeader'
import { FastField, Field, Form, Formik } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import * as Yup from 'yup'
import BottomBar from 'components/inputs/BottomBar'
import Checkbox from '@material-ui/core/Checkbox'
import {
    Box,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core'
import junctionStyle from 'utils/styles'
import Button from 'components/generic/Button'
import { ExtensionOutlined } from '@material-ui/icons'

export default () => {
    const classes = junctionStyle()
    let [selectedRoles, setSelectedRoles] = useState([])
    const [roles, setRoles] = useState([
        {
            id: 1,
            role: 'Manager',
            description: '2-3 years of experience',
        },
        {
            id: 2,
            role: 'UX Designer',
            description: '5 years of experience',
        },
        {
            id: 3,
            role: 'Engineer',
            description: '1 year of experience',
        },
    ])

    const handleCheckboxChange = useCallback(
        (e, id) => {
            if (e.target.checked) {
                setSelectedRoles(value => [...value, e.target.value])
            } else {
                setSelectedRoles(value =>
                    value.filter(item => item !== e.target.value),
                )
            }
        },
        [setSelectedRoles],
    )

    console.log(selectedRoles)

    return (
        <>
            <Container>
                <PageHeader
                    heading="Application Form"
                    subheading="Fields marked with * are mandatory"
                />
                <Formik
                    initialValues={{ roles: '' }}
                    enableReinitialize={true}
                    onSubmit={values => console.log(values)}
                    validationSchema={Yup.object().shape({
                        roles: Yup.string().required(),
                    })}
                >
                    {formikProps => (
                        <>
                            <FastField
                                name="description"
                                render={({ field, form }) => (
                                    <Box
                                        sx={{
                                            maxWidth: 845,
                                            display: 'flex',
                                            alignContent: 'center',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                        <FormControl
                                            touched={form.touched[field.name]}
                                        >
                                            <h2>PINK UNICORN #Fazer</h2>
                                            <InputLabel id="roles-descrption">
                                                Role(s) applied for*
                                            </InputLabel>
                                            <Select
                                                multiple
                                                className="width"
                                                labelId="roles"
                                                id="roles"
                                                value={roles}
                                            >
                                                {roles.map(role => (
                                                    <MenuItem
                                                        key={role.id}
                                                        value={role.role}
                                                    >
                                                        <Checkbox
                                                            value={role.role}
                                                            onChange={e =>
                                                                handleCheckboxChange(
                                                                    e,
                                                                    role.id,
                                                                )
                                                            }
                                                        />
                                                        {role.role}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Button
                                            color="outlined_button"
                                            variant="outlined"
                                        >
                                            Add selected role
                                        </Button>
                                    </Box>
                                )}
                            />
                            <div style={{ height: '100px' }} />
                            <BottomBar
                                onSubmit={formikProps.handleSubmit}
                                errors={formikProps.errors}
                                dirty={formikProps.dirty}
                                loading={`Loading...`}
                            />
                        </>
                    )}
                </Formik>
            </Container>
        </>
    )
}
