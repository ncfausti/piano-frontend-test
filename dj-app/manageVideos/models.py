from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Video(models.Model):

	title = models.CharField(max_length=100)
	publishedDate = models.DateTimeField(auto_now_add=True)
	description = models.TextField()
	coverImage = models.CharField(max_length=300)
	sortOrder = models.IntegerField()


	# Returns the string representation of the model.
	def __unicode__(self):              # __unicode__ on Python 2
		return self.title