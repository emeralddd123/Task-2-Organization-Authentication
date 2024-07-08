const { DataTypes, Model } = require('@sequelize/core');
const db = require('../dbConfig');
const bcrypt = require('bcrypt');

const User = db.define('User', {
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        validate: {
            is: /^[0-9]{11}$/
        }
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
    }

}, {
    hooks: {
        beforeCreate: async (user) => {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            user.password = hashedPassword;
        }
    }
});

User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

User.prototype.updatePassword = async function (newPassword) {
    this.password = await bcrypt.hash(newPassword, 10);
    return this.save();
};

class UserRepository {
    async findByEmail(email) {
        const user = await User.findOne({ where: { email } });
        return user;
    }

    async findById(id) {
        return User.findByPk(id);
    }

    async createUser(user) {
        const userData = await User.create(user);
        const { password, role, ...userWithoutPassword } = userData.dataValues;
        return userWithoutPassword;
    }


}

module.exports = { User, UserRepository };
