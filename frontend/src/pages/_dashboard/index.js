import React, { useEffect } from 'react'
import { useResolvedPath } from 'react-router'
import { Route, Routes, Navigate } from 'react-router-dom'
import SlugPage from './renderDashboard'
import DefaultPage from './renderDashboard/default'
import { useDispatch } from 'react-redux'

export default () => {
    const url = useResolvedPath("").pathname;
    const dispatch = useDispatch()

    //redirect to right event page, default, or out
    return (
        <Routes>
            <Route
                exact={false}
                path={
                    `${match.path}/event/:slug` /*TODO: pass correct event and role and create default case*/
                }
                component={SlugPage}
            />
            <Route
                exact={false}
                path={
                    `${match.path}/default` /*TODO: pass correct event and role and create default case*/
                }
                component={DefaultPage}
            />
            {/* For all other routes, redirect outta here */}
            <Navigate to="/home" />
        </Routes>
    )
}
