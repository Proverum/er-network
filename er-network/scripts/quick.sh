#!/bin/bash

echo
echo " ____    _____      _      ____    _____ "
echo "/ ___|  |_   _|    / \    |  _ \  |_   _|"
echo "\___ \    | |     / _ \   | |_) |   | |  "
echo " ___) |   | |    / ___ \  |  _ <    | |  "
echo "|____/    |_|   /_/   \_\ |_| \_\   |_|  "
echo
echo "er network end-to-end test"
echo
CHANNEL_NAME="$1"
DELAY="$2"
LANGUAGE="$3"
TIMEOUT="$4"
VERBOSE="$5"
NO_CHAINCODE="$6"
: ${CHANNEL_NAME:="federalchannel"}
: ${DELAY:="3"}
: ${LANGUAGE:="node"}
: ${TIMEOUT:="20"}
: ${VERBOSE:="false"}
: ${NO_CHAINCODE:="false"}
LANGUAGE=`echo "$LANGUAGE" | tr [:upper:] [:lower:]`
COUNTER=1
MAX_RETRY=10

CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/register_management"
COLLECTIONCONFIG="/opt/gopath/src/github.com/chaincode/register_management/collections_config.json"


echo "Channel name : "$CHANNEL_NAME


# import utils
. scripts/utils.sh


## Create channel
echo "Creating Er channel..."
createErChannel
echo "Creating Federal channel..."
createFederalChannel

## Join all the peers to the channel
echo "Having all peers join the external channel channel..."
joinErChannel
joinFederalChannel

## Set the anchor peers for each org in the channel
echo "Updating anchor peers for confederation on erchannel..."
updateAnchorPeers 0 "confederation"
echo "Updating anchor peers for canton on erchannel..."
updateAnchorPeers 0 "canton"
echo "Updating anchor peers for canton2 on erchannel..."
updateAnchorPeers 0 "canton2"
echo "Updating anchor peers for municipality on erchannel..."
updateAnchorPeers 0 "municipality"
echo "Updating anchor peers for municipality2 on erchannel..."
updateAnchorPeers 0 "municipality2"
echo "Updating anchor peers for municipality3 on erchannel..."
updateAnchorPeers 0 "municipality3"
echo "Updating anchor peers for esp on erchannel..."
updateAnchorPeers 0 "esp"

## Set the anchor peers for each org in the channel
echo "Updating anchor peers for confederation on federalchannel..."
updateFederalAnchorPeers 0 "confederation"
echo "Updating anchor peers for canton on federalchannel..."
updateFederalAnchorPeers 0 "canton"
echo "Updating anchor peers for canton2 on federalchannel..."
updateFederalAnchorPeers 0 "canton2"
echo "Updating anchor peers for municipality on federalchannel..."
updateFederalAnchorPeers 0 "municipality"
echo "Updating anchor peers for municipality2 on federalchannel..."
updateFederalAnchorPeers 0 "municipality2"
echo "Updating anchor peers for municipality3 on federalchannel..."
updateFederalAnchorPeers 0 "municipality3"


if [ "${NO_CHAINCODE}" != "true" ]; then

	## Install chaincode on all peers of all organizations
	echo "Installing chaincode on peer0.confederation..."
	installErChaincode 0 "confederation" "registercc"
	echo "Install chaincode on peer0.canton..."
	installErChaincode 0 "canton" "registercc"
	echo "Install chaincode on peer0.canton2..."
	installErChaincode 0 "canton2" "registercc"
	echo "Install chaincode on peer0.municipality..."
	installErChaincode 0 "municipality" "registercc"
	echo "Install chaincode on peer0.municipality2..."
	installErChaincode 0 "municipality2" "registercc"
	echo "Install chaincode on peer0.municipality3..."
	installErChaincode 0 "municipality3" "registercc"
	echo "Install chaincode on peer0.esp..."
	installErChaincode 0 "esp" "registercc"
	echo "Installing chaincode on peer1.confederation..."
	installErChaincode 1 "confederation" "registercc"
	echo "Install chaincode on peer1.canton..."
	installErChaincode 1 "canton" "registercc"
	echo "Install chaincode on peer1.canton2..."
	installErChaincode 1 "canton2" "registercc"
	echo "Install chaincode on peer1.municipality..."
	installErChaincode 1 "municipality" "registercc"
	echo "Install chaincode on peer1.municipality2..."
	installErChaincode 1 "municipality2" "registercc"
	echo "Install chaincode on peer1.municipality3..."
	installErChaincode 1 "municipality3" "registercc"
	echo "Install chaincode on peer1.esp..."
	installErChaincode 1 "esp" "registercc"

	# Instantiate chaincode on peer0.org2
	echo "Instantiating chaincode from peer0.confederation..."
	instantiateErChaincode 0 "confederation" "registercc"

	# initialize  ledger with some mock citizens for each municipality which is mimicking zürich in this case
  echo "Sending invoke init transaction on peer0.municipality"
	initLedgerMunicipality 0 "municipality"
  initLedgerMunicipality 0 "municipality2"
  initLedgerMunicipality 0 "municipality3"

fi

echo
echo "========= All GOOD, setup execution completed =========== "
echo

echo
echo " _____   _   _   ____   "
echo "| ____| | \ | | |  _ \  "
echo "|  _|   |  \| | | | | | "
echo "| |___  | |\  | | |_| | "
echo "|_____| |_| \_| |____/  "
echo

exit
