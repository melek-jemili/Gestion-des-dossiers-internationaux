import React, { useState, useRef } from 'react';
import { Globe, User, FileText, Info } from 'lucide-react';
import axios from 'axios';
import './formulaire.css';

const API_BASE = 'http://localhost:8000';

export default function Formulaire() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    departement: '',
    grade: '',
    nomProjet: '',
    typeAccord: '',
    choix: '',
    etablissementPartenaire: '',
    pays: '',
    ville: '',
    durée: '',
    objectif: '',
    commentaires: '',
  });

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const hiddenFileInput = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleChooseFile = () => hiddenFileInput.current?.click();

  const handleSubmit = async () => {
    const data = new FormData();

    Object.keys(formData).forEach(key => {
      if (key !== 'choix') data.append(key, formData[key]);
    });

    if (formData.choix !== '') data.append('choix', formData.choix === 'true');

    if (file) data.append('dossier_pdf', file);

    try {
      const res = await axios.post(`${API_BASE}/api/dossier/deposer/`, data);
      alert('Dossier déposé avec succès');
    } catch (err) {
      alert('Erreur: ' + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">

        {/* HEADER */}
        <div className="header">
          <div className="header-content">
            <div>
              <h1 className="title">Demande d'Accord International</h1>
              <p className="subtitle">
                Formulaire de proposition d'accord/convention avec un établissement d'enseignement supérieur
              </p>
            </div>
            <Globe className="header-icon" />
          </div>
        </div>

        {/* INFO */}
        <div className="info-banner">
          <div className="info-content">
            <Info className="info-icon" />
            <div>
              <h3 className="info-title">Conseil:</h3>
              <p className="info-text">
                Veuillez remplir le fomulaire correctement. Assurez-vous que toutes les informations sont exactes avant de soumettre votre demande.
              </p>
            </div>
          </div>
        </div>

        {/* FORMULAIRE */}
        <div className="form-body">

          {/* SECTION INFORMATIONS */}
          <div className="section">
            <div className="section-header">
              <div className="icon-badge blue">
                <User className="icon" />
              </div>
              <h2 className="section-title">Vos informations</h2>
            </div>

            <div className="form-group">
              <div className="input-group">
                <label className="label">Nom</label>
                <input type="text" name="nom" value={formData.nom} onChange={handleChange} className="input" />
              </div>

              <div className="input-group">
                <label className="label">Prénom</label>
                <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} className="input" />
              </div>

              <div className="input-group">
                <label className="label">E-mail institutionnel</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="input" />
              </div>

              <div className="input-group">
                <label className="label">Département</label>
                <input type="text" name="departement" value={formData.departement} onChange={handleChange} className="input" />
              </div>

              <div className="input-group">
                <label className="label">Grade</label>
                <select name="grade" value={formData.grade} onChange={handleChange} className="input select">
                  <option value="">Sélectionnez votre grade</option>
                  <option value="professeur">Professeur</option>
                  <option value="maitre-conference-a">Maître de Conférences A</option>
                  <option value="maitre-conference-b">Maître de Conférences B</option>
                  <option value="maitre-assistant-a">Maître Assistant A</option>
                  <option value="maitre-assistant-b">Maître Assistant B</option>
                  <option value="assistant">Assistant</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION PROJET */}
          <div className="section">
            <div className="section-header">
              <div className="icon-badge green">
                <FileText className="icon" />
              </div>
              <h2 className="section-title">Caractéristiques du projet</h2>
            </div>

            <div className="form-group">
              <div className="input-group">
                <label className="label">Nom du projet</label>
                <input name="nomProjet" value={formData.nomProjet} onChange={handleChange} className="input" />
              </div>

              <div className="input-group">
                <label className="label">Type d'accord</label>
                <select name="typeAccord" value={formData.typeAccord} onChange={handleChange} className="input select">
                  <option value="">Sélectionnez le type</option>
                  <option value="collaboration">Accord de collaboration</option>
                  <option value="echange">Accord d'échange</option>
                  <option value="recherche">Accord de recherche</option>
                  <option value="double-diplome">Double diplôme</option>
                  <option value="cotutelle">Cotutelle de thèse</option>
                </select>
              </div>

              <div className="input-group">
                <label className="label">Mobilité ?</label>
                <select name="choix" value={formData.choix} onChange={handleChange} className="input select">
                  <option value="">Sélectionnez</option>
                  <option value="true">Oui</option>
                  <option value="false">Non</option>
                </select>
              </div>

              <div className="input-group">
                <label className="label">Établissement partenaire</label>
                <input name="etablissementPartenaire" value={formData.etablissementPartenaire} onChange={handleChange} className="input" />
              </div>

              <div className="input-group">
                <label className="label">Pays</label>
                <input name="pays" value={formData.pays} onChange={handleChange} className="input" />
              </div>

              <div className="input-group">
                <label className="label">Ville</label>
                <input name="ville" value={formData.ville} onChange={handleChange} className="input" />
              </div>

              <div className="input-group">
                <label className="label">Durée annuelle de l'accord</label>
                <input name="durée" value={formData.durée} onChange={handleChange} className="input" />
              </div>

              <div className="input-group">
                <label className="label">Objectif du projet</label>
                <textarea name="objectif" value={formData.objectif} onChange={handleChange} rows="4" className="input textarea" />
              </div>

              <div className="input-group">
                <label className="label">Commentaires</label>
                <textarea name="commentaires" value={formData.commentaires} onChange={handleChange} rows="4" className="input textarea" />
              </div>

              {/* UPLOAD PDF */}
              <div className="input-group">
                <label className="label">Téléverser le dossier PDF</label>

                <div className="file-control" style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    readOnly
                    className="input"
                    value={fileName}
                    placeholder="Aucun fichier choisi"
                    onClick={handleChooseFile}
                  />

                  <button type="button" className="submit-btn" onClick={handleChooseFile}>
                    Choisir
                  </button>
                </div>

                <input
                  ref={hiddenFileInput}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>

              {/* BOUTONS */}
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <button type="button" className="submit-btn" onClick={handleSubmit}>
                  Soumettre la demande
                </button>

                <button type="button" className="submit-btn" onClick={() => (window.location.href = './dashboard')}>
                  Retour au tableau de bord
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
