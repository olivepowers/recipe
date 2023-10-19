import Layout from "@web/components/Layout";
import RecipeGenerator from "@web/components/RecipeGeneratorModal";
import { useState } from "react";

const GenerateRecipe = () => {
  const [idea, setIdea] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(true);

  const generateRecipe = async () => {
    const requestData = { idea, ingredients: ingredients.split(",") };

    try {
      const response = await fetch("/api/generateRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setRecipe(data);
      } else {
        console.error("Failed to generate recipe");
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  return (
    <Layout>
      <RecipeGenerator isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
      <div>
        <label>Idea:</label>
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
      </div>
      <div>
        <label>Ingredients (comma-separated):</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>
      <button onClick={generateRecipe}>Generate Recipe</button>

      {recipe && (
        <div>
          <h2>Generated Recipe</h2>
          <pre>{JSON.stringify(recipe, null, 2)}</pre>
        </div>
      )}
    </Layout>
  );
};

export default GenerateRecipe;
