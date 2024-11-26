#!/usr/bin/env -S yarn tsn -T

import OpenAI from 'openai';
import 'dotenv/config';
import {  BASEURL } from './model';
import modelName from './program';

// gets API Key from environment variable OPENAI_API_KEY
const client = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: BASEURL
});

async function main() {
  // getting just raw Response:
  {
    const response = await client.completions
      .create({
        prompt: 'Say this is a test',
        model: modelName,
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
        model: modelName,
      })
      .withResponse();
    console.log(`response headers: `, Object.fromEntries(response.headers.entries()));
    console.log(`completion: `, completion);
  }
}

main().catch(console.error);
