const jwt = require('jsonwebtoken');

const { UserRepository } = require("./models");

const userRepository = new UserRepository();

async function createUser(user) {
    if (await userRepository.findByEmail(user.email)) {
        console.log(await userRepository.findByEmail(user.email));
        throw new Error('User already exists');
    }
    return userRepository.createUser(user);
}

async function findByEmail(email) {
    return userRepository.findByEmail(email);
}

async function findById(id) {
    return userRepository.findById(id);
}

async function updatePassword(id, newPassword) {
    const user = await userRepository.findById(id);
    return user.updatePassword(newPassword);
}

async function login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new Error('Password is incorrect');
    }

    const accessToken =  jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, {
        expiresIn: '10h'
    });


    return accessToken;
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
    updatePassword,
    login,
    signUp
};