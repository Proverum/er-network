# ER Network Demo

This demo shows how a hyperledger fabric network could be used to simply and fortify security around the swiss postal voting process.

## Installation

To run this demo make sure you have the prerequisites installed as described by the hyperledger project
https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html

Determine a location on your machine where you want to place the er-network repository and enter that directory in a terminal window.
Finally clone the repo to that location.

```bash
git clone git@gitlab.com:LuxsThor/er-network.git
```
or
```bash
git clone https://gitlab.com/LuxsThor/er-network.git
```

## Usage

Starting the mock network. The demo network consists of seven participants each hosting two nodes for fault tolerance reasons.
The participants are (Confederation, Canton, Canton2, Municipality, Municipality2, Municipality3 External Service Provider (ESP))

change into the er-network directory

```bash
cd er-network/
```
then execute the following command which spins up the containers including a CA and a couchdb container for each participant. This process also creates the necessary cryptographic material and the channel artifacts (genesis block + anchor peer updates for each participant)

```bash
./ERN_controller_script.sh up -a -s couchdb
```
check if all created containers are up and running.
If so we can run the scenario script (scripts/setup.er.sh) which will do the following:
1. Create the channel and connect all peers.
2. Install and instantiate the chaincode (found in /chaincode/register_management)
3. Have the municipalities initialize their private data stores with three mock citizens each based on the data model as described in eCH-0011
4. Query each private data from the owning municipality to verify the existence of the data.
5. to bee continued... move a citizen
6. generate electoral register snapshot
7. Publish some mock results bottom up.

```bash
./ERN_controller_script.sh init
```
If the scenario fails and/or you want to execute certain commands individually go into the cli executable container
```bash
docker exec -it cli bash
```
individual commands can be found in the helper methods in scripts/utils.sh
Make sure to set the correct environment variables for the cryptographic material to be used for each participant.
You can make use of the setGloabls helper function by calling it withing the docker exec. Simply pass the name of the participant  
(confederation, canton, canton2, municipality, municipality2, municipality3, esp) as a parameter and leave peer 0 as default.

```bash
source scripts/utils.sh; setGlobals 0 "municipality"
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
