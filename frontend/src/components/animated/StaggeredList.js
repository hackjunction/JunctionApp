import React from 'react'
import { motion } from 'framer-motion'

const StaggeredList = props => {
    const variants = {
        visible: {
            opacity: 1,
            transition: {
                delay: props.enterDelay || 0,
                when: 'beforeChildren',
                staggerChildren: props.staggerDelay || 0.1,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                when: 'afterChildren',
                staggerChildren: 0.05,
            },
        },
        collapsed: {
            opacity: 0,
            height: 0,
            overflow: 'hidden',
            transition: {
                when: 'afterChildren',
                staggerChildren: 0.05,
            },
        },
    }
    return (
        <motion.div
            {...props}
            animate={props.animate || 'visible'}
            initial="hidden"
            exit="hidden"
            variants={variants}
        />
    )
}

export default StaggeredList
