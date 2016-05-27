from django.conf.urls import url, include
from bucket import views
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from django.conf.urls import patterns

app_name = 'bucket'

router = routers.SimpleRouter()
router.register(r'^', views.BucketListView)

buckets_router = routers.NestedSimpleRouter(router, r'^', lookup='bucketlists')
buckets_router.register(r'items', views.BucketListItemView, base_name='items')

urlpatterns = patterns('',
                       url(r'^', include(router.urls)),
                       url(r'^', include(buckets_router.urls)),
                       )
