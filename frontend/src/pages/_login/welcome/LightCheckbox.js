import { withStyles } from '@material-ui/core/styles'
import { Checkbox } from '@material-ui/core'

export default withStyles(theme => ({
    root: {
        '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main,
        },
    },
}))(Checkbox)
