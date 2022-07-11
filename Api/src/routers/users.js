const express = require("express");
const User = require("../dbModel/usersModel");
const router = new express.Router();

//users endpoint to register new user and save to database(sign up)
router.post("/users/signup", async (req, res) => {
  try {
    // console.log(user);
    const user = await new User(req.body);
    const token = await user.genAuthToken();
    return res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

// route for user to login or sign in
router.post("/users/login", async (req, res) => {
  try {
    const enteredEmail = req.body.email;
    const enteredPassword = req.body.password;
    const user = await User.findByCredentials(enteredEmail, enteredPassword);

    const token = await user.genAuthToken();
    res.status(200).send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
