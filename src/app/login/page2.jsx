"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { isUserConnected, setCookie } from '@/utils/client-cookies';

import "@/app/globals.css";

const SellerForm = () => {
  const router = useRouter();

  const [sellerData, setSellerData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isUserConnected()) {
      router.push('/dashboard');
    }
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
      const response = await axios.post('/api/user/login/', sellerData);
      if (response.data.token) {
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        setCookie("buConnectedToken", response.data.token, expires );
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Erreur lors de l\'authentification du vendeur:', error);
    }
  };

  return (
    <>
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

      <a href="/register">Créer un compte</a>
      <a href="/">Menu principal</a>
    </>
  );
};

export default SellerForm;
