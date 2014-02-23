Activities = new Meteor.Collection("activities");

if (Meteor.isClient) {
  Template.activity_logs.activities = function () {
    return Activities.find({});
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    // All values listed below are default
    collectionApi = new CollectionAPI({
      authToken: undefined, // Require this string to be passed in on each request
      apiPath: 'api'        // API path prefix
    });

    // Add the collection Activities to the API "/activities" path
    collectionApi.addCollection(Activities, 'activities', {
      // All values listed below are default
      authToken: undefined,     // Require this string to be passed in on each request
      methods: ['POST','GET'],  // Allow creating, reading, updating, and deleting
      before: {
        POST: undefined,
        GET: undefined
      }
    });

    // Starts the API server
    collectionApi.start();

  });
}
