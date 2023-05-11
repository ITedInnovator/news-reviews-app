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

    describe("GET /api/topics", () => {
        it("The topics exampleResponse property object should have a key of topics which is an array", () => {
        return request(app).get("/api").expect(200).then( res => {
            const { body } = res;
                

                    const exampleResponse = body["GET /api/topics"].exampleResponse;

                    const topics = body["GET /api/topics"].exampleResponse.topics;
                    expect(exampleResponse).toHaveProperty("topics");
                    expect(Array.isArray(topics)).toBe(true);
        })
    })

    it("The topics array should contain one or more objects with slug and description properties", () => {
        return request(app).get("/api").expect(200).then( res => {
            const { body } = res;
                
                    const topics = body["GET /api/topics"].exampleResponse.topics;
                    
                    topics.forEach((topic) => {
                        expect(typeof topic).toBe("object");
                        expect(Array.isArray(topic)).toBe(false);
                        expect(topic).toHaveProperty("slug");
                        expect(topic).toHaveProperty("description");
                    })
        })
    })

    })

    describe("GET /api/articles/:article_id", () => {
        it("The exampleResponse object should have a key of article with a value that is an object.", () => {
            return request(app).get("/api").expect(200).then(res => {
                const { body } = res;
                const exampleRes = body["GET /api/articles/:article_id"].exampleResponse

                expect(exampleRes).toHaveProperty("article");
                expect(typeof exampleRes.article).toBe("object");
                expect(Array.isArray(exampleRes.article)).toBe(false);
            })
        })

        it("The exampleResponse article object should have the relevant keys expected to be on the response.", () => {
            return request(app).get("/api").expect(200).then( res => {
                const { body } = res;
                const article = body["GET /api/articles/:article_id"].exampleResponse.article
            
            expect(article).toHaveProperty("article_id");
            expect(article).toHaveProperty("author");
            expect(article).toHaveProperty("title");
            expect(article).toHaveProperty("body");
            expect(article).toHaveProperty("topic");
            expect(article).toHaveProperty("created_at");
            expect(article).toHaveProperty("votes");
            expect(article).toHaveProperty("article_img_url");

            })
        })
    })

    

})

describe("GET /api/articles/:article_id", () => {
    it("should return a 200 - status when passed with a valid value for the id", () => {
        return request(app).get("/api/articles/1").expect(200);
    })

    it("should return a 200 - status and the response body with the required properties", () => {
        return request(app).get("/api/articles/1").expect(200).then( res => {
            const { body } = res;
            const { article } = body;

            expect(article).toHaveProperty("article_id");
            expect(article).toHaveProperty("author");
            expect(article).toHaveProperty("title");
            expect(article).toHaveProperty("body");
            expect(article).toHaveProperty("topic");
            expect(article).toHaveProperty("created_at");
            expect(article).toHaveProperty("votes");
            expect(article).toHaveProperty("article_img_url");
        })
    })

    it("should return the expected values for the article properties as specified in the database", () => {
        return request(app).get("/api/articles/1").expect(200).then( res => {
            const { article } = res.body;
            expect(article.article_id).toBe(1);
            expect(article.author).toBe('butter_bridge');
            expect(article.title).toBe('Living in the shadow of a great man');
            expect(article.body).toBe('I find this existence challenging');
            expect(article.topic).toBe('mitch');
            expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
            expect(article.votes).toBe(100);
            expect(article.article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700');

        })
    })

    it("should return a 400 error if the user puts in an incorrect data type with a message of 'Incorrect type for an ID' which should also prevent SQL injection", () => {
        return request(app).get("/api/articles/SELECT * FROM articles 1;").expect(400).then( res => {
            expect(res.body.msg).toBe('Incorrect type for an ID');
        })
    })

    it("should return a 404 error if the user puts an id number which does not exist and an error message of 'There is not an article at this ID sorry!'", () => {
        return request(app).get("/api/articles/40").expect(404).then( res => {
            expect(res.body.msg).toBe('There is not an article at this ID sorry!');
        })
    })
})
