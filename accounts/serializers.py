from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "role"]

    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            email=validated_data["email"],
            role=validated_data.get("role", "enseignant")
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


from django.contrib.auth import authenticate
from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        user = authenticate(username=email, password=password)
        # IMPORTANT: username=email pour AbstractUser modifié

        if user is None:
            raise serializers.ValidationError("Email ou mot de passe incorrect.")

        data["user"] = user
        return data



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "role"]


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email"]
