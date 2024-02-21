import React, { useEffect, useLayoutEffect } from 'react'
import { useRouteMatch } from 'react-router'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect, useLocation, useParams } from 'react-router-dom'

import PageWrapper from 'components/layouts/PageWrapper'
import * as RecruitmentActions from 'redux/recruitment/actions'
/*import BasicNavBar from 'components/navbars/BasicNavBar'*/
import GlobalNavBar from 'components/navbars/GlobalNavBar'

import SearchPage from './default'
import AdminPage from './admin'
import DetailPage from './id'

export default () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const match = useRouteMatch()


    //console.log(match.url)

    return (
        <Switch>
            <Route exact={true} path={`${match.url}`} component={SearchPage} />
            {/* <Route exact={true} path=`${match.url}/recruitment/admin` component={AdminPage} /> */}
            <Route
                exact={false}
                path={`${match.url}/:id`}
                component={DetailPage}
            />
            <Redirect to={`${match.url}`} />
        </Switch>
    )
}





































// import React, { useEffect, useRef } from 'react'
// import FormControl from '@material-ui/core/FormControl'
// import FormGroup from '@material-ui/core/FormGroup'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Checkbox from '@material-ui/core/Checkbox'
// import { useDispatch, useSelector } from 'react-redux'
// import PageHeader from 'components/generic/PageHeader'
// import GradientBox from 'components/generic/GradientBox'
// import { Grid, Typography } from '@material-ui/core'

// export default () => {




//     return (
//         <>
//             {/* button for DEV to swithc between participant / partner view */}
//             {/* <Button
//                 onClick={() => setIsPartner(!isPartner)}
//                 color="primary"
//                 variant="contained"
//             >
//                 Switch between participant / partner view (only for dev)
//             </Button> */
//             }
//             <div className="recruitment">
//                 <iframe src="/recruitment" width='100%;' height='1500;' frameborder='0'></iframe>
//             </div>
//         </>
//     )
// }