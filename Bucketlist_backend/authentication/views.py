from django.contrib.auth.models import User
from authentication.serializers import UserSerializer, LoginSerializer
from django.db.models.signals import post_save
from rest_framework import permissions
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings
from rest_framework import generics
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework import status
from rest_framework import renderers
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from rest_framework import viewsets


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    print "create_auth_token"
    if created:
        print "created token"
        Token.objects.create(user=instance)


class SignUpView(generics.CreateAPIView):
    """
    Signup for users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):
        username = self.request.data['username']
        email = self.request.data['email']
        password = self.request.data['password']

        new_user = User.objects.create_user(
            username=username, email=email, password=password)


class LoginView(viewsets.ViewSet):

    """
    Login for users
    """
    queryset = User.objects.all()
    serializer_class = LoginSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = self.request.data['email']
            password = self.request.data['password']
            user = authenticate(username=email, password=password)
            if user is not None:
                if user.is_active:
                    token, created = Token.objects.get_or_create(user=user)
                    return Response({'Authorization': token.key}, 200)
                else:
                    return Response({'Error': "Account Disabled"}, 403)
            else:
                return Response({'Error': "Incorrect Username/Password"}, 400)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
