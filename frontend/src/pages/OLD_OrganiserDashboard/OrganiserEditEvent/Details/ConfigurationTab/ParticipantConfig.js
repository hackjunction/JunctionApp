import React, { useCallback } from 'react';

import FormControl from 'components/inputs/FormControl';
import BooleanInput from 'components/inputs/BooleanInput';
import TextInput from 'components/inputs/TextInput';

const ParticipantConfig = ({ value = {}, onChange }) => {
    const { limit, reviewEnabled } = value;

    const handleChange = useCallback(
        (fieldName, fieldValue) => {
            onChange({
                ...value,
                [fieldName]: fieldValue
            });
        },
        [value, onChange]
    );

    return (
        <React.Fragment>
            <FormControl
                label="Participants"
                hint="Do you want to review registrations before allowing participants in? If not, all applicants will be automatically accepted."
            >
                <BooleanInput value={reviewEnabled || false} onChange={value => handleChange('reviewEnabled', value)} />
            </FormControl>
            {!reviewEnabled && (
                <FormControl hint="What is the maximum amount of participants?">
                    <TextInput
                        type="number"
                        placeholder="Please enter an amount"
                        value={limit}
                        onChange={value => handleChange('limit', value)}
                    />
                </FormControl>
            )}
        </React.Fragment>
    );
};

export default ParticipantConfig;
