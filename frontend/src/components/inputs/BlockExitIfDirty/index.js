import React from 'react'

const BlockExitIfDirty = props => {
    function unloadPage() {
        if (props.dirty) {
            return 'You have unsaved changes! Are you sure you want to leave this page?'
        }
    }

    React.useEffect(() => {
        window.onbeforeunload = unloadPage
        window.onpopstate = unloadPage

        return () => {
            window.onbeforeunload = null
            window.onpopstate = null
        }
    })

    return null
}

export default BlockExitIfDirty
