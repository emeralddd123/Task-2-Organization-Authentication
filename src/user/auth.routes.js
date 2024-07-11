const express = require("express");
const userService = require("./services");
const { createOrganization } = require('../organization/services')

const { validUserCreation, validLoginCreation } = require("./middleware");

const authRouter = express.Router();

authRouter.post("/register", validUserCreation, async (req, res) => {
    try {
        const userData = req.body;
        const createdUser = await userService.createUser(userData);
        await createOrganization(
            { name: `${userData.firstName}'s Organisation`, description: `desc 1` },
            createdUser.userId)
        const { accessToken } = await userService.login(userData.email, userData.password);
        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "Registration successful",
            data: {
                accessToken: accessToken,
                user: createdUser,
            },
        });
    } catch (error) {
        if (error.message == 'User already exists') {
            return res.status(422).json({
                status: "Bad request",
                message: "User Already Exists",
                statusCode: 422,
                error: error.message,
            });
        }
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


        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Login successful",
            data: {
                accessToken: accessToken,
                user: serializedUser,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            status: "Bad request",
            message: "Authentication Failed",
            statusCode: 401,
        });
    }
});


module.exports = authRouter;
