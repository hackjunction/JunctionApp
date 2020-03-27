import React from 'react'
import { useTranslation } from 'react-i18next';

const BlockExitIfDirty = props => {
    function unloadPage() {
        if (props.dirty) {
            return t('Unsaved_changes_')
        }
    }
const { t, i18n } = useTranslation();
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
