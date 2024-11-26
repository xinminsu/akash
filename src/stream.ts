#!/usr/bin/env -S npm run tsn -T

import OpenAI from 'openai';
import { BASEURL } from './model';
import 'dotenv/config'
import modelName from './program';

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: BASEURL
});

async function main() {
  const runner = openai.beta.chat.completions
    .stream({
      model: modelName,
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
