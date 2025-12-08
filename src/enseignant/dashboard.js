import "./dashboard.css";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import jsPDF from "jspdf";
//import html2canvas from "html2canvas";
import { 
  User, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  LogOut,
  Menu,
  X,
  Search,
  Plus,
  Eye,
  Download,
  Edit
} from 'lucide-react';

export default function TeacherDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [dossiers, setDossiers] = useState([]);

  const [fermesUser, setFermesUser] = useState(0);
  const[refuseUser,setRefuseUser]=useState(0);
  //const [modalOpen, setModalOpen] = useState(false);
  //const [selectedDossier, setSelectedDossier] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
const [editForm, setEditForm] = useState({
  id: null,
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
})
  

  /* ------------------------------
       Charger l'utilisateur 
  ------------------------------- */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  /* ------------------------------
       Charger les dossiers
  ------------------------------- */
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("Aucun token trouvé !");
      return;
    }

    axios.get("http://localhost:8000/api/dossier/liste/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log("Dossiers reçus:", res.data);
      setDossiers(res.data);
    })
    .catch((err) => {
      console.error("Erreur chargement dossiers:", err);
    });
    axios.get("http://localhost:8000/api/dossier/statistiques/fermes_user/",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if(res.data.success) setFermesUser(res.data.dossiers_fermes);
      })
      .catch((err) => console.error("Erreur stat fermés:", err));
    axios.get("http://localhost:8000/api/dossier/statistiques/refuses_user/",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => { 
        if(res.data.success) setRefuseUser(res.data.dossiers_refuse);
      })
      .catch((err) => console.error("Erreur stat refusés:", err));
  }, []);
const handleViewDossier = async (dossierId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await axios.get(`http://127.0.0.1:8000/api/dossier/detail/${dossierId}/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const dossier = res.data;

    // Créer la nouvelle fenêtre
    const newWindow = window.open("", "_blank", "width=500,height=600");
    
    // Écrire le HTML dans cette fenêtre
    newWindow.document.write(`
      <html>
        <head>
          <title>Détails du Dossier</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; }
            p { margin: 10px 0; }
            strong { display: inline-block; width: 150px; }
          </style>
        </head>
        <body>
          <h2>Détails du Dossier</h2>
          <p><strong>Nom Projet:</strong> ${dossier.nomProjet}</p>
          <p><strong>Type Accord:</strong> ${dossier.typeAccord}</p>
          <p><strong>Durée:</strong> ${dossier.durée}</p>
          <p><strong>Etat:</strong> ${dossier.etat}</p>
          <p><strong>Commentaires:</strong> ${dossier.commentaires}</p>
          <p><strong>Nom:</strong> ${dossier.nom}</p>
          <p><strong>Prénom:</strong> ${dossier.prenom}</p>
          <p><strong>Email:</strong> ${dossier.email}</p>
          <p><strong>Département:</strong> ${dossier.departement}</p>
          <p><strong>Grade:</strong> ${dossier.grade}</p>
        </body>
      </html>
    `);
    newWindow.document.close();

  } catch (err) {
    console.error("Erreur récupération détails :", err);
    alert("Impossible de charger les détails du dossier.");
  }
};

const handleEditDossier = async (dossierId) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    // Récupérer les données existantes
    const res = await axios.get(`http://127.0.0.1:8000/api/dossier/detail/${dossierId}/`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const dossierData = res.data;

    // Pré-remplir le formulaire
    setEditForm({
      id: dossierData.id,
      nom: dossierData.nom || '',
      prenom: dossierData.prenom || '',
      email: dossierData.email || '',
      departement: dossierData.departement || '',
      grade: dossierData.grade || '',
      nomProjet: dossierData.nomProjet || '',
      typeAccord: dossierData.typeAccord || '',
      choix: dossierData.choix || '',
      etablissementPartenaire: dossierData.etablissementPartenaire || '',
      pays: dossierData.pays || '',
      ville: dossierData.ville || '',
      durée: dossierData.durée || '',
      objectif: dossierData.objectif || '',
      commentaires: dossierData.commentaires || ''
    });
    setEditModalOpen(true);

  } catch (err) {
    console.error("Erreur récupération dossier pour édition :", err);
    alert("Impossible de charger le dossier pour modification.");
  }
};


