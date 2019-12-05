#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

# This is a collection of bash functions used by different scripts

ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
PEER0_CONFEDERATION_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/confederation.example.com/peers/peer0.confederation.example.com/tls/ca.crt
PEER0_CANTON_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/canton.example.com/peers/peer0.canton.example.com/tls/ca.crt
PEER0_CANTON2_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/canton2.example.com/peers/peer0.canton2.example.com/tls/ca.crt
PEER0_MUNICIPALITY_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/municipality.example.com/peers/peer0.municipality.example.com/tls/ca.crt
PEER0_MUNICIPALITY2_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/municipality2.example.com/peers/peer0.municipality2.example.com/tls/ca.crt
PEER0_MUNICIPALITY3_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/municipality3.example.com/peers/peer0.municipality3.example.com/tls/ca.crt
PEER0_ESP_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/esp.example.com/peers/peer0.esp.example.com/tls/ca.crt




# verify the result of the end-to-end test
verifyResult() {
  if [ $1 -ne 0 ]; then
    echo "!!!!!!!!!!!!!!! "$2" !!!!!!!!!!!!!!!!"
    echo "========= ERROR !!! FAILED to execute End-2-End Scenario ==========="
    echo
    exit 1
  fi
}

# Set OrdererOrg.Admin globals
setOrdererGlobals() {
  CORE_PEER_LOCALMSPID="OrdererMSP"
  CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
  CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/users/Admin@example.com/msp
}

setGlobals() {
  PEER=$1
  ORG="$2"
  if [ "$ORG" = "confederation" ]; then
    CORE_PEER_LOCALMSPID="ConfederationMSP"
    CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_CONFEDERATION_CA
    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/confederation.example.com/users/Admin@confederation.example.com/msp
    if [ $PEER -eq 0 ]; then
      CORE_PEER_ADDRESS=peer0.confederation.example.com:7051
    else
      CORE_PEER_ADDRESS=peer1.confederation.example.com:8051
    fi
  elif [ "$ORG" = "canton" ]; then
    CORE_PEER_LOCALMSPID="CantonMSP"
    CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_CANTON_CA
    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/canton.example.com/users/Admin@canton.example.com/msp
    if [ $PEER -eq 0 ]; then
      CORE_PEER_ADDRESS=peer0.canton.example.com:9051
    else
      CORE_PEER_ADDRESS=peer1.canton.example.com:10051
    fi
  elif [ "$ORG" = "canton2" ]; then
    CORE_PEER_LOCALMSPID="Canton2MSP"
    CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_CANTON2_CA
    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/canton2.example.com/users/Admin@canton2.example.com/msp
    if [ $PEER -eq 0 ]; then
      CORE_PEER_ADDRESS=peer0.canton2.example.com:11051
    else
      CORE_PEER_ADDRESS=peer1.canton2.example.com:12051
    fi
  elif [ "$ORG" = "municipality" ]; then
    CORE_PEER_LOCALMSPID="MunicipalityMSP"
    CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_MUNICIPALITY_CA
    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/municipality.example.com/users/Admin@municipality.example.com/msp
    if [ $PEER -eq 0 ]; then
      CORE_PEER_ADDRESS=peer0.municipality.example.com:13051
    else
      CORE_PEER_ADDRESS=peer1.municipality.example.com:14051
    fi
  elif [ "$ORG" = "municipality2" ]; then
    CORE_PEER_LOCALMSPID="Municipality2MSP"
    CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_MUNICIPALITY2_CA
    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/municipality2.example.com/users/Admin@municipality2.example.com/msp
    if [ $PEER -eq 0 ]; then
      CORE_PEER_ADDRESS=peer0.municipality2.example.com:15051
    else
      CORE_PEER_ADDRESS=peer1.municipality2.example.com:16051
    fi
  elif [ "$ORG" = "municipality3" ]; then
    CORE_PEER_LOCALMSPID="Municipality3MSP"
    CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_MUNICIPALITY3_CA
    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/municipality3.example.com/users/Admin@municipality3.example.com/msp
    if [ $PEER -eq 0 ]; then
      CORE_PEER_ADDRESS=peer0.municipality3.example.com:17051
    else
      CORE_PEER_ADDRESS=peer1.municipality3.example.com:18051
    fi
  elif [ "$ORG" = "esp" ]; then
    CORE_PEER_LOCALMSPID="ESPMSP"
    CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ESP_CA
    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/esp.example.com/users/Admin@esp.example.com/msp
    if [ $PEER -eq 0 ]; then
      CORE_PEER_ADDRESS=peer0.esp.example.com:19051
    else
      CORE_PEER_ADDRESS=peer1.esp.example.com:20051
    fi
  else
    echo "================== ERROR !!! ORG Unknown =================="
  fi

  if [ "$VERBOSE" == "true" ]; then
    env | grep CORE
  fi
}

