const request = require("supertest");

const sequelize = require("./dbConfig");
const app = require("../src/app");

const { getOrganizations } = require('../src/organization/services')

beforeAll(async () => {
  await sequelize.drop()
  await sequelize.sync({ force: true });
});

describe("Authentication Test Suite", () => {
  let validAccessToken
  let userId
  const SignupData = {
    email: "john.doe3@example.com",
    firstName: "John",
    lastName: "Doe",
    password: "SecurePassword123",
    phone: "12345678901"
  };

  it("It Should Fail If Required Fields Are Missing", async () => {
    const incompleteData = {
      email: "testUser@example.com",
      password: "password",
      firstName: "Test",
    }
    const response = await request(app).post("/api/auth/register").send(incompleteData)
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', expect.any(String))
  })

  it("Should Register User Successfully with Default Organisation", async () => {
    const response = await request(app).post("/api/auth/register").send(SignupData)

    expectedOrgName = `${SignupData.firstName}'s Organisation`;

    const data = response.body.data;
    //saving dem info for later usage
    // validAccessToken = data.accessToken
    // userId = data.user.userId

    expect(response.statusCode).toBe(201);
    expect(data).toHaveProperty("user");
    expect(data.user).toHaveProperty("email", SignupData.email);
    expect(data.user).toHaveProperty("firstName", SignupData.firstName);
    expect(data.user).toHaveProperty("email", SignupData.email);
    expect(data.user).toHaveProperty("phone", SignupData.phone);
    expect(data).toHaveProperty("accessToken");
  })

  it("It Should Fail if theres Duplicate Email", async () => {
    const response = await request(app).post("/api/auth/register").send(SignupData)

    expect(response.status).toBe(422);
  })

  it("Verify the default organisation name is correctly generated", async () => {
    const organisations = getOrganizations(userId);
    console.log({ organisations })
    firstUserOrg = organisations[0].orgId;
    expect(organisations).toHaveLength(1);
    expect(organisations[0].name).toBe(expectedOrgName);
  })

  it("Check that the response contains the expected user details and access token", async () => {
    const newUser = {
      email: "newUser@example.com",
      password: "password",
      firstName: "NewUser",
      lastName: "User",
      phone: "09012645638"
    }
    const response = await request(app).post("/api/auth/register").send(SignupData)

    const data = response.body.data;

    expect(response.status).toBe(201);
    expect(data).toHaveProperty("user");
    expect(data.user).toHaveProperty("email", newUser.email);
    expect(data.user).toHaveProperty("firstName", newUser.firstName);
    expect(data.user).toHaveProperty("email", newUser.email);
    expect(data.user).toHaveProperty("phone", newUser.phone);
    expect(data).toHaveProperty("accessToken");
  })

  it("It Should Log the user in successfully, (The Info is valid)", async () => {
    const response = await request(app).post("/api/auth/login").send(
      { email: SignupData.email, password: SignupData.password }
    )

    const data = response.body.data;

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Login successful");
    expect(data).toHaveProperty("accessToken");
    expect(data.user).toEqual({
      userId: expect.any(String),
      firstName: SignupData.firstName,
      lastName: SignupData.lastName,
      email: SignupData.email,
      phone: SignupData.phone,
    });

  })

  it("verify user login fails when a invalid credential is provided", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "someOther@gmail.com",
      password: "wrongPassword",
    });

    expect(response.status).toBe(401);
    expect(response.body.status).toBe("Bad request");
    expect(response.body.message).toBe("Authentication Failed");
    expect(response.body.statusCode).toBe(401);
  });



})



afterAll(async () => {
  await sequelize.drop()
  await sequelize.close();

});
