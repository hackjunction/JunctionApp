import React from 'react'
import { useResolvedPath } from 'react-router'
import { Routes, Route, Navigate } from 'react-router-dom'

import SearchPage from './default'
import DetailPage from './id'
// TODO rework admin page to allow partners to manage their own teams
// import AdminPage from './admin'

export default () => {
    // const dispatch = useDispatch()
    // const location = useLocation()
    const url = useResolvedPath('').pathname

    //console.log(match.url)

    return (
        <Routes>
            <Route exact={true} path={`${url}`} component={SearchPage} />
            <Route exact={false} path={`${url}/:id`} component={DetailPage} />
            {/* <Route exact={true} path=`${url}/recruitment/admin` component={AdminPage} /> */}
            <Navigate to={`${url}`} />
        </Routes>
    )
}
