import React from 'react'
import { RedocStandalone } from 'redoc'

export default () => {
    return (
        <RedocStandalone
            specUrl="http://rebilly.github.io/RebillyAPI/openapi.json"
            options={{
                nativeScrollbars: true,
                theme: { colors: { primary: { main: '#dd5522' } } },
            }}
        />
    )
}
