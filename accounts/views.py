""" 
Views for API
"""
from rest_framework.response import Response
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema  

from .serializers import *


class RegisterView(generics.CreateAPIView):
    """API for registration"""
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


@extend_schema(request=LoginSerializer,responses={200: None},)
class LoginView(APIView):
    """API for login"""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_200_OK,
        )
    

class MeView(generics.RetrieveAPIView):
    serializer_class   = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user