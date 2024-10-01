"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles/Recipes.module.css";
import RecipeForm from "@/app/components/RecipeForm";

type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
  category: "Ontbijt" | "Lunch" | "Diner" | "Dessert";
};

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const addRecipe = (newRecipe: Recipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  const deleteRecipe = (id: number) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    } else {
      fetch("/data/recipes.json")
        .then((res) => res.json())
        .then((data) => {
          setRecipes(data.recipes);
          localStorage.setItem("recipes", JSON.stringify(data.recipes));
        })
        .catch((error) => console.error("Error loading recipes:", error));
    }
  }, []);

  return (
    <>
      <section id="recipes" className={styles.recipes}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Recepten</h2>
					
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe.id} className={styles.recipeCard}>
                <h3>{recipe.name}</h3>
                <p>
                  <strong>Ingrediënten:</strong> {recipe.ingredients.join(", ")}
                </p>
                <p>
                  <strong>Instructies:</strong> {recipe.instructions}
                </p>
                <p className={styles.category}>{recipe.category}</p>
                <button onClick={() => deleteRecipe(recipe.id)} className="styles.deleteButton">Verwijderen</button>
              </div>
            ))
          ) : (
            <p>Geen recepten gevonden.</p>
          )}
        </div>
      </section>

      <RecipeForm onAddRecipe={addRecipe} />
    </>
  );
}
