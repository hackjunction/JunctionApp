import React, { useCallback } from 'react'

import FormControl from 'components/inputs/FormControl'
import BooleanInput from 'components/inputs/BooleanInput'
import TextInput from 'components/inputs/TextInput'
import config from 'constants/config'

const DiscordConfig = ({ value = {}, onChange }) => {
    const { enabled, inviteLink } = value

    const handleChange = useCallback(
        (fieldName, fieldValue) => {
            onChange({
                ...value,
                [fieldName]: fieldValue,
            })
        },
        [value, onChange]
    )

    return (
        <React.Fragment>
            <FormControl
                label="Discord"
                hint={`Are you using the ${config.PLATFORM_OWNER_NAME} Discord server for communication at this event?`}
            >
                <BooleanInput
                    value={enabled || false}
                    onChange={value => handleChange('enabled', value)}
                />
            </FormControl>
            {enabled && (
                <FormControl hint="Participant invite link">
                    <TextInput
                        placeholder="https://discorg.gg/..."
                        value={inviteLink}
                        onChange={value => handleChange('inviteLink', value)}
                    />
                </FormControl>
            )}
        </React.Fragment>
    )
}

export default DiscordConfig
