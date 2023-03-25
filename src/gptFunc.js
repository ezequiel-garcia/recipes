import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_GPT,
});

const openai = new OpenAIApi(configuration);

export async function gptRequest(prompt) {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `With this ingredients: ${prompt} tell me a recipe I can make. `,
      max_tokens: 3000,
      temperature: 0,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    if (response.status === 200) {
      return response?.data?.choices[0].text;
    } else {
      console.log(response);
      throw new Error('error fetching data from chatgpt');
    }
  } catch (e) {
    console.log(e);
    throw new Error('error fetching data from chatgpt');
  }
}
