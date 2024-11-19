import React, { useEffect } from 'react'
import { useResolvedPath } from 'react-router'
import { Route, Routes, Navigate } from 'react-router-dom'
// import SlugPage from './renderDashboard'
import DefaultPage from './renderDashboard/default'
import { useDispatch } from 'react-redux'

export default () => {
    const url = useResolvedPath('').pathname
    const dispatch = useDispatch()

    //redirect to right event page, default, or out
    return (
        <Routes>
            <Route path="default/*" element={<DefaultPage />} />
            {/* For all other routes, redirect outta here */}
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    )
}

//<Route
//                  exact={false}
//                path={
//                  `${url}/event/:slug` /*TODO: pass correct event and role and create default case*/
//            }
//          component={SlugPage}
//    />
