#!/usr/bin/env -S npm run tsn -T

import OpenAI from 'openai';
import 'dotenv/config';
import {  BASEURL } from './model';
import modelName from './program';

// gets API Key from environment variable OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: BASEURL
});

async function main() {
  const stream = await openai.beta.chat.completions
    .stream({
      model: modelName,
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
