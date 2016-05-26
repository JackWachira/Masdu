from django.conf.urls import url, include
from bucket import views
from rest_framework.routers import DefaultRouter


app_name = 'bucket'
router = DefaultRouter()
router.register(r'^', views.BucketListView)

urlpatterns = [
    url(r'', include(router.urls)),
]
