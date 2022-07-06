const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");

const { userOne, userTwo, taskOne, seedDB } = require("./fixtures/mongoDB");

//setup mongo
beforeEach(seedDB);

test("Create task", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ description: "Create test description" })
    .expect(201);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task);
});

test("Get task for user one", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(2);
});

test("Fail to delete other user task", async () => {
  const respons = await request(app)
    .delete(`/task/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
