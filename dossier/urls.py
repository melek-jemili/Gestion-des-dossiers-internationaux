from django.urls import path
from .views import *

urlpatterns = [
    path('deposer/', deposer_dossier, name='deposer_dossier'),
    path('lister/', lister_dossiers, name='lister_dossiers'),
    path('liste/',liste,name='liste_dossiers_utilisateur'),
    path('modifier/<int:dossier_id>/', modifier_dossier, name='modifier_dossier'),
    path('detail/<int:dossier_id>/', dossier_details, name='detail_dossier'),
    path('statistiques/fermes/', statistiques_dossiers_fermes, name='statistiques_dossiers_fermes'),
    path('statistiques/fermes_user/', statistiques_dossiers_fermes_user, name='statistiques_dossiers_fermes_user'),
    path('statistiques/refuses_user/', statistiques_dossiers_refuse_user, name='statistiques_dossiers_refuses_user'),
    path('statistiques/acceptes/', statistiques_dossiers_acceptes, name='statistiques_dossiers_acceptes'),
    path('statistiques/rejetes/', statistiques_dossiers_rejetes, name='statistiques_dossiers_rejetes'),
    path('statistiques/en_cours_DRI/', statistiques_dossiers_en_attenteDRI, name='statistiques_dossiers_en_cours-DRI'),
    path('statistiques/en_cours_DEVE/', statistiques_dossiers_en_attenteDEVE, name='statistiques_dossiers_en_cours-DEVE'),
    path('statistiques/en_cours_CEVE/', statistiques_dossiers_en_attenteCEVE, name='statistiques_dossiers_en_cours-CEVE'),
    path('statistiques/en_cours_CEVU/', statistiques_dossiers_en_attenteCEVU, name='statistiques_dossiers_en_cours-CEVU'),
    path('statistiques/en_cours_CA/', statistiques_dossiers_en_attenteCA, name='statistiques_dossiers_en_cours-CA'),
]