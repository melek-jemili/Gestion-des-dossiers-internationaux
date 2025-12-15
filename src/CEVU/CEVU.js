import React, { useState } from "react";
import "./CEVU.css";

import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  Download,
  ChevronDown,
  ChevronUp,
  User,
  Building2,
  Users,
  MessageSquare,
  Calendar,
  Printer,
  Mail,
  Send,
} from "lucide-react";

export default function InterfaceCEVU() {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("tous");
  const [expandedCards, setExpandedCards] = useState({});

  const [folders, setFolders] = useState([
    {
      id: 1,
      numero: "RI-2025-001",
      type: "Recherche",
      etat: "en_cours",
      etudiant: "Amina Ben Youssef",
      encadrant: "Pr. Slimani",
      dateDepot: "2025-01-15",
      etablissement: "ENSI",
      description: "Demande de validation d'un stage de recherche à Paris.",
      pieces: [
        { nom: "Lettre d'acceptation.pdf", statut: "valide" },
        { nom: "Convention.pdf", statut: "en_attente" },
        { nom: "Relevé de notes.pdf", statut: "refuse" },
      ],
      historique: [
        { action: "Dossier déposé", date: "2025-01-15" },
        { action: "Pièces mises à jour", date: "2025-01-17" },
      ],
    },
    {
      id: 2,
      numero: "RI-2025-002",
      type: "Mobilité",
      etat: "en_attente",
      etudiant: "Yassine Jemli",
      encadrant: "Dr. Saidi",
      dateDepot: "2025-02-05",
      etablissement: "ISAMM",
      description: "Demande de mobilité semestre 2 – Espagne.",
      pieces: [
        { nom: "Formulaire Erasmus.pdf", statut: "en_attente" },
        { nom: "Lettre motivation.pdf", statut: "en_attente" },
      ],
      historique: [{ action: "Dossier déposé", date: "2025-02-05" }],
    },
    {
      id: 3,
      numero: "RI-2025-003",
      type: "Recherche",
      etat: "valide",
      etudiant: "Sara Trabelsi",
      encadrant: "Pr. Kacem",
      dateDepot: "2025-01-20",
      etablissement: "FST",
      description: "Stage de recherche en intelligence artificielle.",
      pieces: [
        { nom: "Convention.pdf", statut: "valide" },
        { nom: "Attestation.pdf", statut: "valide" },
      ],
      historique: [
        { action: "Dossier déposé", date: "2025-01-20" },
        { action: "Validé par CEVU", date: "2025-01-25" },
      ],
    },
  ]);

  const toggleCardExpansion = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFolders = folders.filter((folder) => {
    const matchesSearch =
      folder.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      folder.etudiant.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter =
      filterStatus === "tous" || folder.etat === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: folders.length,
    en_attente: folders.filter((f) => f.etat === "en_attente").length,
    en_cours: folders.filter((f) => f.etat === "en_cours").length,
    valide: folders.filter((f) => f.etat === "valide").length,
    refuse: folders.filter((f) => f.etat === "refuse").length,
  };

  const getStatusBadgeClass = (etat) => {
    switch (etat) {
      case "en_attente":
        return "status-pending-dri";
      case "en_cours":
        return "status-validated-dri";
      case "valide":
        return "status-approved";
      case "refuse":
        return "status-rejected";
      default:
        return "";
    }
  };

  const getStatusIcon = (etat) => {
    switch (etat) {
      case "en_attente":
        return <AlertCircle className="icon-sm" />;
      case "en_cours":
        return <Clock className="icon-sm" />;
      case "valide":
        return <CheckCircle className="icon-sm" />;
      case "refuse":
        return <XCircle className="icon-sm" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (etat) => {
    switch (etat) {
      case "en_attente":
        return "En attente";
      case "en_cours":
        return "En cours";
      case "valide":
        return "Validé";
      case "refuse":
        return "Refusé";
      default:
        return "";
    }
  };

  return (
    <div className="cevu-container">
      {/* HEADER */}
      <div className="cevu-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-container">
              <FileText className="logo-icon" />
            </div>
            <div>
              <h1 className="header-title">Interface CEVU</h1>
              <p className="header-subtitle">Gestion des Dossiers Internationaux</p>
            </div>
          </div>
          <div className="header-right">
            <div className="user-role">Responsable CEVU</div>
            <div className="user-email">cevu@universite.tn</div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* STATISTICS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div>
                <div className="stat-label">Total</div>
                <div className="stat-value stat-total">{stats.total}</div>
              </div>
              <FileText className="stat-icon" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div>
                <div className="stat-label">En attente</div>
                <div className="stat-value stat-pending">{stats.en_attente}</div>
              </div>
              <AlertCircle className="stat-icon stat-icon-pending" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div>
                <div className="stat-label">En cours</div>
                <div className="stat-value stat-validated">{stats.en_cours}</div>
              </div>
              <Clock className="stat-icon stat-icon-validated" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div>
                <div className="stat-label">Validés</div>
                <div className="stat-value stat-approved">{stats.valide}</div>
              </div>
              <CheckCircle className="stat-icon stat-icon-approved" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div>
                <div className="stat-label">Refusés</div>
                <div className="stat-value stat-rejected">{stats.refuse}</div>
              </div>
              <XCircle className="stat-icon stat-icon-rejected" />
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="search-container">
          <div className="search-wrapper">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                value={searchTerm}
                placeholder="Rechercher par numéro ou étudiant..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-wrapper">
              <Filter className="filter-icon" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="tous">Tous les statuts</option>
                <option value="en_attente">En attente</option>
                <option value="en_cours">En cours</option>
                <option value="valide">Validés</option>
                <option value="refuse">Refusés</option>
              </select>
            </div>
          </div>
        </div>

        {/* APPLICATIONS LIST */}
        <div className="applications-list">
          {filteredFolders.map((folder) => (
            <div key={folder.id} className="application-card">
              <div className="card-content">
                {/* CARD HEADER */}
                <div className="card-header">
                  <div className="card-header-left">
                    <h3 className="app-id">{folder.numero}</h3>
                    <span className={`status-badge ${getStatusBadgeClass(folder.etat)}`}>
                      {getStatusIcon(folder.etat)}
                      {getStatusLabel(folder.etat)}
                    </span>
                  </div>
                </div>

                <div className="submitted-date">
                  <Calendar className="icon-sm" />
                  Soumis le {folder.dateDepot}
                </div>

                {/* INFO GRID */}
                <div className="info-grid">
                  <div>
                    <div className="section-header">
                      <User className="section-icon section-icon-instructor" />
                      <span className="section-title">Étudiant</span>
                    </div>
                    <div className="info-name">{folder.etudiant}</div>
                  </div>

                  <div>
                    <div className="section-header">
                      <Users className="section-icon section-icon-instructor" />
                      <span className="section-title">Encadrant</span>
                    </div>
                    <div className="info-name">{folder.encadrant}</div>
                  </div>

                  <div>
                    <div className="section-header">
                      <Building2 className="section-icon section-icon-partner" />
                      <span className="section-title">Établissement</span>
                    </div>
                    <div className="info-name">{folder.etablissement}</div>
                    <div className="info-detail">{folder.type}</div>
                  </div>
                </div>

                {/* PROJECT SECTION */}
                <div className="project-section">
                  <h4 className="project-title">Description du projet</h4>
                  <p className="project-description">{folder.description}</p>
                </div>

                {/* EXPANDED DETAILS */}
                {expandedCards[folder.id] && (
                  <div className="expanded-details">
                    {/* PIECES */}
                    <div className="pieces-section">
                      <h4 className="section-title">Pièces Jointes</h4>
                      <div className="pieces-list">
                        {folder.pieces.map((piece, index) => (
                          <div key={index} className="piece-item">
                            <span className="piece-name">{piece.nom}</span>
                            <span className={`status-badge ${getStatusBadgeClass(piece.statut)}`}>
                              {getStatusLabel(piece.statut)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* HISTORIQUE */}
                    <div className="historique-section">
                      <h4>Historique</h4>
                      <div className="historique-list">
                        {folder.historique.map((event, index) => (
                          <div key={index} className="historique-item">
                            <span className="historique-action">{event.action}</span>
                            <span className="historique-date">- {event.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* CARD FOOTER */}
                <div className="card-footer">
                  <button
                    onClick={() => toggleCardExpansion(folder.id)}
                    className="details-button"
                  >
                    {expandedCards[folder.id] ? "Masquer les détails" : "Voir les détails"}
                    {expandedCards[folder.id] ? (
                      <ChevronUp className="chevron-icon" />
                    ) : (
                      <ChevronDown className="chevron-icon" />
                    )}
                  </button>

                  <div className="action-buttons">
                    <button className="btn btn-print">
                      <Printer className="btn-icon" />
                      Imprimer
                    </button>
                    <button className="btn btn-email">
                      <Mail className="btn-icon" />
                      Email
                    </button>
                    {folder.etat === "en_attente" && (
                      <button className="btn btn-validate">
                        <CheckCircle className="btn-icon" />
                        Valider
                      </button>
                    )}
                    {folder.etat === "en_cours" && (
                      <button className="btn btn-transmit">
                        <Send className="btn-icon" />
                        Transmettre
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}