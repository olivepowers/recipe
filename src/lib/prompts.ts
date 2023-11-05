export const systemPrompt =
  "You are a recipe developer. You will take in a general idea of what the user would like to make with a list of ingredients they have on hand, it is not necessary to include all ingredients provided in the recipe unless otherwise specified. If the user provides you with measurements please take that into account when developing the recipe. You may also assume that the user has common staple ingredients like oil, salt, flour, butter, etc as well as common appliances unless otherwise specified. If a user says surprise me, that they are going to the grocery store, or give you permission to include ingredients they do not have on hand you may do so.";

// TODO: add higher quality examples and more detail on what you want
export const getRecipePrompt = (idea: string, ingredients: string[]) => {
  return `Example 1:

Input:
{
    "idea": "I want to make a dessert for a dinner party I am hosting. I am expecting 4 people to be in attendance and would like to make it the night before but not sacrifice flavor",
    "ingredients": ["chocolate", "lemon", "sweet condensed milk", "maple syrup", "almond", "miso", "bananas", "orange juice", "heavy cream", "instant coffee"]
}

Output:
{
    "title": "Mocha Mousse",
    "ingredients": ["1/2 C sugar", "2 eggs", "1 C sugar", "1 1/2 tsp instant coffee", "1 1/2 cup heavy cream", "1/2 C water"],
    "steps": ["Combine sugar, water, and coffee in pan and bring to a boil. About 3 minutes", "Place chocolate chips in blender and add sugar syrup. Blend for 6 seconds.", "Add eggs to blender and blend for 1 minute", "whip heavy cream until stiff peaks form", "fold syrup into whipped cream", "let chill in fridge for at least 6 hours or until set"],
    "lists": ["Generated Recipes"],
    "hashtags": ["dessert"]
}

Example 2:

Input:
{
    "idea": "I am looking to make a weeknight meal for me and my boyfriend. I would like it to not take more than hour to make and also have leftovers to eat for lunch the next day. I would like it to be low carb and include chicken",
    "ingredients": ["chicken breast", "rice"]
}

Output:
{
    "title": "Lemon Pepper Air Fryer Chicken + Broccoli",
    "ingredients": ["1 lb boneless skinless chicken breast", "1 crown borccoli", "1 Tablespoon Olive Oil", "2 teaspoons lemon pepper seasoning", "1 teaspoon dried basil", "1/4 teaspoon salt", "2 cups rice"],
    "steps": ["Cook rice according to package instructions and preheat air fryer to 400°F. If you do not have an air fryer preheat the oven to 400°F", "While rice is cooking toss chicken and broccoli in olive oil, then add lemon pepper, basil and salt, and toss until evenly coated", "spread chicken and broccoli in air fryer basket or oven tray (it may need to cook in multiple batches in the air fryer)", "Place in air fryer (or oven) and cook for 5 minutes", "After 5 minutes, remove air fryer (or oven) and use tongs to carefully stir up and flip the chicken.
    Cook for another 5-7 minutes, until chicken is cooked through and no longer pink in the middle.","Divide the rice into 1/2 cup portions and split the chicken and broccoli amongst them."],
    "lists": ["Generated Recipes"],
    "hashtags": ["Easy Dinner", "Meal Prep"]
}

Example 3:

Input:
{
    "idea": "I am looking to make a meal with all this eggplant I have from my garden. I am vegetarian and love greek food.",
    "ingredients": ["eggplant", "zucchini", "feta", "rice", "garlic"]
}

Output:
{
    "title": "Vegetarian Moussaka",
    "ingredients": ["1 eggplant, thinly sliced", "1 teaspoon salt, or more as needed", "1 Tablespoon Olive Oil, or more as needed", "1 large zucchini, thinly sliced", "2 potatoes, thinly sliced", "1 clove garlic, chopped", "1 Tablespoon white vinegar", "1 (14.5) can whole peeled tomatoes, chopped", "1/2 (14.5 ounce) can lentils, drained with liquid reserved", "2 Tablespoons chopped fresh parsley", "1 teaspoon dried oregano", "ground black pepper to taste", "1 cup crumbled feta cheese", "1 1/4 cups milk", "2 Tablespoons all-purpose flour", "1 1/2 Tablespoons butter", "1 pinch ground nutmeg", "1 large egg, beaten", "1/4 cup grated Parmesan cheese"],
    "steps": ["Sprinkle eggplant slices with salt; set aside for 30 minutes. Rinse and pat dry with paper towels.", "Preheat the oven to 375 degrees F (190 degrees C).", "Heat olive oil in a large skillet over medium-high heat. Cook eggplant and zucchini in hot oil until lightly browned, about 3 minutes per side. 
    Remove with a slotted spoon to drain on a paper towel-lined plate, reserving as much oil as possible in the skillet.", "Add more oil to the skillet if needed and let it get hot. Cook potato slices in hot oil until browned, 3 to 5 minutes per side. Remove with a slotted spoon to drain on a paper towel-lined plate, again reserving oil in the skillet.", "Sauté onion and garlic in reserved oil until lightly browned, 5 to 7 minutes. Pour in vinegar, bring to a boil, and reduce heat to medium-low; cook until liquid is reduced in volume and thick. Stir in tomatoes, lentils, 1/2 of the juice from lentils, parsley, and oregano. Season with salt and black pepper. 
    Cover, reduce heat to medium-low, and simmer for 15 minutes.", "Layer about 1/3 of the eggplant, 1/3 of the zucchini, 1/2 of the potatoes, and 1/2 of the feta in a 9x13-inch baking dish. Pour 1/2 of the tomato mixture over vegetables; repeat layering, finishing with a layer of eggplant and zucchini.", "Cover and bake in the preheated oven for 25 minutes.", "Meanwhile, make the sauce: Stir milk, flour, and butter for together in a small saucepan; bring to a low boil, whisking constantly, until thick and smooth. Season with nutmeg and black pepper. Remove from heat, cool for 5 minutes, and stir in beaten egg.", "Pour sauce over vegetables and top with Parmesan cheese. Continue baking, 
    uncovered, until sauce is bubbly and top is lightly brown, 25 to 30 minutes."],
    "lists": ["Generated Recipes"],
    "hashtags": ["Vegetarian", "Greek"]
}

Example 4:

Input:
{
    "idea": "I am looking for an easy, healthy breakfast to make this morning. I do not like eating eggs but am okay if they are used to bake or make something. I  would like to use up all the fruit and perishables I have left in my fridge.",
    "ingredients": ["eggs", "1 C milk", "butter", "apples", "almond butter", "quick oats", "peaches", "1/3 C blueberries", "chocolate chips", "coconut flakes"]
}

Output:
{
    "title": "Fruit Baked Oatmeal",
    "ingredients": ["3 C quick-cooking oats", "1 C packed brown sugar", "2 teaspoons baking powder", "1 teaspoon salt", "1/2 teaspoon ground cinnamon", "2 large eggs, lightly beaten", "1 C milk", "1/2 cup butter, melted", "3/4 C chopped, peeled apple", "1/3 cup chopped peaches", "1/3 cup blueberries"],
    "steps": ["Preheat oven to 350°. In a large bowl, combine oats, brown sugar, baking powder, salt and cinnamon. Combine eggs, milk and butter; add to the dry ingredients. Stir in apple, peaches and blueberries.", "Pour into an 8-in. square baking dish coated with cooking spray. Bake, uncovered, until a knife inserted in center comes out clean, 35-40 minutes. Cut into squares. Serve with milk if desired."],
    "lists": ["Generated Recipes"],
    "hashtags": ["Breakfast", "Fruity"]
}

Example 5:

Input:
{
    "idea": "I want to make a special Valentines dinner for me and my boyfriend. I know I want steak to be the main dish, but I am open to trying out a fun recipe so go crazy",
    "ingredients": ["filet mignon", "1 C milk", "parmesan cheese"]
}

Output:
{
    "title": "Filet Mignon in Mushroom Sauce with Mashed Potatoes",
    "ingredients": ["4 Tbsp unsalted butter, divided",
        "2 Tbsp olive oil, divided",
        "16 oz baby bella mushrooms, thickly sliced",
        "1 small onion, finely diced",
        "4 garlic cloves, minced",
        "1 Tbsp fresh thyme, minced (or 1 tsp dry thyme)",
        "24 oz filet mignon (beef tenderloin) steaks , 6-8 oz each, about 1 1/2" thick",
        "1/2 cup Merlot wine, or any dry red wine",
        "1 1/2 cups beef broth",
        "1/2 cup whipping cream"
        "1 1/4 tsp sea salt, we use sea salt, divided"
        "1/2 tsp black pepper, divided"],
    "steps": ["Place a large heavy-bottomed pan over med/high heat and melt in 2 Tbsp butter and 1 Tbsp oil. Add sliced mushrooms and cook 6 min or until softened and most of the liquid has evaporated. Add diced onion and cook 3 min, stirring often.",
        "Add minced garlic, 1 Tbsp thyme, 1/4 tsp salt and 1/8 tsp black pepper. Cook, stirring constantly, 2 min or until garlic is fragrant. Transfer mushrooms to a large plate. Wipe pan clean with a wet paper towel.",
        "Season steaks all over with 1 tsp salt and 1/4 tsp black pepper. Place the same pan over medium/high heat and add 2 Tbsp butter and 1 Tbsp oil. When the butter is hot and finished foaming, add seasoned steaks and sear 3-5 min per side for medium-rare (5-6 min for medium doneness*), turning once. When steaks reach desired doneness, transfer them to the plate with mushrooms.",
        "In the same pan over med/high heat, add 1/2 cup red wine and boil down until reduced by half (3 min), scraping the bottom to deglaze. Add 1 1/2 cups beef broth and boil until 2/3 cup of liquid remains in the pan (5-7 min). Stir in 1/2 cup cream and boil 2 min or until slightly thickened. Season sauce to taste with salt and pepper if desired.",
        "Add steaks and mushrooms back to pan, spooning some of the sauce over steaks. Once steaks are just heated through, remove from heat and serve garnished with fresh sprigs of thyme if desired."],
    "lists": ["Generated Recipes"],
    "hashtags": ["Fancy Dinner", "Steak"]
}

Example 6:

Input:
{
    "idea": "${idea}",
    "ingredients": [${ingredients.map((i) => `"${i}"`).join(", ")}]
}

Output:`;
};
