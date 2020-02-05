#!/bin/bash

echo
echo " ____    _____      _      ____    _____ "
echo "/ ___|  |_   _|    / \    |  _ \  |_   _|"
echo "\___ \    | |     / _ \   | |_) |   | |  "
echo " ___) |   | |    / ___ \  |  _ <    | |  "
echo "|____/    |_|   /_/   \_\ |_| \_\   |_|  "
echo
echo "er network short setup test scenario"
echo
CHANNEL_NAME="$1"
DELAY="$2"
LANGUAGE="$3"
TIMEOUT="$4"
VERBOSE="$5"
NO_CHAINCODE="$6"
: ${CHANNEL_NAME:="erchannel"}
: ${DELAY:="3"}
: ${LANGUAGE:="node"}
: ${TIMEOUT:="20"}
: ${VERBOSE:="false"}
: ${NO_CHAINCODE:="false"}
LANGUAGE=`echo "$LANGUAGE" | tr [:upper:] [:lower:]`
COUNTER=1
MAX_RETRY=10

CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/register_management"
PUBLISHCC_SRC_PATH="/opt/gopath/src/github.com/chaincode/result_publishing"
COLLECTIONCONFIG="/opt/gopath/src/github.com/chaincode/register_management/collections_config.json"
COLLECTIONCONFIGPUBLISH="/opt/gopath/src/github.com/chaincode/result_publishing/collections_config.json"
CHANNEL_NAME_FEDERAL="federalchannel"


echo "Channel name : "$CHANNEL_NAME


# import utils
. scripts/utils.sh


## Create channels
echo "Creating Er channel..."
createErChannel
echo "Creating Federal channel..."
createFederalChannel
echo "Creating Canton channel..."
createCantonChannel
echo "Creating Canton2 channel..."
createCanton2Channel

## Join peers to the according channels
echo "Having all peers join the external channel..."
joinErChannel
echo "Having all peers except the esp join the federal channel..."
joinFederalChannel
echo "Having confederation, canton, municipality and municipality2 join the canton channel..."
joinCantonChannel
echo "Having confederation, canton2, municiplality3, municipality4 join the canton2 channel..."
joinCanton2Channel

## Set the anchor peers for each org in the er channel
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

## Set the anchor peers for each org in the federal channel
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

## Set the anchor peers for each org in the canton channel
echo "Updating anchor peers for confederation on cantonchannel..."
updateCantonAnchorPeers 0 "confederation"
echo "Updating anchor peers for canton on cantonchannel..."
updateCantonAnchorPeers 0 "canton"
echo "Updating anchor peers for municipality on cantonchannel..."
updateCantonAnchorPeers 0 "municipality"
echo "Updating anchor peers for municipality2 on cantonchannel..."
updateCantonAnchorPeers 0 "municipality2"

## Set the anchor peers for each org in the canton2 channel
echo "Updating anchor peers for confederation on canton2channel..."
updateCanton2AnchorPeers 0 "confederation"
echo "Updating anchor peers for canton2 on canton2channel..."
updateCanton2AnchorPeers 0 "canton2"
echo "Updating anchor peers for municipality3 on canton2channel..."
updateCanton2AnchorPeers 0 "municipality3"
echo "Updating anchor peers for municipality4 on canton2channel..."
updateCanton2AnchorPeers 0 "municipality4"




if [ "${NO_CHAINCODE}" != "true" ]; then

	## Install register management chaincode on all peers of all organizations
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
	echo "Install chaincode on peer0.municipality4..."
	installErChaincode 0 "municipality4" "registercc"
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
	echo "Install chaincode on peer1.municipality4..."
	installErChaincode 1 "municipality4" "registercc"
	echo "Install chaincode on peer1.esp..."
	installErChaincode 1 "esp" "registercc"

	## Install publish results chaincode on all peers of all organizations except the external providers
	echo "Installing chaincode on peer0.confederation..."
	installPublishChaincode 0 "confederation" "publishcc"
	echo "Install chaincode on peer0.canton..."
	installPublishChaincode 0 "canton" "publishcc"
	echo "Install chaincode on peer0.canton2..."
	installPublishChaincode 0 "canton2" "publishcc"
	echo "Install chaincode on peer0.municipality..."
	installPublishChaincode 0 "municipality" "publishcc"
	echo "Install chaincode on peer0.municipality2..."
	installPublishChaincode 0 "municipality2" "publishcc"
	echo "Install chaincode on peer0.municipality3..."
	installPublishChaincode 0 "municipality3" "publishcc"
	echo "Install chaincode on peer0.municipality4..."
	installPublishChaincode 0 "municipality4" "publishcc"
	echo "Installing chaincode on peer1.confederation..."
	installPublishChaincode 1 "confederation" "publishcc"
	echo "Install chaincode on peer1.canton..."
	installPublishChaincode 1 "canton" "publishcc"
	echo "Install chaincode on peer1.canton2..."
	installPublishChaincode 1 "canton2" "publishcc"
	echo "Install chaincode on peer1.municipality..."
	installPublishChaincode 1 "municipality" "publishcc"
	echo "Install chaincode on peer1.municipality2..."
	installPublishChaincode 1 "municipality2" "publishcc"
	echo "Install chaincode on peer1.municipality3..."
	installPublishChaincode 1 "municipality3" "publishcc"
	echo "Install chaincode on peer1.municipality4..."
	installPublishChaincode 1 "municipality4" "publishcc"


	# Instantiate chaincodes on the according channels
	echo "Instantiating chaincode from peer0.confederation..."
	instantiateErChaincode 0 "confederation" "registercc"
	instantiatePublishChaincode 0 "confederation" "publishcc" "federalchannel"
	instantiatePublishChaincode 0 "confederation" "publishcc" "cantonchannel"
	instantiatePublishChaincode 0 "confederation" "publishcc" "canton2channel"


	# initialize  ledger with some mock citizens for each municipality which is mimicking zürich in this case
  echo "Sending invoke init transaction on peer0.municipality"
	initLedgerMunicipality 0 "municipality"
  initLedgerMunicipality 0 "municipality2"
  initLedgerMunicipality 0 "municipality3"
	initLedgerMunicipality 0 "municipality4"


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
