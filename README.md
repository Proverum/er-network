# ER Network Demo

This demo shows how a Hyperledger Fabric network could be used to simply and fortify security around the Swiss postal voting process. Create a directory for the projects and pull the repo through:

```bash
git clone git@gitlab.com:LuxsThor/er-network.git
```
or
```bash
git clone https://gitlab.com/LuxsThor/er-network.git
```

# Requirements
This prototype has been developed on a Linux system.  It is likely that it will not run on Windows due to differing docker versions.  It is thus highly suggested to run the prototype on a Unix powered device.  Before running the demo, make sure you have the prerequisites installed as described by the Hyperledger documentation project in the following link:

https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html

## Fabric Network Setup

Change into the er-network subdirectory.

```bash
git clone https://gitlab.com/LuxsThor/er-network.git
```
make sure you have permissions set for docker:

```bash
sudo chmod 666 /var/run/docker.sock
```

Then execute the following command, which spins up the docker containers for the peers,CAs  and  CouchDBs  as  the  private  data  store  for  each  participant.   This  process  also creates the necessary cryptographic material and the channel artifacts (genesis block +anchor peer updates) for each participant../ERN_controller_script.sh up -a -s couchdb. Before continuing, confirm in the console output that all created containers are up and running.  If so we can run the quick setup scenario script (scripts/quick.sh) which will do the following:

•Bootstrap the ordering service
•Create the four channels (federal, erchannel(external), canton1 and canton 2)
•Join the corresponding organizations to the channels
•Install the chaincodes on the involved organizations peers (found in/chaincode/register_managementand/chaincode/result_publishing)
•Instantiate the chaincodes (Activating and agreeing on their version and validity)
•Have the municipalities initialize their private data stores with three mock citizens.

To run the script enter the following command:

```bash
./ERN_controller_script.sh quickinit
```
## Application User Registration

Before we can interact with the Fabric network we have to enroll the users for each application provided by the network participants.  In this case we are going to first enroll the  admin  as  specified  in  the  network  configurations/docker-compose-ca.yaml(admin:adminpw).  Once the admin is successfully registered it will have its corresponding keys issued by the CA in the wallet directory and can register other users as well.  We are registering an extra user named Clerk1/Manager1 for each organization in this scenario.Executing  the  following  script  will  enroll  the  admin  and  a  clerk1/manager1  profile  for each stakeholder which are later used to query and invoke chaincode methods.

```bash
./enrollApplicationUsers.sh
```

## Node Express applications

The  following  script  starts  the  Express  applications  for  all  organizations  exposing  theREST endpoint to interfere with through the front end.

## Front end

To start the front end, change into the front end directory:

```bash
cd ../er-network-frontend
```
then start the front end through:

```bash
ng serve
```
you should now be able to access the home dashboard on:http://localhost:4200/

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
