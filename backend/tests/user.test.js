const request = require("supertest");

const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, seedDB } = require("./fixtures/mongoDB");

//setup mongo
beforeEach(seedDB);

test("Sing up new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "test",
      email: "test@test.com",
      password: "test12345",
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  expect(response.body).toMatchObject({
    user: {
      name: "test",
      email: "test@test.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("test12345");
});

test("Login exisitng user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Login failour", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "fail",
      password: "fail",
    })
    .expect(400);
});

test("Fetch user profile", async () => {
  await request(app).get("/users/me").set("Authorization", `Bearer ${userOne.tokens[0].token}`).expect(200);
});

test("Fail to fetch user profile", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Delete account", async () => {
  await request(app).delete("/users/me").set("Authorization", `Bearer ${userOne.tokens[0].token}`).expect(200);
  const user = await User.findOne(userOneId);
  expect(user).toBeNull();
});

test("Fail to delete account with no auth", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/thumpsUp.png")
    .expect(200);
});

test("Update user", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "testUpdate",
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toEqual("testUpdate");
});
