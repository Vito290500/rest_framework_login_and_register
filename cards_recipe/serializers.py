"""
Serializers class for recipe cards API
"""

from rest_framework import serializers
from .models import Card

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card 
        fields = [
            'id',
            'owner',
            'img',
            'title',
            'description',
            'created_at',
            'category',
            'items',
        ]
        read_only_fields = ['id', 'owner', 'created_at']

    def validate_title(self, value):
        """Validate the title lenght"""
        if len(value) < 3:
            raise serializers.ValidationError("Il titolo deve contenere almeno 3 caratteri.")
        return value

    def validate_items(self, value):
        """
        Controlla che items sia un array di stringhe non vuote.
        """
        if not isinstance(value, list):
            raise serializers.ValidationError("Items deve essere una lista.")
        for elem in value:
            if not isinstance(elem, str) or not elem.strip():
                raise serializers.ValidationError("Ogni elemento deve essere una stringa non vuota.")
        return value

