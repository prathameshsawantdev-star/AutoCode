import React from 'react'
import { useParams } from 'react-router'
import SessionShell from '../components/message/session-shell'

const Session = () => {
  const { id } = useParams()
  return (
   <SessionShell onSubmit={() => {}} loading inputDisabled>
    {id}
   </SessionShell>
  )
}

export default Session