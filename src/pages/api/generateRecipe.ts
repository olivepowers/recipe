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

// TODO: should be post only
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body as RequestData;

  const prompt = getRecipePrompt(body.idea, body.ingredients);
  const message = await getChatCompletion(systemPrompt, prompt);
  // message is raw str so we need to cleanup to json object
  const recipeObj = JSON.parse(message.replaceAll("\n", ""));

  res.status(200).json(recipeObj);
}
