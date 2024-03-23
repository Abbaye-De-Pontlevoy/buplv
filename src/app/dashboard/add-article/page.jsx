"use client"

import React, { useState } from 'react';
import axios from 'axios';

import "@/app/globals.css";

const ArticleForm = () => {
  const [articleData, setArticleData] = useState({
    brand: '',
    name: '',
    size: 0,
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faites l'appel API POST à "/api/user/"
      const response = await axios.post('/api/article/add-article/', articleData);

    } catch (error) {
      console.error('Erreur lors de la création du vendeur:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='formulaire'>
      <label>
        Marque :
        <input type="text" name="brand" value={articleData.brand} onChange={handleChange} required />
      </label>
      <label>
        Nom :
        <input type="text" name="name" value={articleData.name} onChange={handleChange} required />
      </label>
      <label>
        Taille :
        <input type="number" name="size" value={articleData.size} onChange={handleChange} required />
      </label>
      <label>
        Prix :
        <input type="number" name="price" value={articleData.price} onChange={handleChange} required />
      </label>

      <button type="submit">Ajouter article</button>

      </div>
    </form>
  );
};

export default ArticleForm;
