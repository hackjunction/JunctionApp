import FormControl from 'components/inputs/FormControl'
import Container from 'components/generic/Container'
import PageHeader from 'components/generic/PageHeader'
import { FastField, Field, Form, Formik } from 'formik'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'
import BottomBar from 'components/inputs/BottomBar'
import Checkbox from '@material-ui/core/Checkbox'
import {
    Box,
    List,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    CardContent,
    Card,
} from '@material-ui/core'

import Button from 'components/generic/Button'
import Item from 'antd/lib/list/Item'
import { isTeamComplete } from 'redux/dashboard/selectors'

export default () => {
    const [selectedRoles, setSelectedRoles] = useState([])
    const [renderSelectedRoles, setRenderSelectedRoles] = useState(undefined)
    const [disableSelect, setDisableSelect] = useState(false)
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
    const handleCheckboxChange = useCallback(e => {
        if (e.target.checked) {
            console.log(e)
            setSelectedRoles(value => [...value, e.target.value])
        } else {
            setSelectedRoles(value =>
                value.filter(item => item.role !== e.target.value),
            )
        }
    }, [])

    const addSelectedRoles = useCallback(() => {
        setRenderSelectedRoles(1)
        setDisableSelect(true)
    }, [])

    const renderListView = () => {
        if (renderSelectedRoles)
            return (
                <List>
                    {selectedRoles.map((item, index) => (
                        <Card
                            key={index}
                            variant="outlined"
                            style={{ maxWidth: 'max-content' }}
                        >
                            <CardContent>
                                <Typography>{item}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </List>
            )
    }
    console.log(renderSelectedRoles)
    console.log(disableSelect)

    return (
        <>
            <Container>
                <PageHeader
                    heading="Application Form"
                    subheading="Fields marked with * are mandatory"
                />
                <Formik
                    initialValues={{ roles: '', motivationMessage: '' }}
                    enableReinitialize={true}
                    onSubmit={values => console.log(values)}
                    validationSchema={Yup.object().shape({
                        roles: Yup.array().required(),
                        motivation: Yup.string().required(),
                    })}
                >
                    {formikProps => (
                        <>
                            <FastField
                                name="roles"
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
                                                disabled={disableSelect}
                                            >
                                                {roles.map(item => (
                                                    <MenuItem
                                                        key={item.id}
                                                        value={item.role}
                                                    >
                                                        <Checkbox
                                                            value={item.role}
                                                            onChange={e =>
                                                                handleCheckboxChange(
                                                                    e,
                                                                )
                                                            }
                                                        />
                                                        {item.role}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Button
                                            color="outlined_button"
                                            variant="outlined"
                                            onClick={() => addSelectedRoles()}
                                        >
                                            Add selected role
                                        </Button>
                                    </Box>
                                )}
                            />
                            {renderSelectedRoles ? renderListView() : null}
                            <FastField
                                name="motivationMessage"
                                render={({ field, form }) => (
                                    <FormControl
                                        touched={form.touched[field.name]}
                                    >
                                        <h3>Motivation*</h3>
                                        <TextField
                                            variant="filled"
                                            multiline
                                            minRows={8}
                                            style={{ height: '200px' }}
                                            placeholder="Briefly explain what motivates you to join this team"
                                        />
                                        <Typography>
                                            *Your profile information is
                                            automatically included in the
                                            application.
                                        </Typography>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                paddingTop: '50px',
                                                marginTop: '30px',
                                            }}
                                        >
                                            <Button variant="theme_blue">
                                                Apply
                                            </Button>
                                        </div>
                                    </FormControl>
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
