import { BASEURL } from '../src/model';

async function main() {
  try {  
    const baseUrl = BASEURL;
    const apiKey = "sk-A3trwi0Ux_DifEusf9TlmQ";

    const response = await fetch(`${baseUrl}/models`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const res = (await response.json()) as any;

    console.dir(res);

    const result =  res.data.map((model: any) => ({
      name: model.id,
      label: model.id,
      provider: 'OpenAILike',
    }));

    console.dir(result);
  }  catch (e) {
    console.error('Error getting OpenAILike models:', e);

  }
}

main()