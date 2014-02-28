Activities = new Meteor.Collection("activities");

if (Meteor.isClient) {
  // https://github.com/matb33/meteor-collection-hooks
  // After insert callback
  Activities.after.insert(function (userId, doc) {
    var map = Template.activity_map.map;

    // var countries = JSON.parse("countries.json")

    map.arc([
      {
        origin: { latitude: luxembourg.latitude, longitude: luxembourg.longitude },
        destination: { latitude: 37.618889, longitude: -122.375 }
      }
    ]);
  });

  // Initialize world map
  Template.activity_map.rendered = function () {
    var map = new Datamap({element: document.getElementById('container')});
    Template.activity_map.map = map;
  }

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
