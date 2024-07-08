const { DataTypes } = require('@sequelize/core');
const db = require('../dbConfig');
const { User } = require('../user/models');

const Organization = db.define('Organization', {
    orgId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
});

class OrganizationRepository {
    async findByName(name) {
        return Organization.findOne({ where: { name } });
    }

    async addUser(organization, user) {
        return organization.addUser(user);
    }

    async removeUser(organization, user) {
        return organization.removeUser(user);
    }

    async getUsers(organization) {
        return organization.getUsers();
    }

    async getOrganizations(user) {
        return user.getOrganizations();
    }

    async createOrganization(name, description) {
        return Organization.create({ name, description });
    }

    async updateOrganization(organization, name, description) {
        organization.name = name;
        organization.description = description;
        return organization.save();
    }

}

// User.belongsToMany(Organization, { through: 'UserOrganizations' });
// Organization.belongsToMany(User, { through: 'UserOrganizations' });

module.exports = { Organization, OrganizationRepository };
