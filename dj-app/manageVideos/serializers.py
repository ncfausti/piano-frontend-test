from rest_framework import serializers

from manageVideos.models import Video

class VideoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Video

		fields = ('id','title', 'publishedDate', 'description', 'coverImage', 'sortOrder')
