"""
Database for accounts
"""
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """tabella del database per user"""

    email = models.EmailField(unique=True)

    REQUIRED_FIELDS = ["email"]        

    def __str__(self):
        return self.email