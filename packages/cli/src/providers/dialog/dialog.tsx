import { useKeyboard, useTerminalDimensions } from "@opentui/react"
import { useKeyboardLayer } from "../keyboard-layer"
import type { DialogConfig } from "./types"
import { RGBA, TextAttributes } from "@opentui/core"

type DialogProps = {
    currentDialog: DialogConfig | null,
    close: () => void 
}

export function Dialog({ currentDialog, close }: DialogProps){
    const { isTopLevel } = useKeyboardLayer()
    const dimensions = useTerminalDimensions()

    useKeyboard((key) => {
        if(!currentDialog && !isTopLevel("dialog")) return 

        if (key.name === "escape"){
            close()
        }
    })

    if(!currentDialog){
        return null 
    }

    const { title, children } = currentDialog

    return(
        <box
         position="absolute"
         left={0}
         top={0}
         width={dimensions.width}
         height={dimensions.height}
         justifyContent="center"
         alignItems="center"
         backgroundColor={RGBA.fromInts(0, 0, 0, 150)}
         zIndex={100}
         onMouseDown={() => close()}
        >
            <box
             width={Math.min(60, dimensions.width - 6)}
             height="auto"
             backgroundColor="#1a1a24"
             paddingX={4}
             paddingY={1}
             flexDirection="column"
             gap={1}
             onMouseDown={(e) => e.stopPropagation()}
            >
                <box
                 flexDirection="row"
                 justifyContent="space-between"
                 alignItems="center"
                 paddingBottom={1}
                >
                    <text attributes={TextAttributes.BOLD} >
                        {title}
                    </text>
                    <text attributes={TextAttributes.DIM} onMouseDown={() => close()} >
                        esc 
                    </text>
                </box>
                <box flexGrow={1}>
                    {children}
                </box>
            </box>
        </box>
    )

}