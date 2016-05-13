from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(max_length=100, write_only=True)
    email = serializers.CharField(max_length=100, required=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name')
        read_only_fields = ('id',)
