import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useTheme } from '../theme'
import { Header } from '../components/header'
import { InputBar } from '../components/input-bar'
import { Spinner } from '../components/spinner'

const Home = () => {
  const navigate = useNavigate()
  const { colors } = useTheme()

  const handleSubmit = useCallback((text: string) => {
    navigate("/sessions/new", { state: { message: text }})
  }, [navigate])


  return(
           <box 
      alignItems="center"
      justifyContent="center"
      gap={2}
      flexGrow={1}
      position="relative"
      backgroundColor={colors.background}
      width="100%" height="100%">

        <Header />
        <box width="100%" maxWidth={78} paddingX={2} >
           <InputBar onSubmit={handleSubmit} />
        </box>
    </box>)
}

export default Home