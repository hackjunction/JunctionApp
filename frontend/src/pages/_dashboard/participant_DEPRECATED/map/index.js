import React, { useEffect, useRef } from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from 'components/generic/PageHeader'
import GradientBox from 'components/generic/GradientBox'
import { Grid, Typography } from '@material-ui/core'

export default () => {
    return (
        <>
            {/* button for DEV to swithc between participant / partner view */}
            {/* <Button
                onClick={() => setIsPartner(!isPartner)}
                color="primary"
                variant="contained"
            >
                Switch between participant / partner view (only for dev)
            </Button> */}
            <a href="https://junction.desk.me/hardware">
                Reserve hardware from this link!
            </a>
            <div className="App">
                <h3>Map of dipoli</h3>
                <iframe
                    src="https://junction.desk.me"
                    width="100%;"
                    height="600px;"
                    frameborder="0"
                    scrolling="no"
                ></iframe>
            </div>
        </>
    )
}
