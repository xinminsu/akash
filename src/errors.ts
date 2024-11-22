#!/usr/bin/env -S npm run tsn -T

import OpenAI, { NotFoundError } from 'openai';
import 'dotenv/config'

// gets API Key from environment variable OPENAI_API_KEY
const client = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: "https://chatapi.akash.network/api/v1"
});

async function main() {
  try {
    await client.completions.create({
      prompt: 'Say this is a test',
      model: 'Meta-Llama-3-1-8B-Instruct-FP8',
    });
  } catch (err) {
    if (err instanceof NotFoundError) {
      console.log(`Caught NotFoundError!`);
      console.log(err);
      console.log(`message: `, err.message);
      console.log(`code: `, err.code);
      console.log(`type: `, err.type);
      console.log(`param: `, err.param);
    } else {
      console.log(`Raised unknown error`);
      throw err;
    }
  }
}

main();
