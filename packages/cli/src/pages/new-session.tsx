import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useTheme } from '../theme'

const NewSession = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { colors } = useTheme()

  const state = location.state as { message: string } | undefined
  
  useEffect(() => {
    if (!state || !state.message) {
        navigate("/", { replace: true })
    }
  }, [navigate, state])

  if (!state?.message) return null
  

  return (
    <box
     flexDirection="column"
     gap={1}
     padding={2}
     flexGrow={1}
    >
        <text fg={colors.primary} >Creating Session...</text>
        <text fg={colors.surface} >{state.message}</text>
    </box>
  )
}

export default NewSession