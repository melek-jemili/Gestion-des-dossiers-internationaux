import React, { useState } from 'react';
import { Search, Filter, Clock, CheckCircle, XCircle, FileText, User, Building, ChevronDown, Mail, Printer, Send, Edit } from 'lucide-react';
import './DRI.css';

const DRIInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedCards, setExpandedCards] = useState({});

  const applications = [
    {
      id: 'DRI-2024-0001',
      status: 'pending_dri',
      receivedDate: '15/11/2024',
      instructor: {
        name: 'Karim Ben Ahmed',
        email: 'k.benahmed@universite.tn',
        department: 'Informatique'
      },
      partner: {
        name: 'Université Claude Bernard Lyon 1',
        location: 'France'
      },
      project: {
        title: "Programme d'échange avec l'Université de Lyon",
        type: "Échange d'étudiants"
      }
    },
    {
      id: 'DRI-2024-0002',
      status: 'validated_dri',
      receivedDate: '18/11/2024',
      instructor: {
        name: 'Leila Trabelsi',
        email: 'l.trabelsi@universite.tn',
        department: 'Mathématiques'
      },
      partner: {
        name: 'Université de Montréal',
        location: 'Canada'
      },
      project: {
        title: "Double-diplôme avec l'Université de Montréal",
        type: 'Double-diplôme'
      }
    },
    {
      id: 'DRI-2024-0003',
      status: 'modification_requested',
      receivedDate: '20/11/2024',
      instructor: {
        name: 'Sami Hammami',
        email: 's.hammami@universite.tn',
        department: 'Physique'
      },
      partner: {
        name: 'Massachusetts Institute of Technology',
        location: 'États-Unis'
      },
      project: {
        title: 'Collaboration recherche avec MIT',
        type: 'Collaboration en recherche'
      }
    },
    {
      id: 'DRI-2024-0004',
      status: 'approved',
      receivedDate: '10/11/2024',
      instructor: {
        name: 'Nadia Bouaziz',
        email: 'n.bouaziz@universite.tn',
        department: 'Lettres'
      },
      partner: {
        name: 'Université Paris-Sorbonne',
        location: 'France'
      },
      project: {
        title: 'Échange culturel avec Sorbonne',
        type: "Échange d'étudiants"
      }
    }
  ];

  const stats = {
    total: 4,
    pending: 1,
    validated: 1,
    approved: 1,
    rejected: 0
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending_dri: {
        icon: <Clock className="icon-sm" />,
        text: 'En attente DRI',
        className: 'status-badge status-pending-dri'
      },
      validated_dri: {
        icon: <CheckCircle className="icon-sm" />,
        text: 'Validé par DRI',
        className: 'status-badge status-validated-dri'
      },
      modification_requested: {
        icon: <Edit className="icon-sm" />,
        text: 'Modification demandée',
        className: 'status-badge status-modification'
      },
      approved: {
        icon: <CheckCircle className="icon-sm" />,
        text: 'Approuvé',
        className: 'status-badge status-approved'
      },
      rejected: {
        icon: <XCircle className="icon-sm" />,
        text: 'Rejeté',
        className: 'status-badge status-rejected'
      }
    };

    const config = statusConfig[status];
    return (
      <span className={config.className}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  const getProjectTypeBadge = (type) => {
    return <span className="project-badge">{type}</span>;
  };

  const toggleCard = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = searchQuery === '' || 
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.partner.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const renderActionButtons = (app) => {
    switch(app.status) {
      case 'pending_dri':
        return (
          <>
            <button className="btn btn-print">
              <Printer className="btn-icon" />
              Imprimer
            </button>
            <button className="btn btn-email">
              <Mail className="btn-icon" />
              Email
            </button>
            <button className="btn btn-validate">
              <CheckCircle className="btn-icon" />
              Valider
            </button>
            <button className="btn btn-modification">
              <Edit className="btn-icon" />
              Demander modification
            </button>
            <button className="btn btn-reject">
              <XCircle className="btn-icon" />
              Rejeter
            </button>
          </>
        );
      case 'validated_dri':
        return (
          <>
            <button className="btn btn-print">
              <Printer className="btn-icon" />
              Imprimer
            </button>
            <button className="btn btn-email">
              <Mail className="btn-icon" />
              Email
            </button>
            <button className="btn btn-transmit">
              <Send className="btn-icon" />
              Transmettre à DEVE
            </button>
          </>
        );
      case 'modification_requested':
      case 'approved':
        return (
          <>
            <button className="btn btn-print">
              <Printer className="btn-icon" />
              Imprimer
            </button>
            <button className="btn btn-email">
              <Mail className="btn-icon" />
              Email
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dri-container">
      {/* Header */}
      <header className="dri-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-container logo-dri">
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div>
              <h1 className="header-title">Direction des Relations Internationales</h1>
              <p className="header-subtitle">Gestion des accords et conventions internationales</p>
            </div>
          </div>
          <div className="header-right">
            <p className="user-role">Responsable DRI</p>
            <p className="user-email">dri@universite.tn</p>
            <div className="user-avatar user-avatar-dri">DRI</div>
          </div>
        </div>
      </header>

      <div className="main-content">
        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div>
                <p className="stat-label">Total</p>
                <p className="stat-value">{stats.total}</p>
              </div>
              <FileText className="stat-icon" />
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-content">
              <div>
                <p className="stat-label">En attente</p>
                <p className="stat-value stat-pending">{stats.pending}</p>
              </div>
              <Clock className="stat-icon stat-icon-pending" />
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-content">
              <div>
                <p className="stat-label">Validés</p>
                <p className="stat-value stat-validated">{stats.validated}</p>
              </div>
              <CheckCircle className="stat-icon stat-icon-validated" />
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-content">
              <div>
                <p className="stat-label">Approuvés</p>
                <p className="stat-value stat-approved">{stats.approved}</p>
              </div>
              <CheckCircle className="stat-icon stat-icon-approved" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div>
                <p className="stat-label">Rejetés</p>
                <p className="stat-value stat-rejected">{stats.rejected}</p>
              </div>
              <XCircle className="stat-icon stat-icon-rejected" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="search-container">
          <div className="search-wrapper">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher par numéro, enseignant, établissement..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-wrapper">
              <Filter className="filter-icon" />
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="pending_dri">En attente</option>
                <option value="validated_dri">Validés</option>
                <option value="modification_requested">Modification demandée</option>
                <option value="approved">Approuvés</option>
                <option value="rejected">Rejetés</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="applications-list">
          {filteredApplications.map((app) => (
            <div key={app.id} className="application-card">
              <div className="card-content">
                <div className="card-header">
                  <div className="card-header-left">
                    <h3 className="app-id">{app.id}</h3>
                    {getStatusBadge(app.status)}
                  </div>
                </div>

                <p className="submitted-date">Reçu le {app.receivedDate}</p>

                <div className="info-grid">
                  <div>
                    <div className="section-header">
                      <User className="section-icon section-icon-instructor" />
                      <h4 className="section-title">Enseignant-Chercheur</h4>
                    </div>
                    <p className="info-name">{app.instructor.name}</p>
                    <p className="info-detail">{app.instructor.email}</p>
                    <p className="info-detail">{app.instructor.department}</p>
                  </div>

                  <div>
                    <div className="section-header">
                      <Building className="section-icon section-icon-partner" />
                      <h4 className="section-title">Établissement Partenaire</h4>
                    </div>
                    <p className="info-name">{app.partner.name}</p>
                    <p className="info-detail">{app.partner.location}</p>
                  </div>
                </div>

                <div className="project-section">
                  <h4 className="section-title">Projet</h4>
                  <p className="project-title">{app.project.title}</p>
                  <div className="badges-container">
                    {getProjectTypeBadge(app.project.type)}
                  </div>
                </div>

                <div className="card-footer">
                  <button
                    onClick={() => toggleCard(app.id)}
                    className="details-button"
                  >
                    <ChevronDown className={`chevron-icon ${expandedCards[app.id] ? 'chevron-rotated' : ''}`} />
                    Voir détails
                  </button>

                  <div className="action-buttons">
                    {renderActionButtons(app)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DRIInterface;