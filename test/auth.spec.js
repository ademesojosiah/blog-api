const request = require("supertest");
const { connect } = require("./database");
const { userModel } = require("../model");
const app = require("../index");

describe("Auth: Signup", () => {
  let conn;

  beforeAll(async () => {
    conn = await connect();
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it("should signup a user", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .set("content-type", "application/json")
      .send({
        password: "secrett",
        first_name: "valentina",
        last_name: "Augustine",
        email: "jojo@mail.com",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("first_name", "valentina");
    expect(response.body.user).toHaveProperty("last_name", "Augustine");
    expect(response.body.user).toHaveProperty("email", "jojo@mail.com");
  });

  it("should login a user", async () => {
    // create user in out db
    const user = await userModel.create({
      password: "secrett",
      first_name: "valentina",
      last_name: "Augustine",
      email: "jojo@gmail.com",
    });

    // login user
    const response = await request(app)
      .post("/auth/login")
      .set("content-type", "application/json")
      .send({
        email: "jojo@gmail.com",
        password: "secrett",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });
});
