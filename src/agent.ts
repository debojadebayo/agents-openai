import { addMessages, getMessages, saveTool } from "./memory"
import { runllm } from "./llm"
import { showLoader, logMessage } from "./ui"
import { runTool } from "./toolRunner"
import type { z } from "zod"

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: { name: string; parameters: z.AnyZodObject }[]
}) => {
  //first adds user message to db
  await addMessages([{ role: "user", content: userMessage }])

  const loader = showLoader("Hang on there buddy, I'm thinking...")

  //runs while loop until there are no more tool calls
  while (true) {
    const chatHistory = await getMessages()

    //runs llm with chat history and function tools
    const res = await runllm({ messages: chatHistory, tools })
    await addMessages([res])

    if (res.content) {
      loader.stop()
      logMessage(res)
      return getMessages()
    }

    //runs if tool calls are present
    if (res.tool_calls) {
      const toolCall = res.tool_calls[0]
      logMessage(res)
      loader.update(`Running tool ${toolCall.function.name}`)

      const toolResponse = await runTool(toolCall, userMessage)
      await saveTool(toolCall.id, toolResponse)
      loader.update(`Tool ${toolCall.function.name} completed`)
    }
  }
}
