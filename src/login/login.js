import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/accounts/login/',
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Réponse backend:", response.data);

      // 🔹 Sauvegarde des données utilisateur
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      alert('Connexion réussie !');

      navigate('/enseignant/dashboard');
    } catch (err) {
      console.error('Erreur de connexion:', err);
      alert('Identifiants incorrects.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="icon-circle">
            <LogIn size={32} />
          </div>
          <h1 className="login-title">Connexion</h1>
          <p className="login-subtitle">Accédez à votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Se connecter
          </button>
        </form>

        <p className="register-link">
          Vous n'avez pas de compte ?{' '}
          <a href="/register" className="link">S'inscrire</a>
        </p>
      </div>
    </div>
  );
}
