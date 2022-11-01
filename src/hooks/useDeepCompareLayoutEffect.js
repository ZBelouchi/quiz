import { useLayoutEffect, useRef } from "react"
import isEqual from "lodash/fp/isEqual"

export default function useDeepCompareLayoutEffect(callback, dependencies) {
    const currentDependenciesRef = useRef()

    if (!isEqual(currentDependenciesRef.current, dependencies)) {
        currentDependenciesRef.current = dependencies
    }

    useLayoutEffect(callback, [currentDependenciesRef.current])
}



/* useDeepCompareLayoutEffect - works like useLayoutEffect, but checks dependencies' values instead of reference
    
    useDeepCompareLayoutEffect(callback, dependencies)
*/