import React from "react";

export type RecipeProps = {
    id: number;
    title: string;
    description: string;
    author: {
        name: string;
        email: string;
    } | null;
};

const Recipe: React.FC<{ Recipe: RecipeProps }> = ({ Recipe }) => {
    return <div>{JSON.stringify(Recipe, null, 2)}</div>
};

export default Recipe;