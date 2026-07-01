import "opentui-spinner/react"
import { useTheme } from "../theme"

export function Spinner(){
    const { colors } = useTheme() 

    return( 
        <spinner name="aesthetic" color={colors.primary} />
    )
}