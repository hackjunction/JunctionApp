import { withStyles } from '@mui/material/styles'
import { TextField } from '@mui/material'

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
