import React from 'react'
import EventUtils from 'utils/events'

export default ({ event, pageId }) => {
    React.useEffect(() => {
        const wrapper = document.createElement('div')
        wrapper.id = 'custom-scripts'
        const scriptEl = document
            .createRange()
            .createContextualFragment(
                EventUtils.getEventPageScripts(event, pageId),
            )
        wrapper.appendChild(scriptEl)
        document.body.appendChild(wrapper)
        return () => {
            wrapper.remove()
        }
    }, [event, pageId])
    return null
}
