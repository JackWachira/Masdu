from django.conf.urls import url, include
from rest_framework import routers
from authentication import views

app_name = 'authentication'
# router = routers.DefaultRouter()
# router.register(r'^signup', views.SignUpView.as_view())

urlpatterns = [
    url(r'^', views.SignUpView.as_view()),
]
