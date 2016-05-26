from django.contrib.auth.models import User
from bucket.serializers import BucketlistSerializer, BucketlistItemSerializer
from bucket.models import BucketList, BucketListItem
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import viewsets
from django.db import IntegrityError
from rest_framework import status
from bucket.permissions import IsOwner
from django.utils.six import BytesIO
from rest_framework.parsers import JSONParser
from django.core import serializers
from functools import wraps
from rest_framework.decorators import detail_route, list_route


def isexisting(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        pk = kwargs.get('pk', "")
        try:
            bucketlist = BucketList.objects.get(pk=pk)
            return f(*args, **kwargs)
        except BucketList.DoesNotExist:
            return Response({'error': 'The bucketlist does not exist'}, 404)
    return decorated


class BucketListView(viewsets.ModelViewSet):
    """
    Bucketlist view
    """
    queryset = BucketList.objects.all()
    serializer_class = BucketlistSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def create(self, request):
        serializer = BucketlistSerializer(data=request.data)
        if serializer.is_valid():
            name = self.request.data['name']
            user = self.request.user
            try:
                bucket_list = BucketList.objects.create(
                    name=name, user=user)
                return Response({'message': 'BucketList created successfully'}, 201)
            except IntegrityError as e:
                return Response({'error': e.message}, 400)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        bucketlists = BucketList.objects.all()
        page = self.paginate_queryset(bucketlists)
        if page:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(bucketlists, many=True)
        return Response(serializer.data)

    @isexisting
    def destroy(self, request, pk=None):
        bucketlist = BucketList.objects.get(pk=pk).delete()
        return Response({'Message': 'Bucketlist deleted successfully'}, 200)

    @isexisting
    def update(self, request, pk=None):
        serializer = BucketlistSerializer(
            BucketList.objects.get(pk=pk), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, 200)
        return Response(serializer.errors, 400)

    @isexisting
    @detail_route(methods=['post'])
    def items(self, request, pk=None):
        serializer = BucketlistItemSerializer(data=request.data)
        if serializer.is_valid():
            name = self.request.data['name']
            parent_bucket = BucketList(pk=pk)
            try:
                bucket_list_item = BucketListItem.objects.create(
                    name=name, done="F", bucketlist=parent_bucket)
                return Response({'message': 'BucketList Item created successfully'}, 201)
            except IntegrityError as e:
                return Response({'error': e.message}, 400)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
