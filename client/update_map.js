Meteor.startup(function () {

  // https://github.com/matb33/meteor-collection-hooks
  // After insert callback
  Activities.after.insert(function (userId, doc) {
    // Exit the callback in case the document has no 'iso' field.
    if (typeof doc.iso == 'undefined') {
      console.log('The activity with ID ' + this._id + ' is missing the "iso" field.');
      return false;
    }

    // Retreive the map object
    var map = Template.activity_map.map;
    if (! map)
    {
      console.log('Unable to retreive the reference to the DataMaps instance.');
      return false;
    }

    // Search the country
    var country = Countries.findOne({iso: doc.iso});
    if (! country)
    {
      console.log('Unknown country with ISO ' + doc.iso);
      return false;
    }

    var luxembourg = Countries.findOne({iso: 'lu'});
    if (! luxembourg)
    {
      console.log('Luxembourg not found !');
      return false;
    }

    // Draw an arc from Luxembourg to the given country on the map
    console.log('Drawing arc from lu to ' + country.iso + '...');
    map.arc([
      {
        origin: { latitude: luxembourg.latitude, longitude: luxembourg.longitude },
        destination: { latitude: country.latitude, longitude: country.longitude }
      }
    ]);
  });

});
