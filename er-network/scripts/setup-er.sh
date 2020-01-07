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

	# initialize  ledger with some mock citizens for each municipality which is mimicking zürich in this case
  echo "Sending invoke init transaction on peer0.municipality"
	initLedgerMunicipality 0 "municipality"
	#adding individual citizens to private data collections
	echo "Adding individual citizen on peer0.municipality..."
	addIndividualCitizen 0 "municipality" "collectionCitizenMunicipality" "CITIZEN100"
  echo "Querying citizens on peer0.municipality..."
	queryCitizenFromPeer 0 "municipality" "collectionCitizenMunicipality" "CITIZEN0"
	echo "Querying citizens on peer0.municipality..."
	queryCitizenFromPeer 0 "municipality" "collectionCitizenMunicipality" "CITIZEN1"
	echo "Querying citizens on peer0.municipality..."
	queryCitizenFromPeer 0 "municipality" "collectionCitizenMunicipality" "CITIZEN2"
	echo "Querying test add citizens on peer0.municipality..."
	queryCitizenFromPeer 0 "municipality" "collectionCitizenMunicipality" "CITIZEN100"
  echo "Querying all public citizens on peer0.municipality..."
	queryAllCitizens 0 "municipality" "collectionCitizenMunicipality"
	# querying the public citizens just containing the vn and reporting municipality
	echo "Querying public citizens on peer0.canton..."
	queryCitizenFromPeer 0 "canton" "collectionPublicCitizenMunicipality" "PUBLIC_CITIZEN_MUNICIPALITY_0"
  echo "Querying public citizens on peer0.confederations..."
	queryCitizenFromPeer 0 "confederation" "collectionPublicCitizenMunicipality" "PUBLIC_CITIZEN_MUNICIPALITY_0"


	echo "Sending invoke init transaction on peer0.municipality2"
	initLedgerMunicipality 0 "municipality2"
	addIndividualCitizen 0 "municipality2" "collectionCitizenMunicipalityTwo" "CITIZEN100"
	echo "Adding individual citizen on peer0.municipality3..."
	echo "Querying citizens on peer0.municipality2..."
	queryCitizenFromPeer 0 "municipality2" "collectionCitizenMunicipalityTwo" "CITIZEN1"
	echo "Querying citizens on peer0.municipality2..."
	queryCitizenFromPeer 0 "municipality2" "collectionCitizenMunicipalityTwo" "CITIZEN1"
	echo "Querying citizens on peer0.municipality2..."
	queryCitizenFromPeer 0 "municipality2" "collectionCitizenMunicipalityTwo" "CITIZEN1"
	echo "Querying public citizens on peer0.municipality2..."
	queryCitizenFromPeer 0 "municipality2" "collectionCitizenMunicipalityTwo" "CITIZEN100"
	echo "Querying all public citizens on peer0.municipality2..."
	queryAllCitizens 0 "municipality2" "collectionCitizenMunicipalityTwo"
	# querying the public citizens just containing the vn and reporting municipality

	echo "Sending invoke transaction on peer0.municipality3"
  initLedgerMunicipality 0 "municipality3"
	echo "Adding individual citizen on peer0.municipality2..."
	addIndividualCitizen 0 "municipality3" "collectionCitizenMunicipalityThree" "CITIZEN100"
	echo "Querying public citizens on peer0.municipality3..."
	queryCitizenFromPeer 0 "municipality3" "collectionCitizenMunicipalityThree" "CITIZEN1"
	echo "Querying citizens on peer0.municipality3..."
	queryCitizenFromPeer 0 "municipality3" "collectionCitizenMunicipalityThree" "CITIZEN1"
	echo "Querying citizens on peer0.municipality3..."
	queryCitizenFromPeer 0 "municipality3" "collectionCitizenMunicipalityThree" "CITIZEN1"
	echo "Querying citizens on peer0.municipality3..."
	queryCitizenFromPeer 0 "municipality3" "collectionCitizenMunicipalityThree" "CITIZEN100"
	echo "Querying all public citizens on peer0.municipality3..."
	queryAllCitizens 0 "municipality3" "collectionCitizenMunicipalityThree"
  echo "Querying for public citizen3 0 public citizens on peer0.canton..."
	queryCitizenFromPeer 0 "canton" "collectionPublicCitizenMunicipalityThree" "PUBLIC_CITIZEN_MUNICIPALITY3_0"
  echo "Querying for public citizen3 0 on peer0.confederations..."
	queryCitizenFromPeer 0 "confederation" "collectionPublicCitizenMunicipalityThree" "PUBLIC_CITIZEN_MUNICIPALITY3_0"
  echo "Querying citizens on peer0.municipality3..."

	#deleting some citizen
	echo "delete individual citizen on peer0.municipality..."
	deleteCitizen 0 "municipality" "collectionCitizenMunicipality" "CITIZEN100"
	echo "Querying all public citizens on peer0.municipality... should now not contain CITIZEN100"
	queryAllCitizens 0 "municipality" "collectionCitizenMunicipality"
	echo "delete individual citizen on peer0.municipality2..."
	deleteCitizen 0 "municipality2" "collectionCitizenMunicipalityTwo" "CITIZEN100"
	echo "Querying all public citizens on peer0.municipality2... should now not contain CITIZEN100"
	queryAllCitizens 0 "municipality2" "collectionCitizenMunicipalityTwo"
	echo "delete individual citizen on peer0.municipality3..."
	deleteCitizen 0 "municipality3" "collectionCitizenMunicipalityThree" "CITIZEN100"
	echo "Querying all public citizens on peer0.municipality3... should now not contain CITIZEN100"
	queryAllCitizens 0 "municipality3" "collectionCitizenMunicipalityThree"

	# moving some citizen between municipalities


	# manuel globals changing: source scripts/utils.sh; setGlobals 0 "municipality3"  //for municipality3 peer0 for example

	# peer chaincode query -o orderer.example.com:7050 -C federalchannel -n registercc -c '{"function":"queryCitizen","Args":["collectionCitizenMunicipality","CITIZEN0"]}' --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --peerAddresses peer0.municipality.example.com:13051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/municipality.example.com/peers/peer0.municipality.example.com/tls/ca.crt

	# peer chaincode query -o orderer.example.com:7050 -C federalchannel -n registercc -c '{"function":"queryCitizen","Args":["collectionCitizenMunicipality2","CITIZEN0"]}' --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --peerAddresses peer0.municipality2.example.com:15051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/municipality2.example.com/peers/peer0.municipality2.example.com/tls/ca.crt
	#
	# peer chaincode query -o orderer.example.com:7050 -C federalchannel -n registercc -c '{"function":"queryAllCitizens","Args":["collectionCitizenMunicipality2"]}' --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --peerAddresses peer0.municipality2.example.com:15051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/municipality2.example.com/peers/peer0.municipality2.example.com/tls/ca.crt
	#
	# peer chaincode query -o orderer.example.com:7050 -C federalchannel -n registercc -c '{"function":"queryAllCitizens","Args":["collectionCitizenMunicipality"]}' --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --peerAddresses peer0.municipality.example.com:13051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/municipality.example.com/peers/peer0.municipality.example.com/tls/ca.crt
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
