"""
Models for cards
"""
from django.db import models
from django.conf import settings

CATEGORY_CHOICES = [
    ('Travel', 'travel'),
    ('Finanza', 'finanza'),
    ('Sport', 'sport'),
    ('Hobby', 'hobby'),
    ('Outfit', 'outfit'),
    ('Food', 'food'),
    ('Idea', 'idea'),
    ('Project', 'project')
]

class Card(models.Model):
    """Cards Table"""

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cards')
    img = models.URLField(max_length=9999, blank=True, help_text="Inserisci qui l'URL dell'immagine")   
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='altro')

    items = models.JSONField(default=list, blank=True, help_text="Elenco di elementi associati alla Card")

    def __str__(self):
        return f"{self.title}" ({self.owner.username})
