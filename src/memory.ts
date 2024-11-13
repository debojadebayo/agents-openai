import { JSONFilePreset } from "lowdb/node"
import type { AIMessage } from "../types"
import { v4 as uuidv4 } from "uuid"

//type of messages you want to store
export type MessageWithMetadata = AIMessage & {
  id: string
  createdAt: number
}

//array of messages for db schema
type Data = {
  messages: MessageWithMetadata[]
}

export const addMetadata = (message: AIMessage) => {
  return {
    ...message,
    id: uuidv4(),
    createdAt: Date.now(),
  }
}

export const removeMetadata = (message: MessageWithMetadata) => {
  const { id, createdAt, ...rest } = message
  return rest
}

const defaultData: Data = {
  messages: [],
}

export const getDb = async () => {
  const db = await JSONFilePreset<Data>("db.json", defaultData)
  return db
}

//adds messages to db with metadata
export const addMessages = async (messages: AIMessage[]) => {
  const db = await getDb()
  db.data.messages.push(...messages.map(addMetadata))
  await db.write()
}

//gets messages from db, metadata not included
export const getMessages = async () => {
  const db = await getDb()
  return db.data.messages.map(removeMetadata)
}

export const saveTool = async (id: string, toolResponse: string) => {
  return await addMessages([
    {
      role: "tool",
      content: toolResponse,
      tool_call_id: id,
    },
  ])
}
