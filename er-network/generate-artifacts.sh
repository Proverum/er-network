#!/bin/bash
#
echo "---- Generate Crypto Material----"
../bin/cryptogen generate --config=./crypto-config.yaml     # create cryptgraphic material for network participants

 export FABRIC_CFG_PATH=$PWD					# set path for the configtx.yaml file

echo "---- Generate Connection Artifacts----"
./ccp-generate.sh                     # create connection artificats

echo "---- Generate Genesis Block----"
../bin/configtxgen -profile ErOrdererGenesis -channelID byfn-sys-channel -outputBlock ./channel-artifacts/genesis.block  		#create genesis block

#create channel configuration transactions for each participant
echo "---- Generate Channel Configuration Transactions----"
export CHANNEL_NAME=erchannel  && ../bin/configtxgen -profile ErChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID $CHANNEL_NAME
../bin/configtxgen -profile ErChannel -outputAnchorPeersUpdate ./channel-artifacts/ConfederationMSPanchors.tx -channelID $CHANNEL_NAME -asOrg ConfederationMSP
../bin/configtxgen -profile ErChannel -outputAnchorPeersUpdate ./channel-artifacts/CantonMSPanchors.tx -channelID $CHANNEL_NAME -asOrg CantonMSP
../bin/configtxgen -profile ErChannel -outputAnchorPeersUpdate ./channel-artifacts/Canton2MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Canton2MSP
../bin/configtxgen -profile ErChannel -outputAnchorPeersUpdate ./channel-artifacts/MunicipalityMSPanchors.tx -channelID $CHANNEL_NAME -asOrg MunicipalityMSP
../bin/configtxgen -profile ErChannel -outputAnchorPeersUpdate ./channel-artifacts/Municipality2MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Municipality2MSP
../bin/configtxgen -profile ErChannel -outputAnchorPeersUpdate ./channel-artifacts/Municipality3MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Municipality3MSP
../bin/configtxgen -profile ErChannel -outputAnchorPeersUpdate ./channel-artifacts/ESPMSPanchors.tx -channelID $CHANNEL_NAME -asOrg ESPMSP

# some fix to not get occupied ports
export IMAGE_TAG=latest
