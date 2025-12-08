import React, { useState } from 'react';
import { Mail, Lock, User, UserCheck } from 'lucide-react';
import axios from 'axios';
import './register.css';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    prenom: '',
    roles: {
      DRI: false,
      CEVE: false,
      CEVU: false,
      CA: false,
      enseignantChercheur: false
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (role) => {
    setFormData(prev => ({
      ...prev,
      roles: {
        ...prev.roles,
        [role]: !prev.roles[role]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // convertir les roles en liste
      const roles = Object.keys(formData.roles).filter(r => formData.roles[r]);
      const payload = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        roles: roles
      };
      const resp = await axios.post('http://localhost:8000/api/accounts/register/', payload); // <-- URL modifiée
      console.log('Réponse inscription:', resp.data);
      alert('Inscription réussie');
    } catch (err) {
      console.error(err.response || err);
      const msg = err.response?.data?.detail || err.response?.data || err.message;
      alert('Erreur inscription: ' + JSON.stringify(msg));
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <div className="icon-circle">
            <UserCheck size={32} />
          </div>
          <h1 className="register-title">Inscription</h1>
          <p className="register-subtitle">Créez votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {/* Email */}
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

          {/* Nom d'utilisateur */}
          <div className="form-group">
            <label className="form-label">Nom d'utilisateur</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Votre nom d'utilisateur"
                required
              />
            </div>
          </div>

          {/* Mot de passe */}
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

          {/* Rôles */}
          <div className="form-group">
            <label className="form-label">Rôles</label>
            <div className="checkbox-group">
              {[
                { key: 'DRI', label: 'DRI' },
                { key: 'CEVE', label: 'CEVE' },
                { key: 'CEVU', label: 'CEVU' },
                { key: 'CA', label: 'CA' },
                { key: 'enseignantChercheur', label: 'Enseignant Chercheur' }
              ].map((role) => (
                <label key={role.key} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.roles[role.key]}
                    onChange={() => handleCheckboxChange(role.key)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">{role.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bouton de soumission */}
          <button type="submit" className="submit-button">
            S'inscrire
          </button>
        </form>

        <p className="login-link">
          Vous avez déjà un compte ?{' '}
          <a href="/login" className="link">Se connecter</a>
        </p>
      </div>
    </div>
  );
}