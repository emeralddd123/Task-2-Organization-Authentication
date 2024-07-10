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

User.belongsToMany(Organization, { through: 'UserOrganizations' });
Organization.belongsToMany(User, { through: 'UserOrganizations' });

Organization.belongsTo(User, { as: "creator", foreignKey: "creatorId" });
User.hasMany(Organization, {
    as: "createdOrganizations",
    foreignKey: "creatorId",
});

class OrganizationRepository {
    async addUser(organization, user) {
        return organization.addUser(user);
    }

    async createOrganization(name, description, creatorId) {
        const user = await User.findByPk(creatorId);
        const org = await Organization.create({ name, description, creatorId: user.userId });
        await user.addOrganization(org);
        return org;

    }

    async findByName(name) {
        return Organization.findOne({ where: { name } });
    }

    async findById(id) {
        return Organization.findByPk(id);
    }

    async getUsers(organization) {
        return organization.getUsers();
    }

    async getOrganizations(userId) {
        // const organizations = 
        const user = await User.findByPk(userId, {
            include: [
              {
                association: User.associations.organizations,
                through: { attributes: [] }
              }
            ]
          });
          console.log(user)
        const organizations = user.organizations
        return organizations;
    }

    async getFellowOrganizationMembers(user, organization) {
        return user.getOrganizations({ where: { orgId: organization.orgId } });
    }



    }



module.exports = { Organization, OrganizationRepository };
