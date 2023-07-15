// BooleanSwitch.js
import EditableText from '../section/EditableText'
import React from 'react'

const BooleanSwitch = ({ value, onChange, text, setText }) => {
    return (
        <div className="tw-flex tw-items-center">
            <label>
                <input type="checkbox" checked={value} onChange={onChange} />
            </label>
            <EditableText
                value={text}
                save={setText}
                className="tw-mr-2"
                type=""
            />
        </div>
    )
}

export default BooleanSwitch
