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

        it("The data should have the required properties", () => {
            return request(app).get("/api/topics").expect(200).then((res) => {
            res.body.topics.forEach((topic) => {
                expect(topic).toHaveProperty("slug");
                expect(topic).toHaveProperty("description");
                expect(typeof topic.slug).toBe("string");
                expect(typeof topic.description).toBe("string");
            })
            
            })
        })

        it("should return a 404 error if the wrong route is provided", () => {
            return request(app).get("/api/topic").expect(404).then((res) => {
                // console.log(res)
                expect(res.body.msg).toEqual("Not Found");
            })
        });
        })
    


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

describe("GET /api documentation", () => {
    it("should return Status - 200 from the endpoint", () => {
        return request(app).get("/api").expect(200);
    })

    it("should have the 'GET /api' and 'GET /api/topics' property on the JSON response body", () => {
        return request(app).get("/api").expect(200).then((res) => {
            expect(res.body).toHaveProperty("GET /api");
            expect(res.body).toHaveProperty("GET /api/topics");
        })
    });
})
