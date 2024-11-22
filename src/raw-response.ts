#!/usr/bin/env -S yarn tsn -T

import OpenAI from 'openai';
import 'dotenv/config'

// gets API Key from environment variable OPENAI_API_KEY
const client = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: "https://chatapi.akash.network/api/v1"
});

async function main() {
  // getting just raw Response:
  {
    const response = await client.completions
      .create({
        prompt: 'Say this is a test',
        model: 'Meta-Llama-3-1-8B-Instruct-FP8',
      })
      .asResponse();
    console.log(`response headers: `, Object.fromEntries(response.headers.entries()));
    console.log(`response json: `, await response.json());
  }

  // getting the usual return value plus raw Response:
  {
    const { data: completion, response } = await client.completions
      .create({
        prompt: 'Say this is a try',
        model: 'Meta-Llama-3-1-8B-Instruct-FP8',
      })
      .withResponse();
    console.log(`response headers: `, Object.fromEntries(response.headers.entries()));
    console.log(`completion: `, completion);
  }
}

main().catch(console.error);
