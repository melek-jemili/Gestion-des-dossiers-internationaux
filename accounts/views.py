from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
#from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from .models import User

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserSerializer,
    UpdateProfileSerializer
)


# -------- REGISTER --------
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            User = serializer.save()
            refresh = RefreshToken.for_user(User)

            return Response({
                "message": "Inscription réussie.",
                "user": UserSerializer(User).data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# -------- LOGIN --------
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Connexion réussie.",
            "user": UserSerializer(user).data,
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        }, status=200)



# -------- PROFILE --------
class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UpdateProfileSerializer(
            request.user,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profil mis à jour avec succès."})
        return Response(serializer.errors, status=400)

# -------- LOGOUT --------
from rest_framework_simplejwt.tokens import RefreshToken

@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username et password requis."}, status=status.HTTP_400_BAD_REQUEST)

        # Vérifie les identifiants
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({"error": "Identifiants invalides."}, status=status.HTTP_400_BAD_REQUEST)

        # Blackliste tous les refresh tokens du user
        tokens = OutstandingToken.objects.filter(user=user)
        for token in tokens:
            BlacklistedToken.objects.get_or_create(token=token)

        return Response({"message": "Déconnexion réussie."}, status=status.HTTP_200_OK)