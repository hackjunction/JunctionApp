import { withStyles } from '@mui/material/styles'
import { Checkbox } from '@mui/material'

export default withStyles(theme => ({
    root: {
        '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main,
        },
    },
}))(Checkbox)
