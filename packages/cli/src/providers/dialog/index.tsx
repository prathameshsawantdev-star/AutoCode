import { createContext, useCallback, useContext, useState } from "react"
import type { DialogConfig } from "./types"
import { useKeyboardLayer } from "../keyboard-layer"
import { Dialog } from "./dialog"

export type DialogContextValue = {
    open: (config: DialogConfig) => void,
    close: () => void  
}

const DialogContext = createContext<DialogContextValue | null>(null)

export function useDialog (): DialogContextValue {
    const context = useContext(DialogContext)
    if(!context){
        throw new Error("useDialog must be used inside the DialogProvider tree")
    }
    return context 
}

export function DialogProvider({ children }: {children: React.ReactNode}) {
    const [currentDialog, setCurrentDialog] = useState<DialogConfig | null>(null)
    const { push, pop } = useKeyboardLayer()

    const close = useCallback(() => {
        setCurrentDialog(null)
        pop("dialog")
    }, [pop])

    const open = useCallback((dialog: DialogConfig) => {
        setCurrentDialog(dialog)
        push("dialog", () => {
            close()
            return true 
        })
    }, [push, close])


    return(
        <DialogContext.Provider value={{ open, close }} >
            <Dialog currentDialog={currentDialog} close={close} />
            {children}
        </DialogContext.Provider>
    )
}