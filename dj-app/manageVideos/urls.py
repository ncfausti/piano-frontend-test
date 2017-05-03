from django.conf.urls import url

from manageVideos import views

urlpatterns = [

    url(r'^videos/$', views.VideosListView.as_view()),
    url(r'^videos/(?P<video_key>[0-9]+)/$', views.VideoEditView.as_view()),
    url(r'^videos/(?P<video_key>[0-9]+)/moveup/$', views.MoveVideoUp.as_view()),
    url(r'^videos/(?P<video_key>[0-9]+)/movedown/$', views.MoveVideoDown.as_view()),
]