const express = require("express");
const Task = require("../dbModel/tasksModel");
const auth = require("../middleware/auth");

const router = new express.Router();

// tasks endpoint to  save new task
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// reading all tasks
// GET /tasks?completed=true
// GET /tasks?completed=false

router.get("/tasks", auth, async (req, res) => {
  const options = {
    skip: +req.query.skip || 0,
    limit: +req.query.limit || 0,
  };
  const query = {
    owner: req.user._id,
  };
  if (req.query.completed) {
    query.completed = req.query.completed === "true";
  }
  try {
    const tasks = await Task.find(query, null, options);
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

// reading a particular task by its id
router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send({ error: "Task not found." });
    }

    res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const allowedFields = ["description", "completed"];
    const inputFields = Object.keys(req.body);
    const updateIsValid = inputFields.every((field) =>
      allowedFields.includes(field)
    );
    if (!updateIsValid) {
      return res.status(400).send({ error: "Invalid Input fields." });
    }

    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send({ error: "Task not found." });
    }

    inputFields.forEach((field) => (task[field] = req.body[field]));
    await task.save();

    res.status(200).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});
// delete particular task
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send({ error: "Task not found." });
    }
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
