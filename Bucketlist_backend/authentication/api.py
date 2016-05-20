from api.models import BucketList, BucketListItem
from api.serializers import (BucketlistSerializer, BucketlistItemSerializer,
                             UserSerializer)
from rest_framework import generics
from rest_framework import permissions
from django.shortcuts import get_object_or_404
from api.permissions import IsOwner
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class SignUpAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):
        username = self.request.data['username']
        email = self.request.data['email']
        password = self.request.data['password']

        user = User.objects.create_user(
            username=username, email=email, password=password)
        token = Token.objects.create(user=user)
