#!/usr/bin/env -S npm run tsn -T

import OpenAI from 'openai';
import 'dotenv/config'

// gets API Key from environment variable OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: "https://chatapi.akash.network/api/v1"
});

async function main() {
  // Non-streaming:
  const completion = await openai.chat.completions.create({
    model: 'Meta-Llama-3-1-8B-Instruct-FP8',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });
  console.log(completion.choices[0]?.message?.content);

  console.log("-------------")
  // Streaming:
  const stream = await openai.chat.completions.create({
    model: 'Meta-Llama-3-1-8B-Instruct-FP8',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: true,
  });
  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || '');
  }
  process.stdout.write('\n');
}

main();
