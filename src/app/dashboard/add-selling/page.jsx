"use client"

import React, { useState } from 'react';
import axios from 'axios';

import "@/app/globals.css";

const SellingForm = () => {

  const date = new Date();

  const [sellingData, setSellingData] = useState({
    seller_id: 0,
    article_id: 0,
    quantity: 0,
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Convertir la valeur en nombre si le nom est "price"
    const newValue = name === "price" ? parseFloat(value) : parseInt(value);
  
    setSellingData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faites l'appel API POST à "/api/user/"
      const response = await axios.post('/api/selling/add-selling/', sellingData);

    } catch (error) {
      console.error('Erreur lors de la création du vendeur:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='formulaire'>

      <label>
        Seller ID :
        <input type="number" name="seller_id" value={sellingData.seller_id} onChange={handleChange} required />
      </label>
      <label>
        Article ID :
        <input type="number" name="article_id" value={sellingData.article_id} onChange={handleChange} required />
      </label>
      <label>
        Quantity :
        <input type="number" name="quantity" value={sellingData.quantity} onChange={handleChange} required />
      </label>
      <label>
        Price :
        <input type="number" step="0.01" name="price" value={sellingData.price} onChange={handleChange} required />
      </label>


      <button type="submit">Ajouter article à la vente</button>

      </div>
    </form>
  );
};

export default SellingForm;
