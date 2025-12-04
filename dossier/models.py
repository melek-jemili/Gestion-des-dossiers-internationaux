from django.db import models

# Create your models here.
class Dossier(models.Model):
    id = models.AutoField(primary_key=True)
    nom=models.CharField(max_length=100)
    prenom=models.CharField(max_length=100)
    email=models.EmailField()
    departement=models.CharField(max_length=100)
    grade=models.CharField(max_length=100)
    nomProjet = models.CharField(max_length=200)
    typeAccord=models.CharField(max_length=100)
    choix=models.BooleanField()
    etablissementPartenaire=models.CharField(max_length=200)
    pays=models.CharField(max_length=100)
    ville=models.CharField(max_length=100)
    durée=models.CharField(max_length=100)
    objectif = models.TextField()
    commentaires = models.TextField(blank=True, null=True)
    dossier_pdf = models.FileField(upload_to='dossiers/', blank=True, null=True)
    
    ETATS = (
        ("ferme", "Fermé"),
        ("en attente de DRI", "En attente de DRI"),
        ("en attente de DEVE", "En attente de DEVE"),
        ("en attente de CEVE", "En attente de CAEVE"),
        ("en attente de CEVU", "En attente de CEVU"),
        ("en attente de CA", "En attente de CA"),
        ("accepté", "Accepté"),
        ("rejeté", "Rejeté"),
    )
    etat = models.CharField(max_length=20, choices=ETATS, default="ferme")



    def __str__(self):
        return f"Dossier de {self.nom} {self.prenom} - Projet: {self.nomProjet}"
