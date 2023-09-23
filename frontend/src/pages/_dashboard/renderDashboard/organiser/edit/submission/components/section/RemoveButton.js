import { faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const RemoveButton = ({ onRemove, label = 'Remove' }) => (
    <label
        className="tw-text-red-500 tw-p-2 tw-transition-150 tw-cursor-pointer tw-flex tw-gap-2 tw-items-center hover:tw-text-red-600"
        onClick={onRemove}
    >
        <FontAwesomeIcon icon={faTrashAlt} onClick={onRemove} size="lg" />
        {label}
    </label>
)

export default RemoveButton
