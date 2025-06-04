"""
Views for cards recipe API.
"""

from rest_framework import viewsets, permissions
from .models import *
from .serializers import CardSerializer

class CardViewSet(viewsets.ModelViewSet):
    """Views for cards API"""

    queryset = Card.objects.all()
    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        """Function that automatically associate the owner to logged user"""
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        """Function that return all cards for the logged user"""
        return Card.objects.filter(owner=self.request.user)
    

