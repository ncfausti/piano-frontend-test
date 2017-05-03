from django.forms.models import model_to_dict
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from django.http import HttpResponse

from manageVideos.models import Video
from manageVideos.serializers import VideoSerializer

class VideosListView(APIView):

    def get(self, request):
        videos = Video.objects.all().order_by('sortOrder')
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(request.data)
        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            #################### END POST RELATED METHODS ####################

class VideoEditView(APIView):

    def post(self, request, video_key):
        existingVideo = Video.objects.get(id=video_key)
        for col in request.data:
            setattr(existingVideo, col, request.data[col])
            # existingVideo[col] = request.data[col]
        existingVideo.save()

        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, video_key):
        videoToDelete = Video.objects.get(id=video_key)

        videoToDelete.delete()

        return HttpResponse(status=204)
            #################### END POST RELATED METHODS ####################


class MoveVideoUp(APIView):

    def post(self, request, video_key):
        existingVideo = Video.objects.get(id=video_key)
        oldSpot = existingVideo.sortOrder
        newSpot = oldSpot - 1
        displacedVideo = Video.objects.filter(sortOrder=newSpot)[0]
        existingVideo.sortOrder = newSpot
        existingVideo.save()


        displacedVideo.sortOrder = oldSpot
        displacedVideo.save()

        return HttpResponse(status=204)

class MoveVideoDown(APIView):

    def post(self, request, video_key):
        existingVideo = Video.objects.get(id=video_key)
        oldSpot = existingVideo.sortOrder
        newSpot = oldSpot + 1
        displacedVideo = Video.objects.filter(sortOrder=newSpot)[0]
        existingVideo.sortOrder = newSpot
        existingVideo.save()


        displacedVideo.sortOrder = oldSpot
        displacedVideo.save()

        return HttpResponse(status=204)
