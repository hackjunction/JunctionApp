import { useState, useCallback } from 'react';

export const useFormField = (initialValue, validate = () => null, initialError = null) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState(initialError);

    const onChange = useCallback(
        e => {
            const value = e.target.value;
            setValue(value);
            if (error) {
                const newError = validate(value);

                if (newError) {
                    setError(newError);
                } else {
                    setError(null);
                }
            }
        },
        [error, validate]
    );

    const reset = useCallback(() => {
        setValue(undefined);
        setError(undefined);
    }, []);

    return {
        value,
        setValue,
        onChange,
        reset,
        error,
        setError,
        validate
    };
};
