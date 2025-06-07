const request = require("supertest");
const app = require("../index");

let taskId;

describe("Task API Tests", () => {
  const sampleTask = {
    title: "Test Task",
    desc: "Test description",
    due_date: "2025-06-30",
    status: true
  };

  // Add Task
  it("should add a new task", async () => {
    const res = await request(app)
      .post("/api/addtask")
      .send(sampleTask);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("data inserted successfully");
  });

  // Get All Tasks
  it("should fetch all tasks", async () => {
    const res = await request(app).get("/api/tasks");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);

    // Get the last inserted task's ID
    taskId = res.body.data[res.body.data.length - 1]?.id;
    expect(taskId).toBeDefined();
  });

  // Edit Task
  it("should update a task", async () => {
    const updatedTask = {
      title: "Updated Task",
      desc: "Updated description",
      due_date: "2025-07-01",
      status: false
    };

    const res = await request(app)
      .put(`/api/edittask/${taskId}`)
      .send(updatedTask);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task updated successfully");
  });

  // Delete Task
  it("should delete the task", async () => {
    const res = await request(app).delete(`/api/delete/${taskId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("task deleted successfully");
  });
});
