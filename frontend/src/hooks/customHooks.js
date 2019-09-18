import { useState } from 'react';

export const useStateWithReset = initialValue => {
    const [value, setValue] = useState(initialValue);
    const resetValue = () => setValue(initialValue);

    return [value, setValue, resetValue];
};
