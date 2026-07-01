import React from 'react'
import { useParams } from 'react-router'

const Session = () => {
  const { id } = useParams()
  return (
    <box
     flexGrow={1}
     padding={2}
    >   
     <text>Session Id: {id}</text>
    </box>
  )
}

export default Session