updateAnchorPeers() {
  PEER=$1
  ORG="$2"
  setGlobals $PEER "$ORG"

  if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "false" ]; then
    set -x
    peer channel update -o orderer.example.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/${CORE_PEER_LOCALMSPID}anchors.tx >&log.txt
    res=$?
    set +x
  else
    set -x
    peer channel update -o orderer.example.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/${CORE_PEER_LOCALMSPID}anchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA >&log.txt
    res=$?
    set +x
  fi
  cat log.txt
  verifyResult $res "Anchor peer update failed"
  echo "===================== Anchor peers updated for org '$CORE_PEER_LOCALMSPID' on channel '$CHANNEL_NAME' ===================== "
  sleep $DELAY
  echo
}

## Sometimes Join takes time hence RETRY at least 5 times
joinChannelWithRetry() {
  PEER=$1
  ORG="$2"
  setGlobals $PEER "$ORG"

  set -x
  echo "peer channel join -b '$CHANNEL_NAME' .block >&log.txt"
  peer channel join -b $CHANNEL_NAME.block >&log.txt
  res=$?
  set +x
  cat log.txt
  if [ $res -ne 0 -a $COUNTER -lt $MAX_RETRY ]; then
    COUNTER=$(expr $COUNTER + 1)
    echo "peer${PEER}.${ORG} failed to join the channel, Retry after $DELAY seconds"
    sleep $DELAY
    joinChannelWithRetry $PEER $ORG
  else
    COUNTER=1
  fi
  verifyResult $res "After $MAX_RETRY attempts, peer${PEER}.org${ORG} has failed to join channel '$CHANNEL_NAME' "
}

installChaincode() {
  PEER=$1
  ORG="$2"
  setGlobals $PEER "$ORG"
  VERSION=${3:-1.0}
  set -x
  peer chaincode install -n testcc -v ${VERSION} -p ${CC_SRC_PATH} -l "${LANGUAGE}" >&log.txt
  res=$?
  set +x
  cat log.txt
  verifyResult $res "Chaincode installation on peer${PEER}.${ORG} has failed"
  echo "===================== Chaincode is installed on peer${PEER}.${ORG} ===================== "
  echo
}

instantiateChaincode() {
  PEER=$1
  ORG="$2"
  setGlobals $PEER "$ORG"
  VERSION=${3:-1.0}

  # while 'peer chaincode' command can get the orderer endpoint from the peer
  # (if join was successful), let's supply it directly as we know it using
  # the "-o" option
  if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "false" ]; then
    set -x
    peer chaincode instantiate -o orderer.example.com:7050 -C $CHANNEL_NAME -n testcc -l ${LANGUAGE} -v ${VERSION} -c '{"Args":[]}' >&log.txt
    res=$?
    set +x
  else
    set -x
    peer chaincode instantiate -o orderer.example.com:7050 -C $CHANNEL_NAME -n testcc -l "${LANGUAGE}" -v 1.0 -c '{"Args":[]}' --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA  >&log.txt
    res=$?
    set +x
  fi
  cat log.txt
  verifyResult $res "Chaincode instantiation on peer${PEER}.${ORG} on channel '$CHANNEL_NAME' failed"
  echo "===================== Chaincode is instantiated on peer${PEER}.${ORG} on channel '$CHANNEL_NAME' ===================== "
  echo
}

