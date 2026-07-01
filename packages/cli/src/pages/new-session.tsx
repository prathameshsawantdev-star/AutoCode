import React, { useEffect, useMemo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useTheme } from '../theme'
import { ErrorMessage } from '../components/message/error-message'
import { BotMessage } from '../components/message/bot-message'
import SessionShell from '../components/message/session-shell'
import { UserMessage } from '../components/message/user-message'
import z, { parse } from "zod"
import { useToast } from '../providers/toast'
import { apiClient } from '../../lib/api-client'
import { DEFAULT_CHAT_MODEL_ID } from '@autocode/shared'
import { getErrorMessage } from '../../lib/http-error'

const newSessionStateSchema = z.object({
  message: z.string()
}) 

const NewSession = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { colors } = useTheme()
  const toast = useToast()
  const hasStartedRef = useRef(false)

  const state = useMemo(() => {
    const parsed = newSessionStateSchema.safeParse(location.state)
    return parsed.success ? parsed.data : null 
  }, [location.state])
  
  useEffect(() => {
    if(!state){
      navigate("/", { replace: true })
    }
  }, [navigate, state])

  useEffect(() => {
    if(!state || hasStartedRef.current) return 

    hasStartedRef.current = true 
    let ignore = false 

    const createSession = async () => {
      try{
        const res = await apiClient.sessions.$post({ 
          json: {
            title: state.message.slice(0, 100),
            cwd: process.cwd(),
            initialMessage: {
              role: "USER",
              content: state.message,
              mode: "BUILD",
              model: DEFAULT_CHAT_MODEL_ID
            }
          }
        })

        if (ignore) return 
        if(!res.ok){
          throw new Error(await getErrorMessage(res))
        }
        const session = await res.json()
        navigate(`/session/${session.id}`, { replace: true, state: { session }})

      } catch (error){
        if(ignore) return 
        toast.show({
          variant: "error",
          message: error instanceof Error ? error.message : "Failed to load session"
        })
        navigate("/", { replace: true })
      }
    }

    createSession()

    return () => {
      ignore = true 
    }
  }, [state, navigate, toast])

  if (!state?.message) return null
  

  return (
   <SessionShell onSubmit={() => {}} inputDisabled loading>
    <text>Helllo</text>
   </SessionShell>
  )
}

export default NewSession