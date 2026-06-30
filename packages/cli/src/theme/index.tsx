import { homedir } from "node:os"
import { join } from "node:path"
import { DEFAULT_THEME, THEMES, type Theme, type ThemeColors } from "./theme"
import { mkdir, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { createContext, useCallback, useContext, useState } from "react"

const CONFIG_DIR = join(homedir(), ".autocode")
const THEME_PREFERENCES_PATH = join(CONFIG_DIR, "preferences.json")

type ThemePreferences = {
    themeName: string 
}

function getInitialTheme(): Theme {
    try{
        const preferences = JSON.parse(
            readFileSync(THEME_PREFERENCES_PATH, "utf8")
        ) as Partial<ThemePreferences>
        const savedTheme = THEMES.find((theme) => theme.name === preferences.themeName)
        return savedTheme ?? DEFAULT_THEME
    } catch {
        return DEFAULT_THEME
    }
}

function persistTheme(theme: Theme){
    try{
        mkdirSync(CONFIG_DIR, { recursive: true })
        writeFileSync(
            THEME_PREFERENCES_PATH,
            JSON.stringify({ themeName: theme.name } satisfies ThemePreferences, null, 2),
            "utf8"
        )
    } catch {

    }
}

type ThemeContextValue = {
    colors: ThemeColors,
    currentTheme: Theme, 
    setTheme: (theme: Theme) => void 
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
    const context = useContext(ThemeContext)
    if(!context){
        throw new Error("useTheme must be used inside ThemeProvider")
    }
    return context 
}

type ThemeProviderProps = {
    children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps){
    const [currentTheme, setCurrentTheme] = useState<Theme>(DEFAULT_THEME)

    const setAndSaveTheme = useCallback((theme: Theme) => {
        setCurrentTheme(theme)
        persistTheme(theme)
    }, [])


    const themeValues: ThemeContextValue = {
        colors: currentTheme.colors,
        currentTheme,
        setTheme: setAndSaveTheme
    }
    return(
        <ThemeContext.Provider value={themeValues}>
            {children}
        </ThemeContext.Provider>
    )
}