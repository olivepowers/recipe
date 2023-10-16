// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getChatCompletion } from "@web/lib/openai";
import { getRecipePrompt, systemPrompt } from "@web/lib/prompts";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestData = {
  idea: string;
  ingredients: string[];
};

// TODO: we should coerce this into a partial of our recipe type
type Data = { [key: string]: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const body = req.body as RequestData;

  const prompt = getRecipePrompt(body.idea, body.ingredients);
  const message = await getChatCompletion(systemPrompt, prompt);
  // message is raw str so we need to cleanup to json object
  // TODO: it's possible openai will return additional spacing we need to strip
  const recipeObj = JSON.parse(message.replaceAll("\n", ""));

  res.status(200).json(recipeObj);
}
