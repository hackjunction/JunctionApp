import React, { useCallback, useEffect } from 'react';
import './style.scss';

import moment from 'moment';
import { DatePicker as AntDatePicker } from 'antd';

const DatePicker = React.memo(({ value, name, setFieldValue, setFieldTouched, validateField, touched }) => {
    useEffect(() => {
        if (!touched) return;
        validateField(name);
    }, [name, touched, validateField, value]);

    const handleDateChange = useCallback(
        mom => {
            const value = mom
                ? mom
                      .startOf('day')
                      .format()
                : undefined;
            setFieldValue(name, value);
            setFieldTouched(name);
        },
        [name, setFieldTouched, setFieldValue]
    );

    return (
        <div className="DatePicker">
            <AntDatePicker
                allowClear
                dropdownClassName="DatePicker--picker"
                onChange={handleDateChange}
                placeholder={'dd.mm.yyyy'}
                format={'DD.MM.YYYY'}
                size="large"
                defaultPickerValue={
                    value
                        ? moment(value)
                        : moment()
                              .year(2000)
                              .startOf('year')
                }
            />
        </div>
    );
});

export default DatePicker;
