const request = require("supertest");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const data = require("../db/data/test-data");
const app = require("../app");
const jsonDoc = require("../endpoints.json");

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

    it("should return a JSON response body", () => {
        return request(app).get("/api").expect(200).then((res) => {
            expect(res.body).toEqual(jsonDoc);
        })
    });

    it("should have a description property on all endpoints", () => {
        return request(app).get("/api").expect(200).then( res => {
            const { body } = res;
            
            for ( let endpoint in body){
                expect(body[endpoint]).toHaveProperty("description");
            }
        })
    })

    it("all endpoints except 'GET /api' should have queries and exampleResponse properties", () => {
        return request(app).get("/api").expect(200).then( res => {
            
            const { body } = res;
            
            for ( let endpoint in body){
                
                if(endpoint != 'GET /api'){
                    expect(body[endpoint]).toHaveProperty("queries");
                    expect(body[endpoint]).toHaveProperty("exampleResponse");

                }
                
            }
        })
        
    })

    it("All endpoints exampleResponse property object should have a key of topics which is an array", () => {
        return request(app).get("/api").expect(200).then( res => {
            const { body } = res;
            
            for ( let endpoint in body){
                
                if(endpoint != 'GET /api'){

                    const exampleResponse = body[endpoint].exampleResponse;

                    const topics = body[endpoint].exampleResponse.topics;
                    expect(exampleResponse).toHaveProperty("topics");
                    expect(Array.isArray(topics)).toBe(true);

                }
            }
        })
    })

    it("The topics array should contain one or more objects with slug and description properties", () => {
        return request(app).get("/api").expect(200).then( res => {
            const { body } = res;
            
            for ( let endpoint in body){
                
                if(endpoint != 'GET /api'){

                    const topics = body[endpoint].exampleResponse.topics;
                    
                    topics.forEach((topic) => {
                        expect(typeof topic).toBe("object");
                        expect(Array.isArray(topic)).toBe(false);
                        expect(topic).toHaveProperty("slug");
                        expect(topic).toHaveProperty("description");
                    })

                }
            }
        })
    })

})
