import OpenAI from 'openai';
import 'dotenv/config'

const client = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: "https://chatapi.akash.network/api/v1"
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: 'Who are you?' }],
    model: 'Meta-Llama-3-1-8B-Instruct-FP8',
  });

  console.log(chatCompletion.choices[0].message.content)
}

main();
