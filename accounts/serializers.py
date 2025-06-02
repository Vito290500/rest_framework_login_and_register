"""
Serializers for the user API View.
"""
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    """Class that handling user registraion verification"""

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password"},
        min_length=8,         
        validators=[validate_password],
    )

    class Meta:
        model = User
        fields = ("id","username","email","password")

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class LoginSerializer(serializers.Serializer):
    """Class that handling login registraion and authenticate"""
    username = serializers.CharField()
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    def validate(self, attrs):
        user = authenticate(
            username=attrs["username"],
            password=attrs["password"]
        )
        if not user:
            raise serializers.ValidationError("Credenziali non valide")
        attrs["user"]=user
        return attrs
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ("id", "username", "email")
        read_only_fields = fields