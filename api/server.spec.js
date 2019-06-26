const supertest = require('supertest');

const server = require('./server.js');

describe('server', () => {
    describe('GET /', () => {
        it('responds with 200 OK', () => {
            return supertest(server)
            .get('/')
            .expect(200);
        });

        it('responds with 200 OK', async () => {
            await supertest(server)
            .get('/')
            .expect('Content-Type', /json/i);
        });
        
        it('responds "Hello World!" ', async () => {
            await supertest(server)
            .get('/')
            .then(res => {
                expect(res.body).toEqual({ api: 'Hello World!'});
            });
        });

        it('responds with correct status', done => {
            supertest(server)
            .get('/')
            .expect(200, done);
        });
    });
});