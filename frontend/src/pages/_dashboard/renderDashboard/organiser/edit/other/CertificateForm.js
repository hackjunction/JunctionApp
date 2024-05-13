import React, { useState } from 'react'
import PdfUpload from 'components/inputs/PdfUpload'
import { useSelector } from 'react-redux'
import * as OrganiserSelectors from 'redux/organiser/selectors'

import TextInput from 'components/inputs/TextInput'
import { Grid } from '@material-ui/core'
import Select from 'components/inputs/Select'
import { useFormField } from 'hooks/formHooks'
import Button from 'components/generic/Button'
import Switch from 'components/generic/Switch'

const colorList = ['white', 'black', 'red', 'green', 'blue']

const CertificateForm = ({
    value = {
        url: '',
        publicId: '',
        x: 0,
        y: 0,
        color: 'white',
        enableRegistrationId: false,
        registrationIdX: 0,
        registrationIdY: 0,
        registrationIdColor: 'white',
    },
    fieldName,
    setFieldValue,
}) => {
    const event = useSelector(OrganiserSelectors.event)
    const [url, setUrl] = useState(value.url)
    const [publicId, setPublicId] = useState(value.publicId)
    const [x, setX] = useState(value.x)
    const [y, setY] = useState(value.y)

    const colorSelector = useFormField(value?.color || undefined, value => {
        return
    })
    const enableRegistrationId = useFormField(
        value?.enableRegistrationId,
        value => {
            return
        },
    )
    const registrationIdX = useFormField(value.registrationIdX || 0, value => {
        return
    })
    const registrationIdY = useFormField(value.registrationIdY || 0, value => {
        return
    })
    const registrationIdColor = useFormField(
        value.registrationIdColor || 'white',
        value => {
            return
        },
    )

    const handleAdd = () => {
        console.log('publicId', publicId)
        console.log('color', colorSelector.value)
        if (enableRegistrationId.value) {
            setFieldValue(fieldName, {
                url,
                publicId,
                x,
                y,
                color: colorSelector.value,
                enableRegistrationId: enableRegistrationId.value,
                registrationIdX: registrationIdX.value,
                registrationIdY: registrationIdY.value,
                registrationIdColor: registrationIdColor.value,
            })
        } else {
            setFieldValue(fieldName, {
                url,
                publicId,
                x,
                y,
                color: colorSelector.value,
                enableRegistrationId: enableRegistrationId.value,
            })
        }
    }

    return (
        <>
            <PdfUpload
                value={{ url, publicId }}
                onChange={async value => {
                    if (typeof value === 'undefined') {
                        setUrl('')
                        setPublicId('')
                        await setFieldValue(fieldName, {
                            url: '',
                            publicId: '',
                            x: x,
                            y: y,
                        })
                    } else {
                        setUrl(value.url)
                        console.log('url', value.url)
                        setPublicId(value.publicId)
                        await setFieldValue(fieldName, {
                            url: value.url,
                            publicId: value.publicId,
                            x: x,
                            y: y,
                        })
                    }
                }}
                uploadUrl={`/api/upload/events/${event.slug}/certificate`}
            />
            <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={6} md={4}>
                    <TextInput
                        label={'X position for participant name'}
                        type="number"
                        value={x}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        onChange={value => {
                            setX(parseInt(value))
                        }}
                    />
                </Grid>
                <Grid item xs={6} md={4}>
                    <TextInput
                        label={'Y position for participant name'}
                        type="number"
                        value={y}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        onChange={value => {
                            setY(parseInt(value))
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Select
                        label="Text color for participant name"
                        placeholder="Choose color"
                        value={colorSelector.value}
                        onChange={colorSelector.setValue}
                        options={colorList.map(color => ({
                            label: color,
                            value: color,
                        }))}
                    />
                </Grid>
            </Grid>
            <p>Show registration ID on certificate to trace authenticity</p>
            <Switch
                checked={enableRegistrationId.value}
                onChange={enableRegistrationId.setValue}
                checkedText="Enabled"
                uncheckedText="Disabled"
            />
            {enableRegistrationId.value && (
                <Grid container spacing={3} alignItems="flex-end">
                    <Grid item xs={6} md={4}>
                        <TextInput
                            label={'X position for registration ID'}
                            type="number"
                            value={registrationIdX.value}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                            }}
                            onChange={value => {
                                registrationIdX.setValue(parseInt(value))
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <TextInput
                            label={'Y position for registration ID'}
                            type="number"
                            value={registrationIdY.value}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                            }}
                            onChange={value => {
                                registrationIdY.setValue(parseInt(value))
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Select
                            label="Text color for registration ID"
                            placeholder="Choose color"
                            value={registrationIdColor.value}
                            onChange={registrationIdColor.setValue}
                            options={colorList.map(color => ({
                                label: color,
                                value: color,
                            }))}
                        />
                    </Grid>
                </Grid>
            )}
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAdd}
            >
                Save certificate settings
            </Button>
        </>
    )
}

export default CertificateForm
