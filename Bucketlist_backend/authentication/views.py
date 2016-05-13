from django.contrib.auth.models import User
from authentication.serializers import UserSerializer
from django.db.models.signals import post_save
from rest_framework import permissions
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings
from rest_framework import generics


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
