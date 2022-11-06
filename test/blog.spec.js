const request = require('supertest')
const { connect } = require('./database')
const app = require('../index');
const {blogPostModel,userModel} = require('../model');


describe('Blog Route', () => {
    let conn;
    let token;

    beforeAll(async () => {
        conn = await connect()

        await userModel.create({
            password: "secrett",
            first_name: "valentina",
            last_name: "Augustine",
            email: "jojo@gmail.com",
        });

        const loginResponse = await request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({ 
            password: 'secrett', 
            email: 'jojo@gmail.com'
        });

        token = loginResponse.body.user.token;
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should return all published blogs', async () => {
        // create order in our db
        await blogPostModel.create({
            title:  "testing new routes",
            description:"not much to say",
            state:"Published",
            tags:"sense",
            body:"omo, i have nothing to say to you do your worse"
    })
        await blogPostModel.create({
            title:  "baby",
            description:"not much to say",
            state:"Draft",
            tags:"sense",
            body:"omo, i have nothing to say to you do your worse"
    })
        await blogPostModel.create({
            title:  "number 4",
            description:"not much to say",
            state:"Published",
            tags:"church",
            body:"omo, i have nothing to say to you do your worse"
    })


    await blogPostModel.create({
        title:  "testing 2",
        description:"not much to say",
        state:"Draft",
        tags:"building",
        body:"omo, i have nothing to say to you do your worse"
})

        const response = await request(app)
        .get('/blog/all')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blogs')
        expect(response.body).toHaveProperty('status', true)
    })

    it('should return a blog that has a tag = church', async () => {
        // create order in our db
        await blogPostModel.create({
            title:  "testing new routes",
            description:"not much to say",
            state:"Published",
            tags:"sense",
            body:"omo, i have nothing to say to you do your worse"
    })
        await blogPostModel.create({
            title:  "baby",
            description:"not much to say",
            state:"Draft",
            tags:"sense",
            body:"omo, i have nothing to say to you do your worse"
    })
        await blogPostModel.create({
            title:  "number 4",
            description:"not much to say",
            state:"Published",
            tags:"church",
            body:"omo, i have nothing to say to you do your worse"
    })


    await blogPostModel.create({
        title:  "testing 2",
        description:"not much to say",
        state:"Draft",
        tags:"building",
        body:"omo, i have nothing to say to you do your worse"
})

        const response = await request(app)
        .get('/blog/all?tags=church')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blogs')
        expect(response.body).toHaveProperty('status', true)
    })
});
