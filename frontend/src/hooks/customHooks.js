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

export const useArray = initialValue => {
    const [value, setValue] = useState(initialValue);

    if (!Array.isArray(value)) {
        throw new Error('useArray cannot be provided a non-array value');
    }

    const addValue = useCallback(
        item => {
            setValue(value.concat(item));
        },
        [value]
    );

    const removeValue = useCallback(
        index => {
            const newValue = [...value];
            newValue.splice(index, 1);
            setValue(newValue);
        },
        [value]
    );

    const editValue = useCallback(
        (index, edited) => {
            const newValue = [...value];
            newValue[index] = edited;
            setValue(newValue);
        },
        [value]
    );

    return [value, addValue, removeValue, editValue];
};

export const useInitialFocus = ref => {
    useEffect(() => {
        ref.current.focus();
    }, [ref]);
};
