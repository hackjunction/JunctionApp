import React from 'react'

import { Badge } from '@material-ui/core'
import Button from 'components/generic/Button'

const ToggleFavorites = ({ count, active, onChange }) => {
    return (
        <Badge badgeContent={!active ? count : 0} color="secondary">
            <Button
                className={'tw-w-full'}
                variant={'contained'}
                onClick={onChange}
            >
                {active ? 'Back to search' : 'Your favorites'}
            </Button>
        </Badge>
    )
}

export default ToggleFavorites
