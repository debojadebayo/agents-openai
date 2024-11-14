import type OpenAI from "openai"
import { redditPosts } from "./tools/reddit"
import { dadJoke } from "./tools/dadJoke"
import { generateImage } from "./tools/generateImage"

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || "{}"),
  }

  switch (toolCall.function.name) {
    case "get_reddit_posts":
      return redditPosts(input)
    case "dad_joke":
      return dadJoke(input)
    case "generate_image":
      const imageUrl = await generateImage(input)
      return `Here is the image: ${imageUrl}`
    default:
      throw new Error(`Tool ${toolCall.function.name} not found`)
  }
}
