# Submission for piano-frontend-test by Kevin Earl Denny

### To run Angular app

cd ng-app
npm install
npm start

## Front-end functionalities

1. Display a list of videos
⋅⋅1. Allow a user to delete a video from list
⋅⋅2. Allow a user to change the order of videos in the list

2. Allow a user to add a new video to a list
..1. Allow a user to search for a new video to be added on Youtube as an 'above and beyond' functionality added based on my conversation with Greg Kristofor.

3. Allow a user to edit existing videos from list
..1. When a video within the list is clicked, a modal appears with editable fields for the video
..2. The Published Date field includes a Bootstrap Datepicker, as suggested in the original problem description.


## Backend notes

I have significant experience with Django as a backend framework, so I initially built out a RESTful API using the Django REST framework. I have included the source code for this API in the dj-app folder, and the server for this API is currently running at http://kevinearl.pythonanywhere.com/.

Per my email conversation with Greg Kristofer, it was suggested that I re-build this API using Node.js due to the Piano team's familiarity with Node. I will hopefully be completing this over the coming days, depending on time constraints.