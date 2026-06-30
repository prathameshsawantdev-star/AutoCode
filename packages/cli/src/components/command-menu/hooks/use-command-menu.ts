import type { ScrollBoxRenderable } from "@opentui/core"
import { useMemo, useRef, useState, type RefObject } from "react"
import type { Command } from "../types"
import {  getFilteredCommands } from "../filter-commands"
import { useKeyboard } from "@opentui/react"

type UseCommandMenuReturn = {
    showCommandMenu: boolean,
    commandQuery: string, 
    selectedIndex: number, 
    scrollRef: RefObject<ScrollBoxRenderable | null>,
    handleContentChange: (text: string) => void, 
    resolveCommand: (index: number) => Command | undefined, 
    setSelectedIndex: (index: number) => void  
}

export const UseCommandMenu = (): UseCommandMenuReturn => {
    const [textvalue, setTextvalue ] = useState<string>()
    const [showCommandMenu, setshowCommandMenu ] = useState<boolean>(false)
    const scrollRef = useRef<ScrollBoxRenderable>(null)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const commandQuery = showCommandMenu && textvalue?.startsWith("/") ? textvalue : ""
    const filteredCommands = useMemo(() => getFilteredCommands(commandQuery), [commandQuery])

    const handleContentChange = (text: string) => {
        setTextvalue(text)
        setSelectedIndex(0)
        
        const scrollBox = scrollRef.current
        if (scrollBox){
            scrollBox.scrollTo(0)
        }

        const cmdName = text.startsWith("/") ? text : null
        if(cmdName !== null && !cmdName.includes(" ")){
            setshowCommandMenu(true)
        } else {
            setshowCommandMenu(false)
        }
    }

     const resolveCommand = (index: number) => {
            const cmd = filteredCommands[index]
            if(cmd){
                setshowCommandMenu(false)
            }
            return cmd
        }

    useKeyboard((key) => {
        if(!showCommandMenu){
            return 
        }

        if (key.name ==="escape" ){
            key.preventDefault()
            setshowCommandMenu(false)
        } else if (key.name === "up" ){
            key.preventDefault()
            setSelectedIndex((i) => {
                const newIndex = Math.max(0, i - 1)
                const sb = scrollRef.current
                if( sb && newIndex < sb.scrollTop){
                    sb.scrollTo(newIndex)
                }
                return newIndex
            })
        } else if (key.name === "down"){
            key.preventDefault()
            setSelectedIndex((i) => {
                if(filteredCommands.length === 0){
                    return 0
                }

                const newIndex = Math.min(filteredCommands.length - 1, i + 1)
                const sb = scrollRef.current
                if(sb){
                    const viewportHeight = sb.viewport.height
                    const visibleEnd = sb.scrollTop + viewportHeight - 1
                    if(newIndex > visibleEnd){
                        sb.scrollTo(newIndex - viewportHeight + 1)
                    }
                }

                return newIndex
            })
        }
    })

    return {
        showCommandMenu,
        setSelectedIndex,
        commandQuery,
        scrollRef,
        handleContentChange,
        resolveCommand,
        selectedIndex
    }
}