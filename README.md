# piano-frontend-test

## Piano Frontend Technical Test

The objective is to demonstrate competent frontend skills with some light backend capability. This will highlight the ability to:

- Use basic Git functionality
- Create and access a simple API
- Use a JS framework to create a frontend to manage the API data

**Fork this repo**, and using a frontend Javascript framework of your choice (React/Angular/Ember/Bootstrap) and a package manager of your choice (Webpack/Gulp/Grunt) in a Node environment, set up a basic user interface that allows a user to CRUD (create, read/list, update, and delete) videos as well as reorder them. Setup an interface that returns a list of videos to the user. If you are comfortable setting up a real backend for this using your preferred Node API framework (Express/hapi/koa/etc), that is ideal. If you don't feel comfortable setting up a live backend interface, create a mock interface that returns a static list of videos by simply embedding the videos in the page, e.g.

```
MockBackend.listVideos = function() {
  return [
  {
   id: 1,
   title: "My video #1",
   publishedDate: "2015-08-13 00:00:00",
   description: "The description #2",
   coverImage: "http://link/to/image1",
   sortOrder: 0
}, {
   id: 2,
   title: "My video #2",
   publishedDate: "2015-07-13 00:00:00",
   description: "The description #2",
   coverImage: "http://link/to/image2",
   sortOrder: 1
}
  // etc. would be good to have at least a 5-6 videos to play around with
 ];
}
```

Display these videos in list format with some styling of your choosing (i.e. should not be Times New Roman).

Allow a user to click on a particular video in the list. This action should open a modal with the details of the video populated into input fields so the user can edit the fields in the modal. Bonus points for a calendar widget. The modal should have cancel/save buttons.

If the user makes changes and saves the updated video details, it should dismiss the modal and the list should be updated with the updated video. If you are integrating a backend component, submit to the backend on save and have it actually save the updated video. If you are not saving to a real backend it should still update the model so the list shows the updates at least until page refresh.

Each video should have a delete button which deletes that video from the videos. Again, if there is a live backend it should submit it to the backend. A mock backend should just remove from the list.

There should be a "Create" button that allows a user to add a new video to the list. Again, a live backend should be able to accept this. The mock backend should just just add it to the end of the list.

When your application is complete, **create a pull request that will merge your code back to this repo in a branch named `<your-first-name>-<your-last-name>`. Do not create a PR to `master`.**

*Bonus: The ability to re-order the videos and have the sortOrder updated.*