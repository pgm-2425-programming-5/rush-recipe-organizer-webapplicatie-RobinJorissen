'use client';

import { useState } from 'react';
import styles from './styles/RecipeForm.module.css';

type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
  category: 'Ontbijt' | 'Lunch' | 'Diner' | 'Dessert';
};

type RecipeFormProps = {
  onAddRecipe: (recipe: Recipe) => void;
};

export default function RecipeForm({ onAddRecipe }: RecipeFormProps) {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState<'Ontbijt' | 'Lunch' | 'Diner' | 'Dessert'>('Ontbijt');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());

    const newRecipe: Recipe = {
      id: Date.now(),
      name,
      ingredients: ingredientsArray,
      instructions,
      category,
    };

    onAddRecipe(newRecipe);

    setName('');
    setIngredients('');
    setInstructions('');
    setCategory('Ontbijt');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Gerechtnaam
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="ingredients" className={styles.label}>
          Ingrediënten
        </label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          placeholder="Bijv. 3 eieren, 200g bloem"
          className={styles.textarea}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="instructions" className={styles.label}>
          Instructies
        </label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
          placeholder="Stapsgewijze uitleg hoe het gerecht bereid moet worden"
          className={styles.textarea}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category" className={styles.label}>
          Categorie
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as 'Ontbijt' | 'Lunch' | 'Diner' | 'Dessert')
          }
          className={styles.select}
        >
          <option value="Ontbijt">Ontbijt</option>
          <option value="Lunch">Lunch</option>
          <option value="Diner">Diner</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>

      <button type="submit" className={styles.button}>
        Recept Toevoegen
      </button>
    </form>
  );
}
