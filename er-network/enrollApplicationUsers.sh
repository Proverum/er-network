#!/bin/bash

# this file runs all the organizations enrollment script which first enroll the addmin,
# then adds some affiliations(e.g.,BundesamtX which is not really necessary) and then also registers an additional user
# clerk1 for government organizations and manager1 one for the ESPs

./../api/javascript/municipality/userRegistrations.sh

./../api/javascript/municipality2/userRegistrations.sh

./../api/javascript/municipality3/userRegistrations.sh

./../api/javascript/municipality4/userRegistrations.sh

./../api/javascript/canton/userRegistrations.sh

./../api/javascript/canton2/userRegistrations.sh

./../api/javascript/confederation/userRegistrations.sh

./../api/javascript/esp/userRegistrations.sh

./../api/javascript/sp/userRegistrations.sh

echo
echo "========= All GOOD, user registration completed keys are added to the wallets =========== "
echo

echo
echo " _____   _   _   ____   "
echo "| ____| | \ | | |  _ \  "
echo "|  _|   |  \| | | | | | "
echo "| |___  | |\  | | |_| | "
echo "|_____| |_| \_| |____/  "
echo
