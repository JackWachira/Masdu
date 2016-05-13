from django.conf.urls import url, include
from rest_framework import routers
from authentication import views

app_name = 'authentication'
router = routers.DefaultRouter()
router.register(r'^signup', views.SignUpView)

urlpatterns = [
    url(r'^', include(router.urls)),
]
