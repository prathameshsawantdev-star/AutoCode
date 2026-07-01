import React from 'react'
import { InputBar } from '../input-bar'
import { TextAttributes } from '@opentui/core'
import { Spinner } from '../spinner'
type Props = {
    children?: React.ReactNode,
    onSubmit: (input: string) => void, 
    inputDisabled?: boolean, 
    loading?: boolean 
}

const SessionShell = ({ children, onSubmit, inputDisabled = false, loading = false }: Props) => {
  return (
    <box
     flexDirection="column"
     flexGrow={1}
     width="100%"
     height="100%"
     paddingY={1}
     paddingX={2}
     gap={1}
    >
     <scrollbox flexGrow={1} width="100%" stickyScroll stickyStart="bottom">
        <box gap={1}>
            {children}
        </box>
     </scrollbox>
     <box flexShrink={0} width="100%">
        <InputBar onSubmit={onSubmit} disabled={inputDisabled} />
     </box>
     <box
        flexShrink={0}
        flexDirection="row"
        justifyContent="space-between"
        width="100%"
        height={1}
        gap={2}
        paddingLeft={2}
    >
      <box flexDirection="row" alignItems="center" gap={2}>
        <box flexDirection="row" alignItems="center" gap={2}>
          {loading ? <Spinner />: null} 
        </box>
        <box flexDirection="row" gap={1} marginLeft="auto" flexShrink={0}>
          <text>tab</text>
          <text attributes={TextAttributes.DIM}>agents</text>
        </box>
      </box>
     </box>
    </box>
  )
}

export default SessionShell