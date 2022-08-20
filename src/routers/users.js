const express = require("express");
const router = express.Router();

// user model
const User = require("../model/users");

// Endpoint to get all the users in the database
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).send("No Users");
    }

    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Endpoint to get a particular user
router.get("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("user not found");
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Endpoint to add user to the database
router.post("/", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(401).send(error);
  }
});

// Endpoint to update a particular user by there id
router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOptions = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOptions) {
    return res.status(404).send({ error: "invalid updates" });
  }

  const _id = req.params.id;
  try {
    const users = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!users) {
      return res.status(404).send("user not found");
    }

    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("user not found");
    }
    res.status(200).send(`${user.name} Deleted Successfully!`);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
