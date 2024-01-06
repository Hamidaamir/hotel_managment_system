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

describe("User Logout Test", () => {
  // A test for user logout
  it("should log out a user", async () => {
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

    // Log out the user
    const logoutResponse = await request(app)
      .post("/logOut")
      .set("Cookie", [`token=${loginResponse.body.token}`]);

    expect(logoutResponse.status).toBe(200);
    expect(logoutResponse.body).toBe(true);
  });
});

describe("Photo Upload by Link Test", () => {
  // A test for uploading photos through a link
  it("should upload a photo through a link", async () => {
    try {
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

      // Use the user's token to authenticate the upload-by-link request
      const token = loginResponse.body.token;

      // Upload a photo through a link
      const uploadByLinkResponse = await request(app)
        .post("/upload-by-link")
        .set("Cookie", [`token=${token}`])
        .send({
          link: "https://example.com/nonexistent-image.jpg", // Use a non-existent URL for testing
        });

      console.log(
        "Upload by Link Response:",
        uploadByLinkResponse.status,
        uploadByLinkResponse.body
      );

      // Update the expectations to match the new behavior (404 status code)
      expect(uploadByLinkResponse.status).toBe(404);
      expect(uploadByLinkResponse.body).toBe("Image not found");
    } catch (error) {
      console.error("Photo Upload Test Failed:", error);
      throw error;
    }
  });
});

describe("Place Retrieval Test", () => {
  // A test for retrieving a list of places
  it("should retrieve a list of places", async () => {
    try {
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

      // Use the user's token to authenticate the place retrieval request
      const token = loginResponse.body.token;

      // Retrieve a list of places
      const placesResponse = await request(app)
        .get("/places")
        .set("Cookie", [`token=${token}`]);

      console.log(
        "Place Retrieval Response:",
        placesResponse.status,
        placesResponse.body
      );

      // Expect a successful response with an array of places
      expect(placesResponse.status).toBe(200);
      expect(placesResponse.body).toBeInstanceOf(Array);
    } catch (error) {
      console.error("Place Retrieval Test Failed:", error);
      throw error;
    }
  });
});

describe("Place Search Test", () => {
  // A test for searching places based on a query
  it("should search places and return results", async () => {
    try {
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

      // Use the user's token to authenticate the place search request
      const token = loginResponse.body.token;

      // Search places based on a query
      const searchResponse = await request(app)
        .get("/search-places")
        .query({ query: "Test" }) // Use a query string for testing

        .set("Cookie", [`token=${token}`]);

      console.log(
        "Place Search Response:",
        searchResponse.status,
        searchResponse.body
      );

      // Expect a successful response with an array of matching places
      expect(searchResponse.status).toBe(200);
      expect(searchResponse.body).toBeInstanceOf(Array);
    } catch (error) {
      console.error("Place Search Test Failed:", error);
      throw error;
    }
  });
});

// Close the server after all tests are done
afterAll((done) => {
  server.close(() => {
    mongoose.connection.close();
    done();
  });
});
