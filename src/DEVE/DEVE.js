import React, { useState } from 'react';
import { Search, Filter, Clock, CheckCircle, XCircle, FileText, User, Building, ChevronDown } from 'lucide-react';
import './DEVE.css';

const DeveValidationInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedCards, setExpandedCards] = useState({});

  const applications = [
    {
      id: 'DRI-2024-0002',
      status: 'pending',
      submittedDate: '20/11/2024',
      instructor: {
        name: 'Leila Trabelsi',
        email: 'l.trabelsi@universite.tn',
        department: 'Mathématiques'
      },
      partner: {
        name: 'Université de Montréal',
        location: 'Montréal, Canada'
      },
      project: {
        title: "Double-diplôme avec l'Université de Montréal",
        type: 'Double-diplôme',
        direction: 'Bidirectionnelle',
        students: '5 étudiants/an',
        duration: 'Durée: 5 ans'
      }
    },
    {
      id: 'DRI-2024-0005',
      status: 'pending',
      submittedDate: '23/11/2024',
      instructor: {
        name: 'Amir Kacem',
        email: 'a.kacem@universite.tn',
        department: 'Économie'
      },
      partner: {
        name: 'Sciences Po Paris',
        location: 'Paris, France'
      },
      project: {
        title: "Programme d'échange avec Sciences Po Paris",
        type: "Échange d'étudiants",
        direction: 'Bidirectionnelle',
        students: '8 étudiants/an',
        duration: 'Durée: 3 ans'
      }
    },
    {
      id: 'DRI-2024-0006',
      status: 'validated',
      submittedDate: '17/11/2024',
      processedDate: '25/11/2024',
      instructor: {
        name: 'Rania Mansour',
        email: 'r.mansour@universite.tn',
        department: 'Génie Civil'
      },
      partner: {
        name: 'Polytechnique Montréal',
        location: 'Montréal, Canada'
      },
      project: {
        title: 'Échange avec Polytechnique Montréal',
        type: "Échange d'étudiants",
        direction: 'Bidirectionnelle',
        students: '6 étudiants/an',
        duration: 'Durée: 4 ans'
      }
    },
    {
      id: 'DRI-2024-0007',
      status: 'rejected',
      submittedDate: '12/11/2024',
      processedDate: '19/11/2024',
      instructor: {
        name: 'Mohamed Gharbi',
        email: 'm.gharbi@universite.tn',
        department: 'Biologie'
      },
      partner: {
        name: 'Université de Bordeaux',
        location: 'Bordeaux, France'
      },
      project: {
        title: 'Cotutelle de thèse avec Université de Bordeaux',
        type: 'Cotutelle',
        direction: 'Sortante',
        students: '2 étudiants/an',
        duration: 'Durée: 3 ans'
      }
    }
  ];

  const stats = {
    total: 4,
    pending: 2,
    validated: 1,
    rejected: 1
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        icon: <Clock className="icon-sm" />,
        text: 'En attente DEVE',
        className: 'status-badge status-pending'
      },
      validated: {
        icon: <CheckCircle className="icon-sm" />,
        text: 'Validé par DEVE',
        className: 'status-badge status-validated'
      },
      rejected: {
        icon: <XCircle className="icon-sm" />,
        text: 'Rejeté par DEVE',
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

  return (
    <div className="deve-container">
      {/* Header */}
      <header className="deve-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-container">
              <FileText className="logo-icon" />
            </div>
            <div>
              <h1 className="header-title">Direction des Études et de la Vie Étudiante</h1>
              <p className="header-subtitle">Validation académique des accords internationaux</p>
            </div>
          </div>
          <div className="header-right">
            <p className="user-role">Responsable DEVE</p>
            <p className="user-email">deve@universite.tn</p>
            <div className="user-avatar">DEVE</div>
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
                <p className="stat-label">Rejetés</p>
                <p className="stat-value stat-rejected">{stats.rejected}</p>
              </div>
              <XCircle className="stat-icon stat-icon-rejected" />
            </div>
          </div>
        </div>

        {/* Role Description */}
        <div className="role-description">
          <div className="role-content">
            <div className="role-indicator"></div>
            <div>
              <p className="role-title">Rôle de la DEVE :</p>
              <p className="role-text">
                Vous êtes chargé d'examiner la compatibilité des accords avec nos programmes académiques, 
                la cohérence des crédits ECTS, et l'impact sur la vie étudiante.
              </p>
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
                <option value="pending">En attente</option>
                <option value="validated">Validés</option>
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

                <p className="submitted-date">Transmis le {app.submittedDate}</p>

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
                    <span className="badge badge-direction">{app.project.direction}</span>
                    <span className="badge badge-students">{app.project.students}</span>
                    <span className="badge badge-duration">{app.project.duration}</span>
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
                    {app.status === 'pending' && (
                      <>
                        <button className="btn btn-validate">
                          <CheckCircle className="btn-icon" />
                          Valider
                        </button>
                        <button className="btn btn-reject">
                          <XCircle className="btn-icon" />
                          Rejeter
                        </button>
                      </>
                    )}
                    {app.status === 'validated' && (
                      <>
                        <button className="btn btn-transmit">
                          Transmettre au CEVU
                        </button>
                        <span className="processed-date">
                          Traité le {app.processedDate}
                        </span>
                      </>
                    )}
                    {app.status === 'rejected' && (
                      <span className="processed-date">
                        Traité le {app.processedDate}
                      </span>
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
};

export default DeveValidationInterface;