upgradeChaincode() {
  PEER=$1
  ORG="$2"
  s $PEER "$ORG"

  set -x
  peer chaincode upgrade -o orderer.example.com:7050 --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n testcc -v 2.0 -c '{"Args":["init","a","90","b","210"]}' -P "AND ('Org1MSP.peer','Org2MSP.peer','Org3MSP.peer')"
  res=$?
  set +x
  cat log.txt
  verifyResult $res "Chaincode upgrade on peer${PEER}.org${ORG} has failed"
  echo "===================== Chaincode is upgraded on peer${PEER}.org${ORG} on channel '$CHANNEL_NAME' ===================== "
  echo
}

chaincodeQuery() {
  PEER=$1
  ORG="$2"
  setGlobals $PEER "$ORG"
  echo "===================== Querying on peer${PEER}${ORG} on channel '$CHANNEL_NAME'... ===================== "
  local rc=1
  local starttime=$(date +%s)

  # continue to poll
  # we either get a successful response, or reach TIMEOUT
  while
    test "$(($(date +%s) - starttime))" -lt "$TIMEOUT" -a $rc -ne 0
  do
    sleep $DELAY
    echo "Attempting to Query peer${PEER}.${ORG} ...$(($(date +%s) - starttime)) secs"
    set -x
    peer chaincode query -o orderer.example.com:7050 -C $CHANNEL_NAME -n testcc -c '{"function":"queryMarks","Args":["Alice"]}' --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA >&log.txt
    res=$?
    set +x
  done
  echo
  cat log.txt
  verifyResult $res "Chaincode query on peer${PEER}.org${ORG} has failed"
  echo "===================== Chaincode was successfully queried form peer${PEER}.${ORG} on channel '$CHANNEL_NAME' ===================== "
  echo

}

# fetchChannelConfig <channel_id> <output_json>
# Writes the current channel config for a given channel to a JSON file
fetchChannelConfig() {
  CHANNEL=$1
  OUTPUT=$2

  setOrdererGlobals

  echo "Fetching the most recent configuration block for the channel"
  if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "false" ]; then
    set -x
    peer channel fetch config config_block.pb -o orderer.example.com:7050 -c $CHANNEL --cafile $ORDERER_CA
    set +x
  else
    set -x
    peer channel fetch config config_block.pb -o orderer.example.com:7050 -c $CHANNEL --tls --cafile $ORDERER_CA
    set +x
  fi

  echo "Decoding config block to JSON and isolating config to ${OUTPUT}"
  set -x
  configtxlator proto_decode --input config_block.pb --type common.Block | jq .data.data[0].payload.data.config >"${OUTPUT}"
  set +x
}

# signConfigtxAsPeerOrg <org> <configtx.pb>
# Set the peerOrg admin of an org and signing the config update
signConfigtxAsPeerOrg() {
  PEERORG=$1
  TX=$2
  setGlobals 0 $PEERORG
  set -x
  peer channel signconfigtx -f "${TX}"
  set +x
}

# createConfigUpdate <channel_id> <original_config.json> <modified_config.json> <output.pb>
# Takes an original and modified config, and produces the config update tx
# which transitions between the two
createConfigUpdate() {
  CHANNEL=$1
  ORIGINAL=$2
  MODIFIED=$3
  OUTPUT=$4

  set -x
  configtxlator proto_encode --input "${ORIGINAL}" --type common.Config >original_config.pb
  configtxlator proto_encode --input "${MODIFIED}" --type common.Config >modified_config.pb
  configtxlator compute_update --channel_id "${CHANNEL}" --original original_config.pb --updated modified_config.pb >config_update.pb
  configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate >config_update.json
  echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . >config_update_in_envelope.json
  configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope >"${OUTPUT}"
  set +x
}

