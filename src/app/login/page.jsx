"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';

import "@/app/globals.css";

// Fonction pour définir un nouveau cookie
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

const SellerForm = () => {
  const router = useRouter();

  const [sellerData, setSellerData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSellerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faites l'appel API POST à "/api/user/"
      const response = await axios.post('/api/user/login/', sellerData);

      if(response){
        setCookie('buConnectedToken', response.data.token, 7);
        router.push('/dashboard');
      }

      // Gérez la réponse ou effectuez d'autres actions nécessaires
      console.log('Vendeur autentifié avec succès:', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'autentification du vendeur:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='formulaire'>
      <label>
        Email:
        <input type="email" name="email" value={sellerData.email} onChange={handleChange} required />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={sellerData.password} onChange={handleChange} required />
      </label>
      <button type="submit">Connexion Vendeur</button>

      </div>
    </form>
  );
};

export default SellerForm;
