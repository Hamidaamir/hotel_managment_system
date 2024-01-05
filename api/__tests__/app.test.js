const { app, server } = require("../index");
const request = require("supertest");
const mongoose = require("mongoose");
const { jwtSecret } = require("../index");
const { getUserDataFromReq } = require("../index");

const jwt = require("jsonwebtoken");

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

describe("User Profile Tests", () => {
  // A test for retrieving user profile information
  it("should retrieve user profile information", async () => {
    // Register a test user first
    const registerResponse = await request(app).post("/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(registerResponse.status).toBe(200);

    // Login with the registered user credentials
    const loginResponse = await request(app).post("/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(loginResponse.status).toBe(200);

    // Retrieve user profile information
    const token = jwt.sign({ id: loginResponse.body._id }, jwtSecret);
    const profileResponse = await request(app)
      .get("/profile")
      .set("Cookie", [`token=${token}`]);

    expect(profileResponse.status).toBe(200);
    expect(profileResponse.body).toHaveProperty("_id");
    expect(profileResponse.body).toHaveProperty("name", "Test User");
    expect(profileResponse.body).toHaveProperty("email", "test@example.com");
  });

  // A test for attempting to retrieve user profile information without authentication
  it("should return 401 when attempting to retrieve user profile without authentication", async () => {
    // Attempt to retrieve user profile information without authentication
    const profileResponse = await request(app).get("/profile");

    expect(profileResponse.status).toBe(401);
    expect(profileResponse.body).toBe("Authentication required");
  });
});

// Close the server after all tests are done
afterAll((done) => {
  server.close(() => {
    mongoose.connection.close();
    done();
  });
});
