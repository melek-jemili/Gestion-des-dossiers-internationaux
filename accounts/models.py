from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    id=models.AutoField(primary_key=True)
    nom=models.CharField(max_length=100)
    prenom=models.CharField(max_length=100)
    email=models.EmailField(unique=True)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    ROLES = (
        ("admin", "Administrateur"),
        ("enseignant", "Enseignant-Chercheur"),
        ("ca", "CA"),
        ("deve", "DEVE"),
        ("dri", "DRI"),
        ("cevu", "CEVU"),
    )

    role = models.CharField(max_length=20, choices=ROLES, default="enseignant")

    def __str__(self):
        return f"{self.username} ({self.role})"
