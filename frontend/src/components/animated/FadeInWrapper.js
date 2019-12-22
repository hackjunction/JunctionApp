import React from 'react'
import { motion } from 'framer-motion'

const FadeInWrapper = props => {
    const variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                when: 'beforeChildren',
                duration: 0.2,
                delay: props.enterDelay || 0,
            },
        },
        hidden: {
            opacity: 0,
            y: props.verticalOffset || 0,
            transition: {
                duration: 0.2,
            },
        },
    }

    return (
        <motion.div
            {...props}
            animate="visible"
            initial="hidden"
            exit="hidden"
            variants={variants}
        />
    )
}

export default FadeInWrapper
