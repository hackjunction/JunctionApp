import React from 'react'
import { motion } from 'framer-motion'

const StaggeredListItem = props => {
    const variants = {
        visible: {
            opacity: 1,
            y: 0,
        },
        hidden: {
            opacity: 0,
            y: props.staggerDistance || 50,
        },
    }
    return <motion.div {...props} variants={variants} />
}

export default StaggeredListItem
