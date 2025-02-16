import React from 'react'

import { Route, Routes } from 'react-router-dom'

import EventDetailRouter from './slug'
import PastEvents from './past'

export default () => {
    return (
        <Routes>
            <Route path={`:slug/*`} element={<EventDetailRouter />} />
            <Route index element={<PastEvents />} />
        </Routes>
    )
}
