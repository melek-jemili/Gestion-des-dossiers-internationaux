import React, { useState } from "react";
import "./CA.css";

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
  ThumbsUp,
  ThumbsDown,
  FileCheck,
} from "lucide-react";

export default function InterfaceCA() {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("tous");
  const [expandedCards, setExpandedCards] = useState({});

  const [folders, setFolders] = useState([
    {
      id: 1,
      numero: "RI-2025-001",
      type: "Recherche",
      etat: "transmis_ca",
      etudiant: "Amina Ben Youssef",
      encadrant: "Pr. Slimani",
      dateDepot: "2025-01-15",
      dateTransmission: "2025-01-28",
      etablissement: "ENSI",
      description: "Demande de validation d'un stage de recherche à Paris.",
      avisCEVU: "Favorable - Dossier complet et projet pertinent",
      pieces: [
        { nom: "Lettre d'acceptation.pdf", statut: "valide" },
        { nom: "Convention.pdf", statut: "valide" },
        { nom: "Relevé de notes.pdf", statut: "valide" },
        { nom: "Avis CEVU.pdf", statut: "valide" },
      ],
      historique: [
        { action: "Dossier déposé", date: "2025-01-15" },
        { action: "Validé par CEVU", date: "2025-01-25" },
        { action: "Transmis au CA", date: "2025-01-28" },
      ],
    },
    {
      id: 2,
      numero: "RI-2025-002",
      type: "Mobilité",
      etat: "transmis_ca",
      etudiant: "Yassine Jemli",
      encadrant: "Dr. Saidi",
      dateDepot: "2025-02-05",
      dateTransmission: "2025-02-10",
      etablissement: "ISAMM",
      description: "Demande de mobilité semestre 2 – Espagne.",
      avisCEVU: "Favorable - Mobilité académique approuvée",
      pieces: [
        { nom: "Formulaire Erasmus.pdf", statut: "valide" },
        { nom: "Lettre motivation.pdf", statut: "valide" },
        { nom: "Avis CEVU.pdf", statut: "valide" },
      ],
      historique: [
        { action: "Dossier déposé", date: "2025-02-05" },
        { action: "Validé par CEVU", date: "2025-02-08" },
        { action: "Transmis au CA", date: "2025-02-10" },
      ],
    },
    {
      id: 3,
      numero: "RI-2025-003",
      type: "Recherche",
      etat: "approuve",
      etudiant: "Sara Trabelsi",
      encadrant: "Pr. Kacem",
      dateDepot: "2025-01-20",
      dateTransmission: "2025-01-26",
      dateDecision: "2025-02-01",
      etablissement: "FST",
      description: "Stage de recherche en intelligence artificielle.",
      avisCEVU: "Favorable - Excellent projet de recherche",
      decisionCA: "Approuvé par le CA lors de la séance du 01/02/2025",
      pieces: [
        { nom: "Convention.pdf", statut: "valide" },
        { nom: "Attestation.pdf", statut: "valide" },
        { nom: "Avis CEVU.pdf", statut: "valide" },
        { nom: "Décision CA.pdf", statut: "valide" },
      ],
      historique: [
        { action: "Dossier déposé", date: "2025-01-20" },
        { action: "Validé par CEVU", date: "2025-01-25" },
        { action: "Transmis au CA", date: "2025-01-26" },
        { action: "Approuvé par CA", date: "2025-02-01" },
      ],
    },
    {
      id: 4,
      numero: "RI-2025-004",
      type: "Mobilité",
      etat: "rejete",
      etudiant: "Mohamed Ali",
      encadrant: "Dr. Mansouri",
      dateDepot: "2025-01-18",
      dateTransmission: "2025-01-30",
      dateDecision: "2025-02-05",
      etablissement: "ENIT",
      description: "Demande de stage à l'étranger.",
      avisCEVU: "Favorable avec réserves",
      decisionCA: "Rejeté - Dossier incomplet malgré avis CEVU",
      pieces: [
        { nom: "Demande.pdf", statut: "valide" },
        { nom: "Avis CEVU.pdf", statut: "valide" },
      ],
      historique: [
        { action: "Dossier déposé", date: "2025-01-18" },
        { action: "Validé par CEVU", date: "2025-01-28" },
        { action: "Transmis au CA", date: "2025-01-30" },
        { action: "Rejeté par CA", date: "2025-02-05" },
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
    transmis_ca: folders.filter((f) => f.etat === "transmis_ca").length,
    en_deliberation: folders.filter((f) => f.etat === "en_deliberation").length,
    approuve: folders.filter((f) => f.etat === "approuve").length,
    rejete: folders.filter((f) => f.etat === "rejete").length,
  };

  const getStatusBadgeClass = (etat) => {
    switch (etat) {
      case "transmis_ca":
        return "status-pending-dri";
      case "en_deliberation":
        return "status-validated-dri";
      case "approuve":
        return "status-approved";
      case "rejete":
        return "status-rejected";
      default:
        return "";
    }
  };

  const getStatusIcon = (etat) => {
    switch (etat) {
      case "transmis_ca":
        return <Send className="icon-sm" />;
      case "en_deliberation":
        return <Clock className="icon-sm" />;
      case "approuve":
        return <CheckCircle className="icon-sm" />;
      case "rejete":
        return <XCircle className="icon-sm" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (etat) => {
    switch (etat) {
      case "transmis_ca":
        return "Transmis au CA";
      case "en_deliberation":
        return "En délibération";
      case "approuve":
        return "Approuvé";
      case "rejete":
        return "Rejeté";
      default:
        return "";
    }
  };

  return (
    <div className="ca-container">
      {/* HEADER */}
      <div className="ca-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-container logo-ca">
              <FileCheck className="logo-icon" />
            </div>
            <div>
              <h1 className="header-title">Conseil Administratif</h1>
              <p className="header-subtitle">Décisions finales sur les dossiers internationaux</p>
            </div>
          </div>
          <div className="header-right">
            <div className="user-role">Secrétaire Général</div>
            <div className="user-email">ca@universite.tn</div>
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
                <div className="stat-label">Transmis CA</div>
                <div className="stat-value stat-pending">{stats.transmis_ca}</div>
              </div>
              <Send className="stat-icon stat-icon-pending" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div>
                <div className="stat-label">En délibération</div>
                <div className="stat-value stat-validated">{stats.en_deliberation}</div>
              </div>
              <Clock className="stat-icon stat-icon-validated" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div>
                <div className="stat-label">Approuvés</div>
                <div className="stat-value stat-approved">{stats.approuve}</div>
              </div>
              <ThumbsUp className="stat-icon stat-icon-approved" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div>
                <div className="stat-label">Rejetés</div>
                <div className="stat-value stat-rejected">{stats.rejete}</div>
              </div>
              <ThumbsDown className="stat-icon stat-icon-rejected" />
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
                <option value="transmis_ca">Transmis au CA</option>
                <option value="en_deliberation">En délibération</option>
                <option value="approuve">Approuvés</option>
                <option value="rejete">Rejetés</option>
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
                  Transmis le {folder.dateTransmission}
                  {folder.dateDecision && ` • Décision le ${folder.dateDecision}`}
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

                {/* AVIS CEVU */}
                <div className="avis-section">
                  <div className="section-header">
                    <FileCheck className="section-icon section-icon-instructor" />
                    <span className="section-title">Avis du CEVU</span>
                  </div>
                  <p className="avis-content">{folder.avisCEVU}</p>
                </div>

                {/* DECISION CA (si existe) */}
                {folder.decisionCA && (
                  <div className="decision-section">
                    <div className="section-header">
                      <MessageSquare className="section-icon section-icon-partner" />
                      <span className="section-title">Décision du CA</span>
                    </div>
                    <p className="decision-content">{folder.decisionCA}</p>
                  </div>
                )}

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
                            <span className={`status-badge ${getStatusBadgeClass("approuve")}`}>
                              Valide
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
                    <button className="btn btn-download">
                      <Download className="btn-icon" />
                      Dossier
                    </button>
                    {folder.etat === "transmis_ca" && (
                      <>
                        <button className="btn btn-validate">
                          <ThumbsUp className="btn-icon" />
                          Approuver
                        </button>
                        <button className="btn btn-reject">
                          <ThumbsDown className="btn-icon" />
                          Rejeter
                        </button>
                      </>
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