# Activity maps

Sees your activities in real-time on a world map.

# Make it runs

You have to install meteor and meteorite first, then clone this repository and execute meteor:

    curl https://install.meteor.com | /bin/sh
    npm install -g meteorite
    git clone https://github.com/KNEIP/activity_maps.git
    cd activity_maps/
    mrt

Now open your browser to http://localhost:3000/.

# REST API

This application include an API in order to create activities.

## GET activities

Returns all activities stored

    $ curl http://localhost:3000/api/activities

## GET activity

Returns the activity for the given id

    $ curl http://localhost:3000/api/activities/Bc8FsaNcqznqh6iew

## POST activities

Create a new activity

    $ curl -d "{\"iso\": \"pr\", \"message\": \"This is my message\"}" http://localhost:3000/api/activities
