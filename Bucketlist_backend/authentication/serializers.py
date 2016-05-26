from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password'}, max_length=100, write_only=True)
    email = serializers.EmailField(max_length=100, required=True)
    username = serializers.CharField(max_length=100, required=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password')
        read_only_fields = ('id',)


class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password'}, max_length=100, write_only=True, required=True)
    email = serializers.EmailField(
        max_length=100, required=True, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password')
        read_only_fields = ('id',)
