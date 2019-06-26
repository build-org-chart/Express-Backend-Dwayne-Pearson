const supertest = require('supertest');

const {find, add} = require('../companies/companies-model.js');

describe('Companies Model', () => {
    describe('GET/', () => {
        it('should get all the companies', async () => {
            const companies = await find();

            expect(companies.length).toBe(3);
            expect(companies[0].name).toBe('Company1');
            expect(companies[2]).toBeTruthy();
            expect(companies[2].id).toBe(3)
        });
    });

    describe('POST/', () => {
        it('should insert a new company', async () => {
            // await add({ name: 'Walgreens' });
             //<-- adds a new company

            const companies = await find();
        });
    });
});