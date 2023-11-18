const { app, server } = require("../index");
const request = require("supertest");
const mongoose = require("mongoose");

beforeEach(async () => {
  // Clear the users collection before each test
  await mongoose.connection.collection("users").deleteMany({});
});

describe("User Authentication Tests", () => {
  // A test for user registration
  it("should register a new user", async () => {
    const response = await request(app).post("/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("name", "Test User");
    expect(response.body).toHaveProperty("email", "test@example.com");
  });

  // A test for user login
  it("should login an existing user", async () => {
    // Register a test user first
    const registerResponse = await request(app).post("/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(registerResponse.status).toBe(200);

    // Now, attempt to login with the registered user credentials
    const loginResponse = await request(app).post("/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("_id");
    expect(loginResponse.body).toHaveProperty("name", "Test User");
    expect(loginResponse.body).toHaveProperty("email", "test@example.com");
  });
});

// Close the server after all tests are done
afterAll((done) => {
  server.close(done);
});
