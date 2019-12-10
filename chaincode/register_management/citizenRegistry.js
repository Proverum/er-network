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

    }

    async getCitizen(citizenKey) {

    }

    async updateCitizen(citizen) {
        return this.updateState(citizen);
    }
}


module.exports = CitizenRegistry;
