import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useTheme } from '../theme'
import { ErrorMessage } from '../components/message/error-message'
import { BotMessage } from '../components/message/bot-message'
import SessionShell from '../components/message/session-shell'
import { UserMessage } from '../components/message/user-message'

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
   <SessionShell onSubmit={() => {}} inputDisabled loading>
    <UserMessage message={state.message} />
    <BotMessage content="This is simple bot message to demonstrate the session layout" model="opus"  />
    <ErrorMessage message="This is simple error message" /> 
   </SessionShell>
  )
}

export default NewSession