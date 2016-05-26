from django.contrib.auth.models import User
from bucket.serializers import BucketlistSerializer, BucketlistItemSerializer
from bucket.models import BucketList, BucketListItem
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import viewsets
from django.db import IntegrityError
from rest_framework import status


class BucketListView(viewsets.ViewSet):
    """
    Bucketlist view
    """
    queryset = BucketList.objects.all()
    serializer_class = BucketlistSerializer
    permission_classes = (permissions.IsAuthenticated,)

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
