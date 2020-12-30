import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { BlockPicker } from 'react-color'

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    previewCircle: {
        height: 30,
        width: 30,
        border: '1px solid lightgray',
        borderRadius: '50%',
        background: props => props.backgroundColor,
        display: 'inline-block',
        marginRight: 8,
        cursor: 'pointer',
    },
    previewText: {
        padding: '8px 16px',
        background: 'lightgray',
        borderRadius: 6,
        cursor: 'pointer',
    },
    picker: {
        position: 'absolute',
        zIndex: 2,

        '& .block-picker': {
            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 8px !important',
        },
    },
    pageCover: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})

const ColorSelect = ({ onChange = color => {}, value = '' }) => {
    const [isOpen, setIsOpen] = useState(false)
    const classes = useStyles({ backgroundColor: value })

    const togglePicker = () => {
        setIsOpen(!isOpen)
    }

    const onColorChange = color => {
        onChange(color.hex)
        togglePicker()
    }

    return (
        <div>
            <div className={classes.wrapper}>
                <span
                    className={classes.previewCircle}
                    onClick={togglePicker}
                />
                <span className={classes.previewText} onClick={togglePicker}>
                    {value}
                </span>
            </div>
            {isOpen && (
                <div className={classes.picker}>
                    <div className={classes.pageCover} onClick={togglePicker} />
                    <BlockPicker
                        color={value}
                        onChangeComplete={onColorChange}
                    />
                </div>
            )}
        </div>
    )
}

export default ColorSelect
