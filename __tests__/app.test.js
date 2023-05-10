const request = require("supertest");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const data = require("../db/data/test-data");
const app = require("../app");
const { convertTimestampToDate } = require("../db/seeds/utils");

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
})
