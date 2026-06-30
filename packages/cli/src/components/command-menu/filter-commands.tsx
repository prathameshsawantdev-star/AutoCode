import { COMMANDS } from "./commands"


export function getFilteredCommands (query: string) {
    if (query.length == 0) return COMMANDS
    return COMMANDS.filter(c => c.name.toLocaleLowerCase().startsWith(query.toLowerCase()))
}