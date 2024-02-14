import { Grid, makeStyles } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import ProjectStatusInput from 'components/inputs/ProjectStatusInput'
import { FastField } from 'formik'
import React from 'react'

const useStyles = makeStyles(theme => ({
    customGridItem: {
        border: `4px solid ${theme.palette.error.main}`, // Border color from the theme's error palette
        backgroundColor: theme.palette.error.light, // Background color from the theme's error palette
        borderRadius: theme.shape.borderRadius, // Border radius from the theme
    },
}))

const StatusField = ({ props }) => {
    const classes = useStyles()
    return (
        <Grid item xs={12} className={classes.customGridItem}>
            <FastField
                name="status"
                render={({ field, form }) => (
                    <FormControl
                        label="Final or draft"
                        hint="Remember to mark your project as final before the deadline! Draft projects will not be reviewed."
                        touched={
                            form.touched[field.name] || props.submitCount > 0
                        }
                        error={form.errors[field.name]}
                    >
                        <ProjectStatusInput
                            value={field.value}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                        />
                    </FormControl>
                )}
            />
        </Grid>
    )
}

export default StatusField
