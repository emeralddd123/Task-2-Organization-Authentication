const { OrganizationRepository } = require('./models');

const organizationRepository = new OrganizationRepository();


async function createOrganization(organization) {
    if (await organizationRepository.findByName(organization.name)) {
        throw new Error('Organization already exists');
    }
    return organizationRepository.createOrganization(organization);
}

