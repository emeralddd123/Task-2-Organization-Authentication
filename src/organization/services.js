const { OrganizationRepository } = require('./models');
const { orgSerializer, orgListSerializer } = require('./utils')
const { UserRepository } = require('../user/models');

const organizationRepository = new OrganizationRepository();
const userRepository = new UserRepository();

async function createOrganization(organization, creatorId) {
    const { name, description } = organization;
    if (await organizationRepository.findByName(name)) {
        throw new Error('Organization already exists');
    }
    const newOrgdata = await organizationRepository.createOrganization(name, description, creatorId);
    return orgSerializer(newOrgdata)
}


async function getOrganizations(userId) {
    const organizations = await organizationRepository.getOrganizations(userId);
    console.log(organizations)
    return orgListSerializer(organizations)
}

async function getOrganization(orgId) {
    const organization = await organizationRepository.findById(orgId);
    return orgSerializer(organization)
}

async function addUser(orgId, userId) {
    const organization = await organizationRepository.findById(orgId);
    const user = await userRepository.findById(userId);
    await organizationRepository.addUser(organization, user);
    return orgSerializer(organization)
}

module.exports = { createOrganization, getOrganizations, getOrganization, addUser }