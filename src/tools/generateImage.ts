import { z } from "zod"
import type { ToolFn } from "../../types"
import { openai } from "../ai"

export const generateImageToolDefinition = {
  name: "generate-image",
  parameters: z
    .object({
      prompt: z
        .string()
        .describe(
          "prompt for the image. Be sure to consider the user's original message when making the prompt. If you are unsure, then as the user to provide more details."
        ),
    })
    .describe("Generates an image based on a prompt using DALL-E 3"),
}

type Args = z.infer<typeof generateImageToolDefinition.parameters>

export const generateImage: ToolFn = async ({ toolArgs, userMessage }) => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: toolArgs.prompt,
    n: 1,
    size: "1024x1024",
  })
  return response.data[0].url
}
