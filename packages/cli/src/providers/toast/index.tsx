import { createContext, useCallback, useContext, useRef, useState } from "react"
import { DEFAULT_TOAST_DURATION, type ToastOptions } from "./types"
import { Toast } from "./toast"

export type ToastContextValue = {
    show: (options: ToastOptions) => void 
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToastContext ():ToastContextValue {
    const value =  useContext(ToastContext)
    if (!value)
        throw new Error("Toast must be withing provider")
    return value 
}

type ToastProviderProps = {
    children: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps){
    const [currentToast, setCurrentToast] = useState<ToastOptions | null>(null)
    const timeoutHandleRef = useRef<NodeJS.Timeout | null>(null)

    const clearCurrentTimeout = useCallback(() => {
        if(timeoutHandleRef.current){
            clearTimeout(timeoutHandleRef.current)
            timeoutHandleRef.current = null 
        }
    }, [])

    const show = (toastOptions: ToastOptions) => {
        const duration = toastOptions.duration ?? DEFAULT_TOAST_DURATION
        clearCurrentTimeout()

        setCurrentToast({
            variant: toastOptions.variant ?? "info",
            duration: duration, 
            message: toastOptions.message
        })

        timeoutHandleRef.current = setTimeout(() => {
            setCurrentToast(null)
        }, duration).unref()
    }
    return(
        <ToastContext.Provider  value={{ show }}>
            <Toast currentToast={currentToast} />
            {children}
        </ToastContext.Provider>
    )
}