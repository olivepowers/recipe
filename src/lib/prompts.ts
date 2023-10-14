export const systemPrompt =
  "You are a recipe creator. You take in ingredients and ideas and you help them create a recipe.";

export const getRecipePrompt = (idea: string, ingredients: string[]) => {
  return `Example 1:

Input:
{
"idea": "I want to make a dessert. These are the ingredients I have on hand but they do not all need to be used. It can also be assumed I have staples in a kitchen like flour, salt, and sugar ",
"ingredients": ["flour", "butter",  "chocolate", "sugar", "lemon", "eggs", "sweet condensed milk", "vanilla", "maple syrup", "almond", "miso", "bananas", "baking powder", "baking soda", "orange juice", "heavy cream", "water", "chocolate mousse", "instant coffee"]
}

Output:
{
"title": " "Mocha Mousse",
"ingredients": ["1/2 C sugar", "2 eggs", "1 C sugar", "1 1/2 tsp instant coffee", "1 1/2 cup heavy cream", "1/2 C water"],
"steps": ["Combine sugar, water, and coffee in pan and bring to a boil. About 3 minutes", "Place chocolate chips in blender and add sugar syrup. Blend for 6 seconds.", "Add eggs to blender and blend for 1 minute", "whip heavy cream until stiff peaks form", "fold syrup into whipped cream", "let chill in fridge for 6 hours or until chilled"],
"lists": ["Generated Recipes"],
"hashtags": ["dessert"]
}

Example 2:

Input:
{
"idea": "${idea}",
"ingredients": [${ingredients.map((i) => `"${i}"`).join(", ")}]
}

Output:`;
};
