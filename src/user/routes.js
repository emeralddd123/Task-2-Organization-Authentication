const express = require("express");
const userService = require("./services");

const { validUserCreation, validLoginCreation } = require("./middleware");

const userRouter = express.Router();

userRouter.post("/register", validUserCreation, async (req, res) => {
  try {
    const user = req.body;
    const createdUser = await userService.createUser(user);
    const accessToken = await userService.login(user.email, user.password);
    res.status(201).json({
      status: "success",
      message: "Registration successful",
      data: {
        accessToken: accessToken,
        user: createdUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Bad request",
      message: "Registration unsuccessful",
      statusCode: 400,
      error: error.message,
    });
  }
});

userRouter.post("/login", validLoginCreation, async (req, res) => {
  try {
    const loginCredentials = req.body;
    const accessToken = await userService.login(
      loginCredentials.email,
      loginCredentials.password
    );
    const user = await userService.findByEmail(loginCredentials.email);
    res.status(201).json({
      status: "success",
      message: "Login successful",
      data: {
        accessToken: accessToken,
        user: createdUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Bad request",
      message: "Login unsuccessful",
      statusCode: 400,
      error: error.message,
    });
  }
});

// Route for retrieving user information
userRouter.get("/user/:id", (req, res) => {
  // Logic for retrieving user information
});

// Route for updating user information
userRouter.put("/user/:id", (req, res) => {
  // Logic for updating user information
});

// Route for deleting a user
userRouter.delete("/user/:id", (req, res) => {
  // Logic for deleting a user
});

module.exports = userRouter;
