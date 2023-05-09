const request = require("supertest");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const data = require("../db/data/test-data");
const app = require("../app");

beforeEach(() => {
    return seed(data);
    
})
afterAll(() => {
    db.end();
})

describe("/api/topics endpoint", () => {

    describe("GET all", () => {
        it("should return status - 200 ok", () => {
        return request(app).get("/api/topics").expect(200);
    });

    it("should return the list of expected topics from the data file.", () => {
        return request(app).get("/api/topics").expect(200).then((res) => {
            const { topicData } = data;
            expect(res.body).toEqual({ topics: topicData})
        })
    });

    it("should return a 404 error if the wrong route is provided", () => {
        return request(app).get("/api/topic").expect(404).then((res) => {
            expect(res.res.statusMessage).toEqual("Not Found");
        })
    })
    })
    


})
