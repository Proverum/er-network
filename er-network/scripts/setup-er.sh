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
: ${TIMEOUT:="10"}
: ${VERBOSE:="false"}
: ${NO_CHAINCODE:="false"}
LANGUAGE=`echo "$LANGUAGE" | tr [:upper:] [:lower:]`
COUNTER=1
MAX_RETRY=10

declare -a orgs=("confederation" "canton" "canton2" "municipality" "municipality2" "municipality3" "esp")

CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/register_management"
COLLECTIONCONFIG="/opt/gopath/src/github.com/chaincode/register_management/collections_config.json"


echo "Channel name : "$CHANNEL_NAME


# import utils
. scripts/utils.sh


createChannel() {
	setGlobals 0 "confederation"

	if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "false" ]; then
                set -x
		peer channel create -o orderer.example.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx >&log.txt
		res=$?
                set +x
	else
				set -x
		peer channel create -o orderer.example.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA >&log.txt
		res=$?
				set +x
	fi
	cat log.txt
	verifyResult $res "Channel creation failed"
	echo "===================== Channel '$CHANNEL_NAME' created ===================== "
	echo
}

joinChannel () {
	for org in "${orgs[@]}"; do
	    for peer in 0 1; do
		echo $peer "$org"
		joinChannelWithRetry $peer "$org"
		echo "===================== peer${peer}${org} joined channel '$CHANNEL_NAME' ===================== "
		sleep $DELAY
		echo
	    done
	done
}


## Create channel
echo "Creating channel..."
createChannel

## Join all the peers to the channel
echo "Having all peers join the channel..."
joinChannel

## Set the anchor peers for each org in the channel
echo "Updating anchor peers for confederation..."
updateAnchorPeers 0 "confederation"
echo "Updating anchor peers for canton..."
updateAnchorPeers 0 "canton"
echo "Updating anchor peers for canton2..."
updateAnchorPeers 0 "canton2"
echo "Updating anchor peers for municipality..."
updateAnchorPeers 0 "municipality"
echo "Updating anchor peers for municipality2..."
updateAnchorPeers 0 "municipality2"
echo "Updating anchor peers for municipality3..."
updateAnchorPeers 0 "municipality3"
echo "Updating anchor peers for esp..."
updateAnchorPeers 0 "esp"

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

	# Invoke chaincode on peer0.confederation
	echo "Sending invoke transaction on peer0.confederation"
	initLedgerMunicipality 0 "municipality" "registercc"


	# Query chaincode on all peers and all organizations
	# echo "Querying chaincode on peer0.confederation..."
	# chaincodeErQuery 0 "confederation" "registercc"
	# echo "Querying chaincode on peer1.confederation..."
	# chaincodeErQuery 1 "confederation" "registercc"
	# echo "Querying chaincode on peer0.canton..."
	# chaincodeErQuery 0 "canton" "registercc"
	# echo "Querying chaincode on peer1.canton..."
	# chaincodeErQuery 1 "canton" "registercc"
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
