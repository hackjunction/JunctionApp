// import { withStyles } from '@mui/material/styles'
import { Checkbox } from '@mui/material'
import { styled } from '@mui/system'

// export default withStyles(theme => ({
//     root: {
//         '& .MuiSvgIcon-root': {
//             color: theme.palette.primary.main,
//         },
//     },
// }))(Checkbox)

export default styled(Checkbox)(theme => ({
    root: {
        '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main,
        },
    },
}))
