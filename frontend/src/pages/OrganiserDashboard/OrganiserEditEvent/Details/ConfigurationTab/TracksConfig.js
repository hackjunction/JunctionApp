import React, { useCallback } from 'react';

import FormControl from 'components/inputs/FormControl';
import BooleanInput from 'components/inputs/BooleanInput';

const TracksConfig = ({ value = {}, onChange }) => {
    const { hasTracks, hasChallenges } = value;

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
            <FormControl label="Tracks & Challenges" hint="Does this event have several different tracks?">
                <BooleanInput value={hasTracks || false} onChange={value => handleChange('hasTracks', value)} />
            </FormControl>
            <FormControl hint="Does this event have multiple different challenges?">
                <BooleanInput value={hasChallenges || false} onChange={value => handleChange('hasChallenges', value)} />
            </FormControl>
        </React.Fragment>
    );
};

export default TracksConfig;
