// This file is responsible to maintain the 'countries' table up-to-date
//
// The table is seeded based on the private/countrycode-latlong.min.json file.
Meteor.startup(function () {
  // Read the JSON file from private/countrycode-latlong.min.json
  var countries = JSON.parse(Assets.getText("countrycode-latlong.min.json"));

  // Iterate over the countries and ensure the datbase is up-to-date
  for(iso in countries) {
    var dbCountry = Countries.findOne({iso: iso});
    if (! dbCountry)
    {
      var country = countries[iso];
      console.log('[Countries seed] Adding missing country with ISO ' + iso);
      Countries.insert({iso: iso, latitude: country.lat, longitude: country.long});
    }
  }

  countriesCount = Countries.find({}).count();
  console.log('[Countries seed] Finished. Countries table has ' + countriesCount + ' records.');
});