# parsePeerConnectionParameters $@
# Helper function that takes the parameters from a chaincode operation
# (e.g. invoke, query, instantiate) and checks for an even number of
# peers and associated org, then sets $PEER_CONN_PARMS and $PEERS
parsePeerConnectionParameters() {
  # check for uneven number of peer and org parameters
  if [ $(($# % 2)) -ne 0 ]; then
    exit 1
  fi

  PEER_CONN_PARMS=""
  PEERS=""
  while [ "$#" -gt 0 ]; do
    setGlobals $1 "$2"
    PEER="peer$1.$2"
    PEERS="$PEERS $PEER"
    PEER_CONN_PARMS="$PEER_CONN_PARMS --peerAddresses $CORE_PEER_ADDRESS"
    if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "true" ]; then
      TLSINFO=$(eval echo "--tlsRootCertFiles \$PEER$1_$2_CA")
      PEER_CONN_PARMS="$PEER_CONN_PARMS $TLSINFO"
    fi
    # shift by two to get the next pair of peer/org parameters
    shift
    shift
  done
  # remove leading space for output
  PEERS="$(echo -e "$PEERS" | sed -e 's/^[[:space:]]*//')"
}

invokeChaincode () {
  PEER=$1
  ORG="$2"
  setGlobals $PEER "$ORG"
	invokeWithRetry $peer $org
	echo "===================== peer${peer}.${org} invoked testcc on channel '$CHANNEL_NAME' ===================== "
	sleep $DELAY
	echo
}

invokeWithRetry() {
  PEER=$1
  ORG="$2"
  set -x
  peer chaincode invoke -o orderer.example.com:7050 -C $CHANNEL_NAME -n testcc -c '{"function":"addMarks","Args":["Alice","68","84","89"]}' --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA  >&log.txt
  res=$?
  set +x
  cat log.txt
  if [ $res -ne 0 -a $COUNTER -lt $MAX_RETRY ]; then
    COUNTER=$(expr $COUNTER + 1)
    echo "peer${PEER}.${ORG} failed to join the channel, Retry after $DELAY seconds"
    sleep $DELAY
    invokeWithRetry $PEER $ORG
  else
    COUNTER=1
  fi
  verifyResult $res "After $MAX_RETRY attempts, peer${PEER}.${ORG} has failed to invoked the chaincode on channel '$CHANNEL_NAME' "
  echo "===================== Invoke transaction successful on $PEERS on channel '$CHANNEL_NAME' ===================== "
  echo
}


# chaincodeInvoke <peer> <org> ...
# Accepts as many peer/org pairs as desired and requests endorsement from each
chaincodeInvoke() {
  parsePeerConnectionParameters $@
  res=$?
  verifyResult $res "Invoke transaction failed on channel '$CHANNEL_NAME' due to uneven number of peer and org parameters "

  if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "false" ]; then
    set -x
    peer chaincode invoke -o orderer.example.com:7050 -C $CHANNEL_NAME -n testcc $PEER_CONN_PARMS -c '{"function":"addMarks","Args":["Alice","68","84","89"]}' >&log.txt
    res=$?
    set +x
  else
    set -x
    peer chaincode invoke -o orderer.example.com:7050 -C $CHANNEL_NAME -n testcc -c '{"function":"addMarks","Args":["Alice","68","84","89"]}' --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA  >&log.txt
    res=$?
    set +x
  fi
  cat log.txt
  verifyResult $res "Invoke execution on $PEERS failed "
  echo "===================== Invoke transaction successful on $PEERS on channel '$CHANNEL_NAME' ===================== "
  echo
}
