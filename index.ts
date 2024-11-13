import "dotenv/config"
import { runAgent } from "./src/agent"
import { getMessages, addMessages } from "./src/memory"
import { z } from "zod"

const userMessage = process.argv[2]

if (!userMessage) {
  console.error("Please provide a message")
  process.exit(1)
}

const weatherTool = {
  name: "get_current_weather",
  description: "Get the current weather in a given location",
  parameters: z.object({
    reasoning: z.string().describe("why did you pick this tool?"),
  }),
}

await runAgent({ userMessage, tools: [weatherTool] })
