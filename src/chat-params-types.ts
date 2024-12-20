#!/usr/bin/env -S npm run tsn -T

import OpenAI from 'openai';
import { Stream } from 'openai/streaming';
import 'dotenv/config'
import {  BASEURL } from './model';
import modelName from './program';

// gets API Key from environment variable OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: BASEURL
});

async function main() {

  // ---------------- Explicit non-streaming params ------------

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    model: modelName,
    messages: [{ role: 'user', content: 'Say this is a test!' }],
  };
  const completion = await openai.chat.completions.create(params);
  console.log(completion.choices[0]?.message?.content);
  console.log("1-------------")
  // ---------------- Explicit streaming params ----------------

  const streamingParams: OpenAI.Chat.ChatCompletionCreateParams = {
    model: modelName,
    messages: [{ role: 'user', content: 'Say this is a test!' }],
    stream: true,
  };

  const stream = await openai.chat.completions.create(streamingParams);
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
  process.stdout.write('\n');
  console.log("2-------------")
  // ---------------- Explicit (non)streaming types ----------------

  const params1: OpenAI.Chat.ChatCompletionCreateParamsNonStreaming = {
    model: modelName,
    messages: [{ role: 'user', content: 'Say this is a test!' }],
  };

  const params2: OpenAI.Chat.ChatCompletionCreateParamsStreaming = {
    model: modelName,
    messages: [{ role: 'user', content: 'Say this is a test!' }],
    stream: true,
  };

  // ---------------- Implicit params type -------------------

  // Note: the `as const` is required here so that TS can properly infer
  // the right params type.
  //
  // If you didn't include it then you'd also get an error saying that
  // `role: string` is not assignable.
  const streamingParams2 = {
    model: modelName,
    messages: [{ role: 'user' as const, content: 'Say this is a test!' }],
    stream: true as const,
  };

  // TS knows this is a Stream instance.
  const stream2 = await openai.chat.completions.create(streamingParams2);
  for await (const chunk of stream2) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
  process.stdout.write('\n');
  console.log("3-------------")
  // Without the `as const` for `stream`.
  const streamingParams3 = {
    model: modelName,
    messages: [{ role: 'user' as const, content: 'Say this is a test!' }],
    stream: true,
  };

  // TS doesn't know if this is a `Stream` or a direct response
  const response = await openai.chat.completions.create(streamingParams3);
  if (response instanceof Stream) {
    // here TS knows the response type is a `Stream`
  } else {
    // here TS knows the response type is a `ChatCompletion`
  }

  // ---------------- Dynamic params type -------------------

  // TS knows this is a `Stream`
  const streamParamsFromFn = await createCompletionParams(true);
  const streamFromFn = await openai.chat.completions.create(streamParamsFromFn);
  console.log(streamFromFn);
  console.log("4-------------")
  // TS knows this is a `ChatCompletion`
  const paramsFromFn = await createCompletionParams(false);
  const completionFromFn = await openai.chat.completions.create(paramsFromFn);
  console.log(completionFromFn);
  console.log("5-------------")
}

// Dynamically construct the params object while retaining whether or
// not the response will be streamed.
export async function createCompletionParams(
  stream: true,
): Promise<OpenAI.Chat.ChatCompletionCreateParamsStreaming>;
export async function createCompletionParams(
  stream: false,
): Promise<OpenAI.Chat.ChatCompletionCreateParamsNonStreaming>;
export async function createCompletionParams(
  stream: boolean,
): Promise<OpenAI.Chat.ChatCompletionCreateParams> {
  const params = {
    model: modelName,
    messages: [{ role: 'user' as const, content: 'Hello!' }],
    stream: stream,
  };

  // <your logic here>

  return params;
}

main();
