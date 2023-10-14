import OpenAI from "openai";

const openai = new OpenAI({
  // grabs process.env["OPENAI_API_KEY"]
});

export const getChatCompletion = async (
  systemPrompt: string,
  message: string
): Promise<string> => {
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
    model: "gpt-4",
  };
  const chatCompletion: OpenAI.Chat.ChatCompletion =
    await openai.chat.completions.create(params);
  // TODO: this needs to have error handling, this assumes there is always a valid response
  return chatCompletion?.choices?.[0]?.message?.content ?? "";
};
