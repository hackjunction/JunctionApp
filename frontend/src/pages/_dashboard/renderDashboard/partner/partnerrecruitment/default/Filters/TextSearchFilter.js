import React from 'react'

import { Box } from '@material-ui/core'
import TextInput from 'components/inputs/TextInput'

const TextSearchFilter = () => {
    return (
        <Box pb={2} pt={2} pr={2} width="300px">
            <TextInput placeholder="Search by name/email" />
        </Box>
    )
}

export default TextSearchFilter
