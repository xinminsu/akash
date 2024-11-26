import OpenAI from 'openai';
import 'dotenv/config'
import { BASEURL } from './model';
import modelName from './program';

const client = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: BASEURL
});

async function main() {

  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: 'Who are you?' }],
    model: modelName,
  });

  console.log(chatCompletion.choices[0].message.content)

}

main();
