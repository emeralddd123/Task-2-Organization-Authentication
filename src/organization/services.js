const { OrganizationRepository } = require('./models');
const { orgSerializer} = require('./utils')
const organizationRepository = new OrganizationRepository();


async function createOrganization(organization, creatorId) {
    const { name, description } = organization;
    if (await organizationRepository.findByName(name)) {
        throw new Error('Organization already exists');
    }
    const newOrgdata = await organizationRepository.createOrganization(name, description, creatorId);
    return orgSerializer(newOrgdata)
}




module.exports = { createOrganization }