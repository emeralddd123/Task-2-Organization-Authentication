const orgSerializer = (org) => {
    return {
        orgId: org.orgId,
        name: org.name,
        description: org.description,
        // creatorId: org.creatorId,
    }
}

const orgListSerializer = (orgs) => {
    return orgs.map(org => orgSerializer(org));
};


module.exports = { orgSerializer, orgListSerializer }
