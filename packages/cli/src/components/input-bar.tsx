import type { KeyBinding } from "@opentui/core"
import { EmptyBorder } from "./border"
import StatusBar from "./status-bar"

type Props = {
    onSubmit: (text: string) => void, 
    disabled?: boolean 
}

const TEXTAREA_KEYBINDINGS: KeyBinding[] = [
    { name: "return", action: "submit" },
    { name: "enter", action: "submit" },
    { name: "return", shift: true, action: "newline"},
    { name: "enter", shift: true, action: "newline" }
] 

const InputBar = ({ onSubmit, disabled = false }: Props) => {
  return (
    <box width="100%" alignItems="center">
        <box
          border={["left"]}
          borderColor="cyan"
            customBorderChars={{
          ...EmptyBorder,
          vertical: "┃",
          bottomLeft: "╹",
        }}
        >
            <box
             width="100%"
             position="relative"
             justifyContent="center"
             paddingX={2}
             paddingY={1}
             gap={1}
             backgroundColor="#1A1A24"
            >
                <textarea  keyBindings={TEXTAREA_KEYBINDINGS} focused={!disabled} placeholder={"Ask anything, Fix the bug in the database"} />
                <StatusBar />
            </box>
        </box>
    </box>
  )
}

export default InputBar