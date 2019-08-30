const request = require('supertest');
const server = require('./server.js');

describe('GET /', () => {
    it('has process.env.DB_ENV as "testing"', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    it('returns 200 OK', () =>{
        return request(server).get('/')
            .expect(200)
    });

    it('returns Content-Type of json', () =>{
        return request(server).get('/')
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body.message).toBe('You have reached the api')
            })
    });

    it('returns res.body.message "You have reached the api"', () =>{
        return request(server).get('/')
            .then(res => {
                expect(res.body.message).toBe('You have reached the api')
            })
    });
  });