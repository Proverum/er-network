#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $6)
    local CP=$(one_line_pem $7)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${ORGCAP}/$2/" \
        -e "s/\${P0PORT}/$3/" \
        -e "s/\${P1PORT}/$4/" \
        -e "s/\${CAPORT}/$5/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ccp-template.json
}

function yaml_ccp {
    local PP=$(one_line_pem $6)
    local CP=$(one_line_pem $7)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${ORGCAP}/$2/" \
        -e "s/\${P0PORT}/$3/" \
        -e "s/\${P1PORT}/$4/" \
        -e "s/\${CAPORT}/$5/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ccp-template.yaml | sed -e $'s/\\\\n/\\\n        /g'
}

ORG="confederation"
ORGCAP="Confederation"
P0PORT=7051
P1PORT=8051
CAPORT=7054
PEERPEM=crypto-config/peerOrganizations/confederation.example.com/tlsca/tlsca.confederation.example.com-cert.pem
CAPEM=crypto-config/peerOrganizations/confederation.example.com/ca/ca.confederation.example.com-cert.pem

echo "$(json_ccp $ORG $ORGCAP $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-confederation.json
echo "$(yaml_ccp $ORG $ORGCAP $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-confederation.yaml

ORG="canton"
ORGCAP="Canton"
P0PORT=9051
P1PORT=10051
CAPORT=9054
PEERPEM=crypto-config/peerOrganizations/canton.example.com/tlsca/tlsca.canton.example.com-cert.pem
CAPEM=crypto-config/peerOrganizations/canton.example.com/ca/ca.canton.example.com-cert.pem

echo "$(json_ccp $ORG $ORGCAP $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-canton.json
echo "$(yaml_ccp $ORG $ORGCAP $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-canton.yaml

ORG="canton2"
ORGCAP="Canton2"
P0PORT=11051
P1PORT=12051
CAPORT=11054
PEERPEM=crypto-config/peerOrganizations/canton2.example.com/tlsca/tlsca.canton2.example.com-cert.pem
CAPEM=crypto-config/peerOrganizations/canton2.example.com/ca/ca.canton2.example.com-cert.pem

echo "$(json_ccp $ORG $ORGCAP $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-canton2.json
echo "$(yaml_ccp $ORG $ORGCAP $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-canton2.yaml

ORG="municipality"
ORGCAP="Municipality"
P0PORT=13051
P1PORT=14051
CAPORT=13054
PEERPEM=crypto-config/peerOrganizations/municipality.example.com/tlsca/tlsca.municipality.example.com-cert.pem
CAPEM=crypto-config/peerOrganizations/municipality.example.com/ca/ca.municipality.example.com-cert.pem

echo "$(json_ccp $ORG $ORGCAP $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-municipality.json
echo "$(yaml_ccp $ORG $ORGCAP $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-municipality.yaml

ORG="municipality2"
ORGCAP="Municipality2"
P0PORT=15051
P1PORT=16051
CAPORT=15054
PEERPEM=crypto-config/peerOrganizations/municipality2.example.com/tlsca/tlsca.municipality2.example.com-cert.pem
CAPEM=crypto-config/peerOrganizations/municipality2.example.com/ca/ca.municipality2.example.com-cert.pem

echo "$(json_ccp $ORG $ORGCAP $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-municipality2.json
echo "$(yaml_ccp $ORG $ORGCAP $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-municipality2.yaml

ORG="municipality3"
ORGCAP="Municipality3"
P0PORT=17051
P1PORT=18051
CAPORT=17054
PEERPEM=crypto-config/peerOrganizations/municipality3.example.com/tlsca/tlsca.municipality3.example.com-cert.pem
CAPEM=crypto-config/peerOrganizations/municipality3.example.com/ca/ca.municipality3.example.com-cert.pem

echo "$(json_ccp $ORG $ORGCAP $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-municipality3.json
echo "$(yaml_ccp $ORG $ORGCAP $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-municipality3.yaml

ORG="esp"
ORGCAP="ESP"
P0PORT=19051
P1PORT=20051
CAPORT=19054
PEERPEM=crypto-config/peerOrganizations/esp.example.com/tlsca/tlsca.esp.example.com-cert.pem
CAPEM=crypto-config/peerOrganizations/esp.example.com/ca/ca.esp.example.com-cert.pem

echo "$(json_ccp $ORG $ORGCAP $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-esp.json
echo "$(yaml_ccp $ORG $ORGCAP $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-esp.yaml
