import React, { useCallback, useEffect, useRef } from 'react'
import { useDialog } from '../../providers/dialog'
import { useTheme } from '../../theme'
import { THEMES, type Theme } from '../../theme/theme'
import { DialogSearchList } from '../dialog-search-list'

export const ThemeDialogContent = () => {
    const dialog = useDialog()
    const { setTheme, currentTheme } = useTheme()
    const originalTheme = useRef(currentTheme)
    const confirmedRef = useRef(false)

    useEffect(() => {
        () => {
            if(!confirmedRef) {
                setTheme(originalTheme.current)
            }
        }
    }, [setTheme])

    const handleSelect = useCallback((theme: Theme) => {
        confirmedRef.current = true 
        setTheme(theme)
        dialog.close()
    }, [setTheme, dialog])

    const handleHighlight = useCallback((theme: Theme) => {
        setTheme(theme)
    }, [setTheme])

    return(
        <DialogSearchList 
         items={THEMES}
         onSelect={handleSelect}
         onHighlight={handleHighlight}
         getKey={(i) => i.name}
         placeholder='Search Theme...'
         emptyText='No matching themes'
         filterFn={(t, query) => t.name.toLowerCase().includes(query.toLocaleLowerCase())}
         renderItem={(theme, isSelected) => {
            return(
                <text selectable={false} fg={isSelected ? "black" : "white"}>
                    {
                        theme.name === originalTheme.current.name 
                        ? "\u0020\u2022\u0020"
                        : "\u0020\u0020\u0020"
                    }
                    {theme.name}
                </text>
            )
         }}
        />
    )
}