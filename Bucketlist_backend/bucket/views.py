from django.shortcuts import render
from api.models import BucketList, BucketListItem
from api.serializers import (BucketlistSerializer, BucketlistItemSerializer,
                             UserSerializer)
from rest_framework import generics
from rest_framework import permissions
from django.shortcuts import get_object_or_404
from api.permissions import IsOwner
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token



