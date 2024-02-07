/* make sure you write your tests for your utils functions in here :eyes: */
const { parkNameAndId } = require('../db/seed')

describe('parkNameAndId()', () => {
  it('should return an object', () => {
    const testParkNameAndId = parkNameAndId([{}])
    expect(testParkNameAndId).toEqual({})
  })
  it('iterate through the array of object and return  an object with park name and id', () => {
    const parks = [
      {
        park_id: 2,
        park_name: "Alton Towers",
        year_opened: 1980,
        annual_attendance: 2520000,
      }
    ];
    expect(parkNameAndId(parks)).toEqual({"Alton Towers": 2})
  })
  it('should work with more than one object inside the array', () => {
    const parks = [
      {
        park_id: 4,
        park_name: "Tivoli Gardens",
        year_opened: 1843,
        annual_attendance: 3972000,
      },
      {
        park_id: 2,
        park_name: "Alton Towers",
        year_opened: 1980,
        annual_attendance: 2520000,
      },
    ];
    expect(parkNameAndId(parks)).toEqual({"Tivoli Gardens":4, 'Alton Towers':2})
  })
  it('should not mutate the original array', () => {
   const parks = [
     {
       park_id: 4,
       park_name: "Tivoli Gardens",
       year_opened: 1843,
       annual_attendance: 3972000,
     },
     {
       park_id: 2,
       park_name: "Alton Towers",
       year_opened: 1980,
       annual_attendance: 2520000,
     },
   ];
    parkNameAndId(parks)
   expect(parks).toEqual([
     {
       park_id: 4,
       park_name: "Tivoli Gardens",
       year_opened: 1843,
       annual_attendance: 3972000,
     },
     {
       park_id: 2,
       park_name: "Alton Towers",
       year_opened: 1980,
       annual_attendance: 2520000,
     },
   ]); 
  })
})