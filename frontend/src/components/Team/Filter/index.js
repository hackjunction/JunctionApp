import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'components/inputs/Select'
import Button from 'components/generic/Button'

export default ({ filterArray = [], noFilterOption = 'All', onChange }) => {
    const [filter, setFilter] = useState(noFilterOption)
    const formatedFilterArray = [
        { value: noFilterOption, label: noFilterOption },
        ...filterArray.map(option => ({ value: option, label: option })),
    ]

    const handleChange = event => {
        // console.log('filter event from component', event.target.value)
        setFilter(event.target.value)
    }

    const resetFilters = () => {
        setFilter(noFilterOption)
    }

    if (onChange) {
        useEffect(() => {
            console.log('filter component', filter)
            onChange(filter)
        }, [filter])
    }

    return (
        <div className="tw-justify-end tw-flex tw-items-center tw-gap-2">
            {filter !== noFilterOption && (
                <Button onClick={resetFilters}>Reset filter</Button>
            )}
            <div className="tw-inline-block tw-relative tw-w-64">
                <select
                    value={filter}
                    onChange={handleChange}
                    className="tw-appearance-none tw-rounded-lg tw-p-2 tw-border-solid tw-cursor-pointer hover:tw-bg-gray-200 tw-bg-gray-100 tw-border-gray-300 tw-transition tw-duration-150 tw-outline-none tw-text-lg tw-w-full "
                >
                    {formatedFilterArray.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700">
                    <svg
                        className="tw-fill-current tw-h-4 tw-w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

{
    /* <div className="tw-inline-block tw-relative tw-w-64">
                <select
                    value={filter}
                    onChange={handleChange}
                    className="tw-appearance-none tw-rounded-lg tw-p-2 tw-border-solid tw-cursor-pointer hover:tw-bg-gray-200 tw-bg-gray-100 tw-border-gray-300 tw-transition tw-duration-150 tw-outline-none tw-text-lg tw-w-full "
                >
                    <option value={noFilterOption} disabled>
                        {noFilterOption}
                    </option>
                    {[1, 2, 3, 4, 5].map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <div className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700">
                    <svg
                        className="tw-fill-current tw-h-4 tw-w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
            <div className="tw-inline-block tw-relative tw-w-64">
                <select className="tw-block tw-appearance-none tw-w-full tw-bg-white tw-border tw-border-gray-400 hover:tw-border-gray-500 tw-px-4 tw-py-2 tw-pr-8 tw-rounded tw-shadow tw-leading-tight tw-focus:outline-none tw-focus:shadow-outline">
                    <option>
                        Really long option that will likely overlap the chevron
                    </option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                </select>
                <div className="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700">
                    <svg
                        className="tw-fill-current tw-h-4 tw-w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div> */
}

{
    /* <div>
            <Formik
                initialValues={{ filterCategory: filter }}
                enableReinitialize={true}
                onSubmit={() => {}}
            >
                {formikProps => (
                    <FastField
                        name={filterCategory}
                        render={({ field, form }) => (
                            <>
                                <Select
                                    label="Choose the role/s to apply for"
                                    value={field.value}
                                    options={roles}
                                    onChange={value =>
                                        form.setFieldValue(
                                            field.name,
                                            value,
                                        )
                                    }
                                    onBlur={() =>
                                        form.setFieldTouched(field.name)
                                    }
                                    // value={'test'}
                                    // options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                    // onChange={event => handleChange(event)}
                                />
                                <Button onClick={resetFilters}>
                                    Reset filter
                                </Button>
                            </>
                        )}
                    />
                )}
            </Formik>
        </div> */
}
