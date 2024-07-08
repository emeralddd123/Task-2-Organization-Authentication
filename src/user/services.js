const jwt = require('jsonwebtoken');
const { UserRepository } = require("./models");
const { serializeUser } = require('./utils');
const userRepository = new UserRepository();

async function createUser(user) {
    if (await userRepository.findByEmail(user.email)) {
        console.log(await userRepository.findByEmail(user.email));
        throw new Error('User already exists');
    }
    const userData = await userRepository.createUser(user);
    return serializeUser(userData.dataValues);
}

async function findByEmail(email) {
    const user = userRepository.findByEmail(email);
    return serializeUser(user.dataValues);
}

async function findById(id) {
    const user = await userRepository.findById(id);
    return serializeUser(user.dataValues);
}


async function login(email, u_password) {
    const user = await userRepository.findByEmail(email);
    const serializedUser = serializeUser(user.dataValues);
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordCorrect = await user.comparePassword(u_password);
    if (!isPasswordCorrect) {
        throw new Error('Password is incorrect');
    }

    const accessToken = jwt.sign({ id: user.userId, email: user.email }, process.env.SECRET_KEY, {
        expiresIn: '10h'
    });


    return { accessToken, serializedUser };
}

async function signUp(user) {
    const existingUser = await userRepository.findByEmail(user.email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    return createUser(user);
}



module.exports = {
    createUser,
    findByEmail,
    findById,
    login,
    signUp
};