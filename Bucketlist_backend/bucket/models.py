from __future__ import unicode_literals
from datetime import datetime

from django.contrib.auth.models import User
from django.db import models


class BucketList(models.Model):
    name = models.CharField(blank=False, unique=True, max_length=255)
    date_created = models.DateField(auto_now_add=True, editable=False)
    date_updated = models.DateField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             default=1)

    def __unicode__(self):
        return u'%s' % self.name


class BucketListItem(models.Model):
    name = models.CharField(blank=False, unique=True, max_length=255)
    date_created = models.DateField(auto_now_add=True, editable=False)
    date_updated = models.DateField(auto_now=True)
    done = models.BooleanField(default=False)
    bucketlist = models.ForeignKey(BucketList, on_delete=models.CASCADE,
                                   related_name="items", default=1)

    def __unicode__(self):
        return u'%s' % self.name
