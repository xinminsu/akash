#!/usr/bin/env -S npm run tsn -T

import OpenAI, { NotFoundError } from 'openai';
import 'dotenv/config'
import {  BASEURL } from './model';
import modelName from './program';

// gets API Key from environment variable OPENAI_API_KEY
const client = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: BASEURL
});

async function main() {
  try {
    await client.completions.create({
      prompt: 'Say this is a test',
      model: modelName,
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
