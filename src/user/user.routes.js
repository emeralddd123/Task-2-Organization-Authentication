const express = require("express");
const userService = require("./services");

const { authenticate } = require("./middleware");

const userRouter = express.Router();


userRouter.get("/:id", authenticate, async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);

        if (req.user.id !== user.userId) {
            return res.status(403).json({
                status: "Forbidden",
                message: "You are not authorized to view this info",
                statusCode: 403,
            });
        }
        res.status(200).json({
            status: "success",
            message: "Your Information",
            data: user,
        });
    } catch (error) {
        res.status(404).json({
            status: "Not found",
            message: "User not found",
            statusCode: 404,
        });
    }
});

userRouter.put("/:id", (req, res) => {
    // Logic for updating user information
});

// Route for deleting a user
userRouter.delete("/user/:id", (req, res) => {
    // Logic for deleting a user
});

module.exports = userRouter;
