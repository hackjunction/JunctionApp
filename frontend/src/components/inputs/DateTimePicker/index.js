import React, { useCallback } from 'react';
import './style.scss';

import moment from 'moment-timezone';
import { DatePicker, TimePicker } from 'antd';

const DateTimePicker = ({ value, onChange, onBlur, defaultTime, timezone }) => {
    const momentValue = value && timezone ? moment(value).tz(timezone) : moment().startOf('day');

    const handleDateChange = useCallback(
        mom => {
            if (!mom) {
                onChange(undefined);
            } else {
                const newValue = momentValue.clone();
                newValue.years(mom.years());
                newValue.months(mom.months());
                newValue.date(mom.date());
                onChange(newValue.startOf('minute').format());
            }
        },
        [momentValue, onChange]
    );

    const handleTimeChange = useCallback(
        mom => {
            if (!mom) {
                onChange(undefined);
            } else {
                const newValue = momentValue.clone();
                newValue.hours(mom.hours());
                newValue.minutes(mom.minutes());
                onChange(newValue.startOf('minute').format());
            }
        },
        [momentValue, onChange]
    );

    return (
        <div className="DateTimePicker">
            <div className="DateTimePicker--inputs">
                <DatePicker
                    disabled={!timezone}
                    onBlur={onBlur}
                    className="DateTimePicker--date"
                    onChange={handleDateChange}
                    placeholder="Select day"
                    format="LL"
                    size="large"
                    value={momentValue}
                />
                <TimePicker
                    disabled={!timezone}
                    onBlur={onBlur}
                    className="DateTimePicker--time"
                    onChange={handleTimeChange}
                    placeholder="Select time"
                    minuteStep={5}
                    format="HH:mm"
                    size="large"
                    value={momentValue}
                />
            </div>
        </div>
    );
};

export default DateTimePicker;
