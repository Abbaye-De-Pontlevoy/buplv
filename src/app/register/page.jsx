"use client"

import React, { useState } from 'react';
import axios from 'axios';

import "@/app/globals.css";

const SellerForm = () => {
  const [sellerData, setSellerData] = useState({
    student_name: '',
    class: '',
    email: '',
    phone: '',
    address: '',
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
      const response = await axios.post('/api/user/add-user/', sellerData);

      // Gérez la réponse ou effectuez d'autres actions nécessaires
      console.log('Nouveau vendeur créé avec succès:', response.data);
    } catch (error) {
      console.error('Erreur lors de la création du vendeur:', error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className='formulaire'>
      <label>
        Student Name:
        <input type="text" name="student_name" value={sellerData.student_name} onChange={handleChange} required />
      </label>
      <label>
        Class:
        <input type="text" name="class" value={sellerData.class} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={sellerData.email} onChange={handleChange} required />
      </label>
      <label>
        phone:
        <input type="text" name="phone" value={sellerData.phone} onChange={handleChange} required />
      </label>
      <label>
        Address:
        <input type="text" name="address" value={sellerData.address} onChange={handleChange} required />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={sellerData.password} onChange={handleChange} required />
      </label>
      <button type="submit">Créer Vendeur</button>

      </div>
    </form>

    <a href="/login">Se connecter</a>
    <a href="/">Menu principal</a>
    </>
  );
};

export default SellerForm;
