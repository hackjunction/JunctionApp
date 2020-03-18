import { withStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

export default withStyles(theme => ({
    root: {
        '& label': {
            color: 'rgba(255,255,255,0.8)',
        },
        '& input': {
            color: 'white',
        },
    },
}))(TextField)
