#!/usr/bin/env -S npm run tsn -T

import OpenAI from 'openai';
import 'dotenv/config'

// gets API Key from environment variable OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: "https://chatapi.akash.network/api/v1"
});

async function main() {
  const stream = await openai.beta.chat.completions
    .stream({
      model: 'Meta-Llama-3-1-8B-Instruct-FP8',
      messages: [{ role: 'user', content: 'Say this is a test' }],
      stream: true,
      logprobs: true,
    })
    .on('logprobs.content.delta', (logprob) => {
      console.log(logprob);
    });

  console.dir(await stream.finalChatCompletion(), { depth: null });
}

main();
