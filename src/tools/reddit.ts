import { z } from "zod"
import type { ToolFn } from "../../types"
import fetch from "node-fetch"

export const redditToolDefinition = {
  name: "get_reddit_posts",
  parameters: z
    .object({})
    .describe(
      "Use this tool to get the latest posts from Reddit. It will return a JSON object with the title, link, subreddit, author, and upvotes of each post."
    ),
  description: "Gets a random Reddit post from a subreddit",
}

type Args = z.infer<typeof redditToolDefinition.parameters>

export const redditPosts: ToolFn = async ({ toolArgs, userMessage }) => {
  const res = await fetch("https://www.reddit.com/r/nba/.json", {
    headers: { Accept: "application/json" },
  }).then((res) => res.json())

  const relevantData = res.data.children.map((child: any) => ({
    title: child.data.title,
    url: child.data.url,
    subreddit: child.data.subreddit,
    author: child.data.author,
    ups: child.data.ups,
  }))

  return JSON.stringify(relevantData, null, 2)
}
