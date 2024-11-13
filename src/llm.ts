import { zodFunction } from "openai/helpers/zod"
import type { AIMessage } from "../types"
import { openai } from "./ai"

export const runllm = async ({
  messages,
  tools,
}: {
  messages: AIMessage[]
  tools: any[]
}) => {
  const formattedTools = tools.map(zodFunction)
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.1,
    tools: formattedTools,
    tool_choice: "auto",
    parallel_tool_calls: true,
  })

  return response.choices[0].message
}
