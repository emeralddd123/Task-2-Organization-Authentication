const express = require("express");
const userService = require("./services");

const { validUserCreation, validLoginCreation } = require("./middleware");

const authRouter = express.Router();

authRouter.post("/register", validUserCreation, async (req, res) => {
    try {
        const user = req.body;
        const createdUser = await userService.createUser(user);
        const { accessToken } = await userService.login(user.email, user.password);
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

authRouter.post("/login", validLoginCreation, async (req, res) => {
    try {
        const loginCredentials = req.body;
        const { accessToken, serializedUser } = await userService.login(
            loginCredentials.email,
            loginCredentials.password
        );

        
        res.status(201).json({
            status: "success",
            message: "Login successful",
            data: {
                accessToken: accessToken,
                user: serializedUser,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "Bad request",
            message: "Authentication Failed",
            statusCode: 401,
        });
    }
});


module.exports = authRouter;
