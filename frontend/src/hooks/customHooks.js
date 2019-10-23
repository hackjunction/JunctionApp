import { useState, useCallback, useEffect } from 'react';

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

export const useInitialFocus = ref => {
    useEffect(() => {
        ref.current.focus();
    }, [ref]);
};
