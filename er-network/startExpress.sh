#!/bin/bash

# this script start all the express app REST endpoint for all the userRegistrations
# remember to node killall in case of a restart

node ./../../api/javascript/municipality/app.js
& node ./../../api/javascript/municipality2/app.js
& node ./../../api/javascript/municipality3/app.js
& node ./../../api/javascript/municipality4/app.js
& node ./../../api/javascript/confederation/app.js
& node ./../../api/javascript/canton/app.js
& node ./../../api/javascript/canton2/app.js



#to add the otther participants
