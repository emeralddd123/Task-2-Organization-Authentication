const serializeUser = (user) => {
    return {
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
    }
}


module.exports = { serializeUser };