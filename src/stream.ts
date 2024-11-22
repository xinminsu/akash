#!/usr/bin/env -S npm run tsn -T

import OpenAI from 'openai';
import 'dotenv/config'

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: "https://chatapi.akash.network/api/v1"
});

async function main() {
  const runner = openai.beta.chat.completions
    .stream({
      model: 'Meta-Llama-3-1-8B-Instruct-FP8',
      messages: [{ role: 'user', content: 'Say this is a test' }],
    })
    .on('message', (msg) => console.log(msg))
    .on('content', (diff) => process.stdout.write(diff));

  for await (const chunk of runner) {
    console.log('chunk', chunk);
  }

  const result = await runner.finalChatCompletion();
  console.log(result);
}

main();
