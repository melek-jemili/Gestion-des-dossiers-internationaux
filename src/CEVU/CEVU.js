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
} from "lucide-react";

export default function InterfaceCEVU() {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
        { nom: "Lettre d’acceptation.pdf", statut: "valide" },
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
  ]);

  const filteredFolders = folders.filter(
    (folder) =>
      folder.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      folder.etudiant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-teal-50/50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-teal-800">
            Interface CEVU – Gestion des Dossiers Internationaux
          </h1>
          <p className="text-gray-600">Suivi, validation et gestion complète</p>
        </header>

        {/* BARRE DE RECHERCHE */}
        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow">
          <Search className="text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            placeholder="Rechercher un dossier..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
          />
          <Filter className="text-gray-500" />
        </div>

        {/* LISTE DES DOSSIERS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFolders.map((folder) => (
            <div
              key={folder.id}
              className={`p-6 rounded-xl cursor-pointer transition hover:shadow-lg border 
                ${
                  selectedFolder?.id === folder.id
                    ? "border-teal-600"
                    : "border-gray-200"
                } bg-white`}
              onClick={() => setSelectedFolder(folder)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {folder.numero}
                </h3>
                <Eye className="text-teal-700" />
              </div>

              <p className="text-gray-600 mt-1">
                <User className="inline-block w-4 h-4 mr-1" />
                {folder.etudiant}
              </p>

              <div className="flex items-center gap-3 mt-3">
                {folder.etat === "en_cours" && (
                  <span className="badge badge-blue">
                    <Clock className="w-4 h-4 inline-block mr-1" />
                    En cours
                  </span>
                )}

                {folder.etat === "en_attente" && (
                  <span className="badge badge-yellow">
                    <AlertCircle className="w-4 h-4 inline-block mr-1" />
                    En attente
                  </span>
                )}

                {folder.etat === "valide" && (
                  <span className="badge badge-green">
                    <CheckCircle className="w-4 h-4 inline-block mr-1" />
                    Validé
                  </span>
                )}

                {folder.etat === "refuse" && (
                  <span className="badge badge-red">
                    <XCircle className="w-4 h-4 inline-block mr-1" />
                    Refusé
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* DETAILS DU DOSSIER */}
        {selectedFolder && (
          <div className="mt-10 bg-white p-6 shadow rounded-xl">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">
              Détails du dossier : {selectedFolder.numero}
            </h2>

            {/* INFO */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="section-title">Étudiant</h3>
                <p className="info-value">{selectedFolder.etudiant}</p>
              </div>

              <div>
                <h3 className="section-title">Encadrant</h3>
                <p className="info-value">{selectedFolder.encadrant}</p>
              </div>

              <div>
                <h3 className="section-title">Établissement</h3>
                <p className="info-value">{selectedFolder.etablissement}</p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-6">
              <h3 className="section-title">Description</h3>
              <p className="text-gray-700">{selectedFolder.description}</p>
            </div>

            {/* PIECES */}
            <div className="mt-6">
              <h3 className="section-title">Pièces Jointes</h3>

              <div className="space-y-3">
                {selectedFolder.pieces.map((piece, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium">{piece.nom}</span>

                    {piece.statut === "valide" && (
                      <span className="badge badge-green">Validé</span>
                    )}
                    {piece.statut === "en_attente" && (
                      <span className="badge badge-yellow">En attente</span>
                    )}
                    {piece.statut === "refuse" && (
                      <span className="badge badge-red">Refusé</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* HISTORIQUE */}
            <div className="mt-6">
              <h3 className="section-title">Historique</h3>

              <ul className="timeline">
                {selectedFolder.historique.map((event, index) => (
                  <li key={index}>
                    <span className="font-semibold">{event.action}</span>
                    <br />
                    <span className="text-gray-600 text-sm">{event.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="btn-teal mt-6 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Télécharger le dossier complet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
