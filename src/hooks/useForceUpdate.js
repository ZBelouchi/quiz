import React, { useState } from 'react'

export default function useForceUpdate() {
    const [, updateState] = React.useState()
    const forceUpdate = React.useCallback(() => updateState({}), [])

    return forceUpdate
}

/* useForceUpdate - forces component to re-render

    const forceUpdate = useForceUpdate()

    forceUpdate()
*/