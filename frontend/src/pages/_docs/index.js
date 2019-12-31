import React from 'react'
import { RedocStandalone } from 'redoc'

export default () => {
    return (
        <RedocStandalone
            specUrl="/api/docs/json"
            options={{
                nativeScrollbars: true,
                theme: { colors: { primary: { main: '#dd5522' } } },
            }}
        />
    )
}
