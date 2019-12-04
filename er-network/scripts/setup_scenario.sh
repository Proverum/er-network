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

CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/testcc"
if [ "$LANGUAGE" = "node" ]; then
	CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/testcc"
fi


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
	installChaincode 0 "confederation"
	echo "Install chaincode on peer0.canton..."
	installChaincode 0 "canton"
	echo "Install chaincode on peer0.canton2..."
	installChaincode 0 "canton2"
	echo "Install chaincode on peer0.municipality..."
	installChaincode 0 "municipality"
	echo "Install chaincode on peer0.municipality2..."
	installChaincode 0 "municipality2"
	echo "Install chaincode on peer0.municipality3..."
	installChaincode 0 "municipality3"
	echo "Install chaincode on peer0.esp..."
	installChaincode 0 "esp"
	echo "Installing chaincode on peer1.confederation..."
	installChaincode 1 "confederation"
	echo "Install chaincode on peer1.canton..."
	installChaincode 1 "canton"
	echo "Install chaincode on peer1.canton2..."
	installChaincode 1 "canton2"
	echo "Install chaincode on peer1.municipality..."
	installChaincode 1 "municipality"
	echo "Install chaincode on peer1.municipality2..."
	installChaincode 1 "municipality2"
	echo "Install chaincode on peer1.municipality3..."
	installChaincode 1 "municipality3"
	echo "Install chaincode on peer1.esp..."
	installChaincode 1 "esp"

	# Instantiate chaincode on peer0.org2
	echo "Instantiating chaincode on peer0.confederation..."
	instantiateChaincode 0 "confederation"

	# Invoke chaincode on peer0.confederation
	echo "Sending invoke transaction on peer0.confederation"
	invokeChaincode 0 "confederation"


	# Query chaincode on all peers and all organizations
	echo "Querying chaincode on peer0.confederation..."
	chaincodeQuery 0 "confederation"
	echo "Querying chaincode on peer1.confederation..."
	chaincodeQuery 1 "confederation"
	echo "Querying chaincode on peer0.canton..."
	chaincodeQuery 0 "canton"
	echo "Querying chaincode on peer1.canton..."
	chaincodeQuery 1 "canton"

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

exit 0
