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
    return db.end();
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

        it("The exampleResponse articles array of objects should have the relevant keys expected to be on the response.", () => {
            return request(app).get("/api").expect(200).then( res => {
                    const { body } = res;
                    const articles = body["GET /api/articles"].exampleResponse.articles
                    
                    expect(Array.isArray(articles)).toBe(true);

                    articles.forEach(article => {
                        expect(article).toHaveProperty("article_id");
                        expect(article).toHaveProperty("author");
                        expect(article).toHaveProperty("title");
                        expect(article).toHaveProperty("topic");
                        expect(article).toHaveProperty("created_at");
                        expect(article).toHaveProperty("votes");
                        expect(article).toHaveProperty("article_img_url");
                        expect(article).toHaveProperty("comment_count");
                    })
                    

            })
        })
    })

    

})

describe("/api/articles endpoints", () => {

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

        it("should return the expected value for article_id and the types for the other article properties as specified in the database", () => {
            return request(app).get("/api/articles/1").expect(200).then( res => {
                const { article } = res.body;
                expect(article.article_id).toBe(1);
                expect(typeof article.author).toBe('string');
                expect( typeof article.title).toBe('string');
                expect(typeof article.body).toBe('string');
                expect(typeof article.topic).toBe('string');
                expect(typeof article.created_at).toBe("string");
                expect(typeof article.votes).toBe("number");
                expect(typeof article.article_img_url).toBe('string');
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

    describe(" GET /api/articles", () => {
        it("Expect a STATUS - 200 from the articles endpoint.", () => {
            return request(app).get("/api/articles").expect(200);
        })
        
        it("Properties expected from the articles table are present and the body property is not included", () => {
            return request(app).get("/api/articles").expect(200).then( res => {
                const { body } = res;
                body.articles.forEach(article => {
                    
                    expect(article).toHaveProperty("article_id");
                    expect(article).toHaveProperty("author");
                    expect(article).toHaveProperty("title");
                    expect(article).toHaveProperty("topic");
                    expect(article).toHaveProperty("created_at");
                    expect(article).toHaveProperty("votes");
                    expect(article).toHaveProperty("article_img_url");
                    expect(article).not.toHaveProperty("body");

                })
            })
        })

        it("Object has the property of comment_count which should match the number of comments expected for that article", () => {
            return request(app).get("/api/articles").expect(200).then((res) => {
                const { body } = res;

                body.articles.forEach((article) => {
                    expect(article).toHaveProperty("comment_count");
                    if(article.article_id === 1){
                        expect(article.comment_count).toBe("11")
                    }
                    if(article.article_id === 2){
                        expect(article.comment_count).toBe("0");
                    }

                    if(article.article_id === 3){
                        expect(article.comment_count).toBe("2");
                    }
                    
                })
            })
        })

        it("Check the articles are sorted by date in descending order", () => {

            return request(app).get("/api/articles").expect(200).then( res => {
                
                const { body } = res;
                expect(body.articles).toBeSortedBy("created_at", { descending: true } );
            })

        })
    })

    describe("PATCH /api/articles/:article_id", () => {
        it("Should return STATUS - 200 if passed a valid article id", () => {
            return request(app).patch("/api/articles/1").send({inc_votes: 1}).expect(200);
        })

        it("should return a response with the expected properties", () => {
            return request(app).patch("/api/articles/1").expect(200).send({inc_votes: 2}).then(( {body }) => {
                const {article} = body
                expect(article).toHaveProperty("votes");
                expect(typeof body.article.votes).toBe("number");
                expect(body.article).toHaveProperty("article_id");
                expect(typeof body.article.article_id).toBe("number");
                expect(body.article).toHaveProperty("author");
                expect(typeof body.article.author).toBe("string");
                expect(body.article).toHaveProperty("title");
                expect(typeof body.article.title).toBe("string");
                expect(body.article).toHaveProperty("topic");
                expect(typeof body.article.topic).toBe("string");
                expect(body.article).toHaveProperty("body");
                expect(typeof body.article.body).toBe("string");
                expect(body.article).toHaveProperty("created_at");
                expect(typeof body.article.created_at).toBe("string");
                expect(body.article).toHaveProperty("article_img_url")
                expect(typeof body.article.article_img_url).toBe("string");
            })
        })

        it("should update the votes and return the correct article values for each field with the updated vote number", () => {
            return request(app).patch("/api/articles/2").send({ inc_votes: 10 }).expect(200).then(({ body }) => {
                const { article } = body
                const {article_id, author, article_img_url, created_at, topic, votes, title } = article;
                expect(article_id).toBe(2);
                expect(article.body).toBe("Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.");
                expect(author).toBe("icellusedkars");
                expect(article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700");
                expect(created_at).toBe("2020-10-16T05:03:00.000Z");
                expect(topic).toBe("mitch");
                expect(votes).toBe(10);
                expect(title).toBe("Sony Vaio; or, The Laptop");

            })
        })

        it("should return a STATUS 404 not found if the article id doesn't exist", () => {
        return request(app).patch("/api/articles/40").send({ inc_votes: 2 }).expect(404).then( res => {
            const { body } = res;

            expect(body.msg).toBe("Article does not exist!");
        })
    })

    it("should return a STATUS - 400 bad request if the article id is not a valid type", () => {
        return request(app).patch("/api/articles/nonsense").expect(400).then( ({body}) => {
            expect(body.msg).toBe("Incorrect type for an ID");
        })
    })

    it("should return a STATUS - 400 bad request if the inc_votes property is not set in the request", () => {
        return request(app).patch("/api/articles/2").send({ nonsense_votes: 10 }).expect(400).then( ( {body} ) => {
            expect(body.msg).toBe("Bad request properties insufficient");
        })
    })
    })
})

describe("Comment endpoints", () => {
    
    describe("GET /api/articles/:article_id/comments", () => {
        it("should return response STATUS - 200", () => {
            return request(app).get("/api/articles/2/comments").expect(200);
        })

        it("should return an array of comment objects with the correct properties", () => {
            return request(app).get("/api/articles/5/comments").expect(200).then((res) => {
                const { body } = res;
                expect(Array.isArray(body.comments)).toBe(true);

                expect(body.comments.length).toBe(2);

                body.comments.forEach( comment => {
                    expect(comment).toHaveProperty("comment_id");
                    expect(comment).toHaveProperty("votes");
                    expect(comment).toHaveProperty("created_at");
                    expect(comment).toHaveProperty("author");
                    expect(comment).toHaveProperty("body");
                    expect(comment).toHaveProperty("article_id");
                })
            })
        })

        it("should return an array of comments of the correct length from the article id passed as a parameter and includes the right comment_ids", () => {
            return request(app).get("/api/articles/3/comments").expect(200).then(res => {
                const {comments} = res.body
                const commentIds = [10, 11]
                    
                expect(comments.length).toBe(2);

                comments.forEach( comment => {
                    expect(commentIds.includes(comment.comment_id)).toBe(true);
                })
            })
        })

        it("should return the comments in the correct order when sorted by created_at date", () => {
            return request(app).get("/api/articles/1/comments").expect(200).then( res => {
                const {comments} = res.body;

                expect(comments).toBeSortedBy("created_at", {
                    descending: true,
                })
            })
        })

        it("should return STATUS - 404 if an ID of the correct type is provided which doesn't exist in the database", () => {
            return request(app).get("/api/articles/200/comments").expect(404).then( res => {
                const { msg } = res.body

                expect(msg).toBe("There is not an article at this ID sorry!");
            })
        })

        it("should return STATUS - 400 if an ID of incorrect type if provided", () => {
            return request(app).get("/api/articles/nonsense/comments").expect(400).then( res => {
                const { msg } = res.body;

                expect(msg).toBe('Incorrect type for an ID');
            })
        })
})

describe("POST /api/articles/:article_id/comments", () => {
    it("Returns STATUS - 200 when creating a new comment", () => {
        return request(app).post("/api/articles/2/comments").send({ username: "rogersop", body: "Hoperfully this will make this test work correctly."}).expect(200);
    })

    it("Check the request body is an object with the required properties and expect the response body to have the same data in the required properties for the comments table.", () => {

        const body = { username: "rogersop", body: "Oops I didn't mean to put that comment here."}

        expect(body).toHaveProperty("username");
        expect(body).toHaveProperty("body");

        
        return request(app).post("/api/articles/1/comments").send(body).expect(200).then((res) => {
            expect(res.body.comment.author).toBe(body.username);
            expect(res.body.comment.body).toBe(body.body);
        })
    })

    it("should return a STATUS 400 bad request if the json object in teh request does not have the required properties", () => {

        return request(app).post("/api/articles/1/comments").send({}).expect(400).then(res => {
            const {body} = res;

            expect(body.msg).toBe("Bad request properties insufficient")
        })
    })

    it("should return a STATUS 404 not found if the article id doesn't exist", () => {
        return request(app).post("/api/articles/40/comments").send({ username: "rogerops", body: "This is a new comment" }).expect(404).then( res => {
            const { body } = res;

            expect(body.msg).toBe("Article does not exist");
        })
    })

    
})
})