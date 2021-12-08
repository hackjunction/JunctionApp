import React, { useState } from 'react'
import PdfUpload from 'components/inputs/PdfUpload'
import { useSelector } from 'react-redux'
import * as OrganiserSelectors from 'redux/organiser/selectors'

import TextInput from 'components/inputs/TextInput'

const CertificateForm = ({
    value = {
        url: '',
        publicId: '',
        x: 0,
        y: 0,
    },
    fieldName,
    setFieldValue,
}) => {
    const event = useSelector(OrganiserSelectors.event)
    const [url, setUrl] = useState(value.url)
    const [publicId, setPublicId] = useState(value.publicId)

    //TODO: Add validation
    const [x, setX] = useState(value.x)
    const [y, setY] = useState(value.y)

    return (
        <>
            <PdfUpload
                value={{ url, publicId }}
                onChange={value => {
                    if (typeof value === 'undefined') {
                        console.log('undefined')
                        setUrl('')
                        setPublicId('')
                    } else {
                        setUrl(value.url)
                        console.log('url', value.url)
                        setPublicId(value.publicId)
                        setFieldValue(fieldName, {
                            url: value.url,
                            publicId: value.publicId,
                            x: x,
                            y: y,
                        })
                    }
                }}
                uploadUrl={`/api/upload/events/${event.slug}/certificate`}
            />
            <TextInput
                value={x}
                onChange={value => {
                    setX(value)
                    setFieldValue(fieldName, {
                        url,
                        publicId,
                        x,
                        y,
                    })
                }}
            />
            <TextInput
                value={y}
                onChange={value => {
                    setY(value)
                    setFieldValue(fieldName, {
                        url,
                        publicId,
                        x,
                        y,
                    })
                }}
            />
        </>
    )
}

export default CertificateForm
