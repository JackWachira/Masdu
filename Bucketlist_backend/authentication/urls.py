from django.conf.urls import url, include
from rest_framework import routers
from authentication import views
from rest_framework.routers import DefaultRouter


app_name = 'authentication'
router = DefaultRouter()
router.register(r'login', views.LoginView)
urlpatterns = router.urls

urlpatterns = [
    # url(r'^signup', views.SignUpView.as_view()),
    url(r'^', include(router.urls)),
]
