import { useState, useCallback } from 'react';

export const useStateWithReset = initialValue => {
    const [value, setValue] = useState(initialValue);
    const resetValue = () => setValue(initialValue);

    return [value, setValue, resetValue];
};

export const useToggle = initialValue => {
    const [value, setValue] = useState(initialValue);
    const toggleValue = useCallback(() => {
        setValue(!value);
    }, [value]);

    return [value, toggleValue];
};
