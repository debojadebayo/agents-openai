# AI Agent with Tool Integration

A TypeScript-based AI agent that can interact with various tools including Reddit posts fetching, dad jokes generation, and DALL-E image generation.
This was built learning from the tutorial from Scott Moss on Frontend Masters so credit to him and go check them out here: https://frontendmasters.com/

## Features

- 🤖 GPT-4 powered AI assistant
- 🔧 Modular tool system
- 🎨 DALL-E image generation
- 📱 Reddit post fetching
- 😄 Dad joke generation
- 💾 Conversation memory persistence

## Prerequisites

- Node.js
- OpenAI API key
- TypeScript

## Installation

1. Clone the repository
2. Install dependencies:
3. Create a `.env` file in the root directory and add your OpenAI API key:

## Usage

Run the agent with a message: npm start "your message here"

## Tools Available

- **Reddit Posts**: Fetches latest posts from Reddit
- **Dad Jokes**: Generates random dad jokes
- **Image Generation**: Creates images using DALL-E 3

## Project Structure

- `/src`
  - `/tools` - Individual tool functions implementations
  - `agent.ts` - Main agent logic
  - `llm.ts` - Language model integration
  - `memory.ts` - Conversation persistence- using lowdb
  - `ui.ts` - Terminal UI components

## Technical Details

- Built with TypeScript
- Uses Zod for runtime type validation
- Implements parallel tool execution
- Persistent conversation storage using LowDB
- Terminal UI with loading indicators

## Dependencies

- OpenAI API
- Zod
- LowDB
- Node-fetch
- Ora (for terminal spinners)
- UUID
- TSX

## License

ISC
