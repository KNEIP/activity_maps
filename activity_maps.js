Activities = new Meteor.Collection('activities');
Countries = new Meteor.Collection('countries');

if (Meteor.isClient) {
  // Initialize world map
  Template.activity_map.rendered = function () {
    var map = new Datamap({element: document.getElementById('container')});
    Template.activity_map.map = map;
  };

  Template.activity_logs.activities = function () {
    return Activities.find({});
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
