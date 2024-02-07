const request = require('supertest')
const app = require('../app.js')
const connection = require('../db/connection.js');
const {seed} = require('../db/seed.js');

// const { describe } = require('yargs');
// const { it } = require('node:test');

afterAll(() => connection.end());

beforeEach(() => {
    return seed()
})


describe('app', () => {
    describe('/api/healthCheck',() => {
        it('responds with status of 200', () => {
            return request(app)
            .get('/api/healthCheck')
            .expect(200)
        });
        it('responds with msg on the body', () => {
            return request(app)
            .get('/api/healthCheck')
            .then((response) => {
                const {body} = response;
                expect(body).toHaveProperty('msg', 'server is running')
            })
        })
    });
    describe('GET /api/parks', () => {
        it('respond with status of 200', () => {
            return request(app)
            .get('/api/parks')
            .expect(200)
        });
        it('returns an array of length 4 containing park_id, park_name, year_opened', () => {
            return request(app)
            .get('/api/parks')
            .expect(200)
            .then((response) => {
                const {body} = response;
                expect(body).toHaveLength(4);
                body.forEach(element => {
                    expect(element).toHaveProperty('park_id', expect.any(Number));
                    expect(element).toHaveProperty('park_name', expect.any(String));
                    expect(element).toHaveProperty('year_opened', expect.any(Number));
                });
            });
        });
    });
    describe('GET/api/ride/:ride_id', () => {
        it('should respond with 200 okay status ',()=>{
            return request(app).get('/api/ride/2').expect(200);
        })
        it('should return the correct nested object based on the parametric endpoint', () => {
            return request(app).get('/api/ride/2').expect(200).then((response) => {
                const { rides } = response.body
                expect(rides).toHaveProperty('ride_id', 2)
                expect(rides).toHaveProperty('ride_name', 'Stealth')
                expect(rides).toHaveProperty("year_opened", 2006);
                expect(rides).toHaveProperty("park_name", "Thorpe Park");
                expect(rides).toHaveProperty("votes", 4);
            })
        })
    })
    describe("POST/api/parks/:park_id/rides", () => {
        it('should send back 201 status and the new added ride', () => {
            const newRide = {
              ride_name: "new ride",
              year_opened: 2023,
            };
            return request(app).post('/api/parks/4/rides').send(newRide).expect(201).then((response) => {
                const { ride } = response.body  
                expect(ride).toHaveProperty('ride_id', 21)
                expect(ride).toHaveProperty('ride_name', 'new ride')
                expect(ride).toHaveProperty('year_opened', 2023)
                expect(ride).toHaveProperty('votes', 0)
                expect(ride).toHaveProperty('park_id', 4)
            })
            
        })
    });
    describe('PATCH/api/rides/:ride_id', () => {
        it('should send back 200 status with the new update ride', () => {
            const newRideName = {
              ride_name: "new ride name",
            };
            return request(app).patch('/api/rides/1').send(newRideName).expect(200).then((response) => {
                const { ride } = response.body
                  expect(ride).toHaveProperty("ride_id", 1);
                  expect(ride).toHaveProperty("ride_name", "new ride name");
                  expect(ride).toHaveProperty("year_opened", 2002);
                  expect(ride).toHaveProperty("votes", 5);
                  expect(ride).toHaveProperty("park_id", 1);
            })
        })
    })
    describe("DELETE/api/rides/:ride_id", () => {
      it("should send back 204 status", () => {
       
        return request(app)
          .delete("/api/rides/1")
          .expect(204)
      });
    });
});