import Switch from '../Switch'
import React from 'react'

const SectionSwitch = ({ onChange, checked }) => {
    return (
        <div className="tw-flex tw-items-center tw-cursor-pointer">
            <Switch onChange={onChange} checked={checked} />
        </div>
    )
}

export default SectionSwitch
