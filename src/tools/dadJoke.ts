import { z } from "zod"
import type { ToolFn } from "../../types"
import fetch from "node-fetch"

export const dadJokeToolDefinition = {
  name: "dad_joke",
  parameters: z.object({}),
  description: "Gets a random Dad joke",
}

type Args = z.infer<typeof dadJokeToolDefinition.parameters>

export const dadJoke: ToolFn = async ({ toolArgs, userMessage }) => {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  })
  const data = await response.json()
  return data.joke
}
