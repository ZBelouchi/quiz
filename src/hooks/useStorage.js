import { useCallback, useState, useEffect } from 'react'

export function useLocalStorage(key, defaultValue) {
    return useStorage(key, defaultValue, window.localStorage)
}
export function useSessionStorage(key, defaultValue) {
    return useStorage(key, defaultValue, window.sessionStorage)
}

function useStorage(key, defaultValue, storageObject) {
    const [value, setValue] = useState(() => {
        const jsonValue = storageObject.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)

        if (typeof defaultValue === 'function') {
            return defaultValue()
        } else {
            return defaultValue
        }
    })

    useEffect(() => {
        if (value === undefined) return storageObject.removeItem(key)
        storageObject.setItem(key, JSON.stringify(value))
    }, [key, value, storageObject])

    const remove = useCallback(() => {
        setValue(undefined)
    }, [])

    return [value, setValue, remove]
}

/* useStorage - simplifies managing local and session storage objects
    import { useLocalStorage, useSessionStorage } from 'useStorage'

    const [local, setLocal, removeLocal] = useLocalStorage(key, value)
    setLocal(newValue)
    removeLocal()
    
    const [session, setSession, removeSession] = useSessionStorage(key, value)
    setSession(newValue)
    removeSession()
*/