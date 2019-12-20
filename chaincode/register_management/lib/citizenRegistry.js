'use strict';

// Utility class for collections of ledger states --  a state list
const StateList = require('./../ledger-api/statelist.js');
const Citizen = require('./citizen.js');

class CitizenRegister extends StateList {

    constructor(ctx) {
        super(ctx, 'er-network.citizenRegister');
        this.use(Citizen);
    }

    async addCitizen(citizen) {
        return this.addState(citizen);
    }

    async addPrivateCitizen(citizen, collection) {
        return this.addPrivateState(citizen, collection);
    }

    async getCitizen(citizenKey) {
        return this.getState(citizenKey);
    }

    async getPrivateCitizen(citizenKey, collection) {
        return this.getPrivateData(citizenKey, collection);
    }

    async updateCitizen(citizen) {
        return this.updateState(citizen);
    }

    async updatePrivateCitizen(citizen, collection) {
        return this.updateState(citizen, collection);
    }
}


module.exports = CitizenRegistry;
