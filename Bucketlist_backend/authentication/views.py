from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from authentication.serializers import UserSerializer
from django.db.models.signals import post_save
from rest_framework import permissions
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework import status


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    print "create_auth_token"
    if created:
        print "created token"
        Token.objects.create(user=instance)


class SignUpView(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request):
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        email = request.data['email']
        password = request.data['password']
        new_user = User.objects.create_user(
            first_name + " " + last_name, email, password)
        new_user.is_active = True
        new_user.first_name = first_name
        new_user.last_name = last_name
        serializer = self.serializer_class(new_user, data=request.data)
        if serializer.is_valid():
            serializer.save()
        # new_user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    # def list(self, request):
    #     pass