const handleSubmitEdit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("accessToken");

    await axios.put(
      `http://localhost:8000/api/dossier/modifier/${editForm.id}/`,
      editForm,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
     alert("Dossier mis à jour !");
    setEditModalOpen(false);
    // rafraîchir la liste des dossiers
    const res = await axios.get("http://localhost:8000/api/dossier/liste/", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setDossiers(res.data);

  } catch (err) {
    console.error("Erreur modification dossier :", err);
    alert("Impossible de modifier le dossier.");
  }
};


const handleDownloadDossier = async (dossierId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await axios.get(`http://127.0.0.1:8000/api/dossier/detail/${dossierId}/`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const dossier = res.data;

    const doc = new jsPDF();

    // --- Logo ---
    const logo = new Image();
    logo.src = '/LOGO_ENIT_300.png';
    logo.onload = () => {
      doc.addImage(logo, 'PNG', 15, 10, 30, 30); // x, y, largeur, hauteur

      // --- Titre ---
      doc.setFontSize(20);
      doc.setTextColor(0, 102, 204); // bleu
      doc.text("Dossiers Internationaux", 105, 25, { align: "center" });

      // --- Infos du dossier ---
      doc.setFontSize(12);
      doc.setTextColor(0,0,0);
      let y = 50;

      const addLine = (label, value) => {
        doc.text(`${label}: ${value}`, 20, y);
        y += 10;
      };

      addLine("Nom Projet", dossier.nomProjet);
      addLine("Type Accord", dossier.typeAccord);
      addLine("Durée", dossier.durée);
      addLine("Etat", dossier.etat);
      addLine("Commentaires", dossier.commentaires);
      addLine("Nom", dossier.nom);
      addLine("Prénom", dossier.prenom);
      addLine("Email", dossier.email);
      addLine("Département", dossier.departement);
      addLine("Grade", dossier.grade);
      addLine("Etablissement Partenaire", dossier.etablissementPartenaire);
      addLine("Pays", dossier.pays);
      addLine("Ville", dossier.ville);
      addLine("Choix", dossier.choix);
      addLine("Objectif", dossier.objectif);

      // --- Date de création en bas ---
      const currentDate = new Date().toLocaleDateString();
      doc.setFontSize(10);
      doc.text(`Date de création: ${currentDate}`, 105, 290, { align: "center" });

      // --- Télécharger ---
      doc.save(`Dossier_${dossier.id}.pdf`);
    };

  } catch (err) {
    console.error("Erreur téléchargement PDF :", err);
    alert("Impossible de générer le PDF.");
  }
};

  // Styles badges
  const getStatutStyle = (etat) => {
    switch (etat) {
      case 'en_attente':
        return 'statut-attente';
      case 'approuve':
        return 'statut-approuve';
      case 'en_cours':
        return 'statut-encours';
      case 'refuse':
        return 'statut-refuse';
      default:
        return '';
    }
  };

  // Stats dynamiques
  const stats = [
    { title: 'En Attente', value: dossiers.filter(d => d.etat === "en_attente").length, icon: Clock, color: '#f59e0b', bgColor: '#fef3c7' },
    { title: 'Approuvés', value: dossiers.filter(d => d.etat === "approuve").length, icon: CheckCircle, color: '#10b981', bgColor: '#d1fae5' },
    { title: 'Fermés', value: fermesUser, icon: AlertCircle, color: '#3b82f6', bgColor: '#dbeafe' },
    { title: 'Refusés', value: refuseUser, icon: XCircle, color: '#ef4444', bgColor: '#fee2e2' }
  ];

  // Filtrer dossiers selon recherche
  const filteredDossiers = dossiers.filter((d) =>
    d.nomProjet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.typeAccord?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    
    <div className="dashboard-container">

      {/* HEADER */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="menu-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={24} />
          </button>
          <h1 className="header-title">Tableau de Bord - Enseignant Chercheur</h1>
        </div>

        <div className="header-right">
          <div className="user-info">
            <span className="user-name">{user ? user.username : ""}</span>
            <button className="logout-button" onClick={handleLogout}>
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Menu</h2>
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">
            <FileText size={20} />
            <span>Mes Dossiers</span>
          </button>
          <button className="nav-item">
            <User size={20} />
            <span>Mon Profil</span>
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="main-content">

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: stat.bgColor }}>
                <stat.icon size={24} color={stat.color} />
              </div>
              <div className="stat-info">
                <p className="stat-title">{stat.title}</p>
                <h3 className="stat-value">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="actions-bar">
          <a href="/enseignant/formulaire" className="submit-button">
            <Plus size={20} /> Soumettre une Demande
          </a>

          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Rechercher un dossier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Liste dossiers */}
        <div className="dossiers-section">
          <h2 className="section-title">Mes Dossiers Soumis</h2>

          <div className="dossiers-table">

            <div className="table-header">
              <div className="table-cell">Titre</div>
              <div className="table-cell">Type</div>
              <div className="table-cell">Durée</div>
              <div className="table-cell">Statut</div>
              <div className="table-cell">Commentaires</div>
              <div className="table-cell">Actions</div>
            </div>

            {filteredDossiers.length === 0 && (
              <div className="no-data">Aucun dossier trouvé.</div>
            )}

            {filteredDossiers.map((dossier) => (
              <div key={dossier.id} className="table-row">
                <div className="table-cell">{dossier.nomProjet}</div>
                <div className="table-cell">{dossier.typeAccord}</div>
                <div className="table-cell">{dossier.durée}</div>
                <div className="table-cell">
                  <span className={`statut-badge ${getStatutStyle(dossier.etat)}`}>
                    {dossier.etat}
                  </span>
                </div>
                <div className="table-cell">{dossier.commentaires}</div>
                <div className="table-cell">
                  <div className="action-buttons">
                    <button
                        className="action-btn view-btn"
                        title="Voir"
                        onClick={() => handleViewDossier(dossier.id)}
                      >
                        <Eye size={18} />
                      </button>
                    <button className="action-btn download-btn" 
                    title="Télécharger"
                    onClick={() => handleDownloadDossier(dossier.id)}>
                      <Download size={18} />
                    </button>
                    <button className="action-btn download-btn"
                     title="Modifier"
                     onClick={() => handleEditDossier(dossier.id)}>
                      <Edit size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
                      {editModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Modifier le Dossier</h2>
      <form onSubmit={handleSubmitEdit}>
        <input type="text" value={editForm.nom} onChange={e => setEditForm({...editForm, nom: e.target.value})} placeholder="Nom" />
        <input type="text" value={editForm.prenom} onChange={e => setEditForm({...editForm, prenom: e.target.value})} placeholder="Prénom" />
        <input type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} placeholder="Email" />
        <input type="text" value={editForm.departement} onChange={e => setEditForm({...editForm, departement: e.target.value})} placeholder="Département" />
        <input type="text" value={editForm.grade} onChange={e => setEditForm({...editForm, grade: e.target.value})} placeholder="Grade" />
        <input type="text" value={editForm.nomProjet} onChange={e => setEditForm({...editForm, nomProjet: e.target.value})} placeholder="Nom Projet" />
        <input type="text" value={editForm.typeAccord} onChange={e => setEditForm({...editForm, typeAccord: e.target.value})} placeholder="Type Accord" />
        <input type="text" value={editForm.choix} onChange={e => setEditForm({...editForm, choix: e.target.value})} placeholder="Choix" />
        <input type="text" value={editForm.etablissementPartenaire} onChange={e => setEditForm({...editForm, etablissementPartenaire: e.target.value})} placeholder="Etablissement Partenaire" />
        <input type="text" value={editForm.pays} onChange={e => setEditForm({...editForm, pays: e.target.value})} placeholder="Pays" />
        <input type="text" value={editForm.ville} onChange={e => setEditForm({...editForm, ville: e.target.value})} placeholder="Ville" />
        <input type="text" value={editForm.durée} onChange={e => setEditForm({...editForm, durée: e.target.value})} placeholder="Durée" />
        <textarea value={editForm.objectif} onChange={e => setEditForm({...editForm, objectif: e.target.value})} placeholder="Objectif" />
        <textarea value={editForm.commentaires} onChange={e => setEditForm({...editForm, commentaires: e.target.value})} placeholder="Commentaires" />

        <div className="modal-actions">
          <button type="submit">Enregistrer</button>
          <button type="button" onClick={() => setEditModalOpen(false)}>Annuler</button>
        </div>
      </form>
    </div>
  </div>
)}

          </div>
        </div>
      </main>
    </div>
  );
}
