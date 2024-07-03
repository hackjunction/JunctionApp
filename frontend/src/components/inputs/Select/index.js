import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { SelectOptions } from '@hackjunction/shared'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import CancelIcon from '@mui/icons-material/Cancel'

const NoOptionsMessage = props => (
    <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
    >
        {props.children}
    </Typography>
)

NoOptionsMessage.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object.isRequired,
    selectProps: PropTypes.object.isRequired,
}

const inputComponent = ({ inputRef, ...props }) => (
    <div ref={inputRef} {...props} />
)

inputComponent.propTypes = {
    inputRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any.isRequired,
        }),
    ]),
}

const Control = props => {
    const {
        children,
        innerProps,
        innerRef,
        selectProps: { TextFieldProps },
    } = props

    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: 'flex p-0 h-auto',
                    ref: innerRef,
                    children,
                    ...innerProps,
                },
            }}
            {...TextFieldProps}
        />
    )
}

Control.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.shape({
        onMouseDown: PropTypes.func.isRequired,
    }).isRequired,
    innerRef: PropTypes.oneOfType([
        PropTypes.oneOf([null]),
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any.isRequired,
        }),
    ]).isRequired,
    selectProps: PropTypes.object.isRequired,
}

const Option = props => (
    <MenuItem
        ref={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
            fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
    >
        {props.children}
    </MenuItem>
)

Option.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.shape({
        id: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        onMouseMove: PropTypes.func.isRequired,
        onMouseOver: PropTypes.func.isRequired,
        tabIndex: PropTypes.number.isRequired,
    }).isRequired,
    innerRef: PropTypes.oneOfType([
        PropTypes.oneOf([null]),
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any.isRequired,
        }),
    ]).isRequired,
    isFocused: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
}

const Placeholder = props => (
    <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
    >
        {props.children}
    </Typography>
)

Placeholder.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired,
}

const SingleValue = props => (
    <Typography
        className={props.selectProps.classes.singleValue}
        {...props.innerProps}
    >
        {props.children}
    </Typography>
)

SingleValue.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.any,
    selectProps: PropTypes.object.isRequired,
}

const ValueContainer = props => (
    <div className={props.selectProps.classes.valueContainer}>
        {props.children}
    </div>
)

ValueContainer.propTypes = {
    children: PropTypes.node,
    selectProps: PropTypes.object.isRequired,
}

const MultiValue = props => (
    <Chip
        avatar={props.data.icon ? <Avatar src={props.data.icon} /> : null}
        tabIndex={-1}
        label={props.children}
        className={clsx(props.selectProps.classes.chip, {
            [props.selectProps.classes.chipFocused]: props.isFocused,
        })}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
    />
)

MultiValue.propTypes = {
    children: PropTypes.node,
    isFocused: PropTypes.bool.isRequired,
    removeProps: PropTypes.shape({
        onClick: PropTypes.func.isRequired,
        onMouseDown: PropTypes.func.isRequired,
        onTouchEnd: PropTypes.func.isRequired,
    }).isRequired,
    selectProps: PropTypes.object.isRequired,
}

const Menu = props => (
    <Paper
        square
        className={props.selectProps.classes.paper}
        {...props.innerProps}
    >
        {props.children}
    </Paper>
)

Menu.propTypes = {
    children: PropTypes.element.isRequired,
    innerProps: PropTypes.object.isRequired,
    selectProps: PropTypes.object.isRequired,
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
}

const IntegrationReactSelect = ({
    autoFocus,
    disabled,
    innerRef,
    isMulti = false,
    isTeamRoles = false,
    label,
    name,
    onBlur,
    onChange,
    options = [],
    placeholder,
    value,
    allowCreate = false,
}) => {
    const theme = useTheme()
    const inputId = 'select-' + name

    const selectStyles = {
        input: base => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
                font: 'inherit',
            },
        }),
    }

    const _options = useMemo(() => {
        if (Array.isArray(options)) {
            return options
        } else {
            switch (options) {
                case 'country':
                    return SelectOptions.COUNTRIES
                case 'countryCode':
                    return SelectOptions.COUNTRY_CODES
                case 'currency':
                    return SelectOptions.CURRENCIES
                case 'nationality':
                    return SelectOptions.NATIONALITIES
                case 'dietary-restriction':
                    return SelectOptions.DIETARY_RESTRICTIONS
                case 'num-hackathons':
                    return SelectOptions.NUM_HACKATHONS
                case 'gender':
                    return SelectOptions.GENDERS
                case 'industry':
                    return SelectOptions.INDUSTRIES
                case 'language':
                    return SelectOptions.LANGUAGES
                case 'role':
                    return SelectOptions.ROLES
                case 'skill':
                    return SelectOptions.SKILLS
                case 'technology':
                    return SelectOptions.SKILLS_NO_ABSTRACT
                case 'theme':
                    return SelectOptions.THEMES
                case 't-shirt-size':
                    return SelectOptions.T_SHIRT_SIZES
                case 'timezone':
                    return SelectOptions.TIMEZONES
                case 'status':
                    return SelectOptions.STATUSES
                case 'day':
                    return SelectOptions.DAYS
                case 'month':
                    return SelectOptions.MONTHS
                case 'year':
                    return SelectOptions.YEARS
                case 'year-future':
                    return SelectOptions.YEARS_FUTURE
                case 'gradient-list':
                    return SelectOptions.GRADIENT_LIST
                default:
                    return []
            }
        }
    }, [options])

    const transformedOutput = useCallback(
        output => {
            if (!output) return output
            if (isMulti) {
                return output.map(item => item.value)
            } else {
                return output.value
            }
        },
        [isMulti],
    )

    const transformedInput = useMemo(() => {
        if (!value && value !== 0) {
            return ''
        }
        if (isMulti) {
            if (typeof value === 'string') {
                value = value.split(',')
            }
            return value
                .map(item => {
                    const itemValue =
                        isTeamRoles && item?.role ? item.role : item
                    return _options.find(o => o.value === itemValue)
                })
                .filter(item => !!item)
        } else {
            if (Array.isArray(value)) {
                value = value[0]
            }
            return _options.find(o => o.value === value)
        }
    }, [_options, isMulti, value])

    const handleChange = useCallback(
        value => {
            onChange(transformedOutput(value))
        },
        [onChange, transformedOutput],
    )

    const SelectProps = {
        isDisabled: disabled,
        autoFocus,
        styles: selectStyles,
        inputId,
        TextFieldProps: {
            label,
            InputLabelProps: {
                htmlFor: inputId,
                shrink: true,
            },
        },
        placeholder,
        options: _options,
        components,
        value: transformedInput,
        onChange: handleChange,
        onBlur,
        isMulti,
        isTeamRoles,
        ref: innerRef,
    }

    return (
        <div className="flex-grow">
            {allowCreate ? (
                <CreatableSelect {...SelectProps} />
            ) : (
                <Select {...SelectProps} />
            )}
        </div>
    )
}

IntegrationReactSelect.propTypes = {
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    innerRef: PropTypes.any,
    isMulti: PropTypes.bool,
    isTeamRoles: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
        .isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    allowCreate: PropTypes.bool,
}

export default IntegrationReactSelect
