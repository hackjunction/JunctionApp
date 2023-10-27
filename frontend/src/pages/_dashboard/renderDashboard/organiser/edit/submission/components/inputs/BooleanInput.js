import React from 'react'
import Switch from '../../../../../../../../components/generic/Switch'

const BooleanInput = ({ checked, onChange }) => {
    return (
        <Switch
            checked={checked}
            onChange={onChange}
            label="This is a switch"
        />
    )
}

export default BooleanInput
