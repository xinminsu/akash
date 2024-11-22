#!/usr/bin/env -S npm run tsn -T

// This file demonstrates how to stream from the server as a text/plain
// response with express and the stream async iterator.

import OpenAI from 'openai';
import express, { Request, Response } from 'express';
import 'dotenv/config'

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: "https://chatapi.akash.network/api/v1"
});
const app = express();

app.use(express.text());

// This endpoint can be called with:
//
//   curl 127.0.0.1:3000 -N -X POST -H 'Content-Type: text/plain' \
//     --data 'Can you explain why dogs are better than cats?'
//
// Or consumed with fetch:
//
//   fetch('http://localhost:3000', {
//     method: 'POST',
//     body: 'Tell me why dogs are better than cats',
//   }).then(async res => {
//     const decoder = new TextDecoder();
//     for await (const chunk of res.body) {
//       console.log(`chunk: ${decoder.decode(chunk)}`);
//     }
//   })
//
app.post('/', async (req: Request, res: Response) => {
  try {
    console.log('Received request:', req.body);

    const stream = await openai.chat.completions.create({
      model: 'Meta-Llama-3-1-8B-Instruct-FP8',
      stream: true,
      messages: [{ role: 'user', content: req.body }],
    });

    res.header('Content-Type', 'text/plain');

    // Sends each content stream chunk-by-chunk, such that the client
    // ultimately receives a single string.
    for await (const chunk of stream) {
      res.write(chunk.choices[0]?.delta.content || '');
    }

    res.end();
  } catch (e) {
    console.error(e);
  }
});

app.listen('3000', () => {
  console.log('Started proxy express server');
});
