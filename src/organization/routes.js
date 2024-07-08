const express = require('express')
const organizationService = require('./services')

const { validOrganizationCreation } = require('./middleware')
const { authenticate } = require('../user/middleware')

const orgRouter = express.Router()

orgRouter.post('/', authenticate, validOrganizationCreation, async (req, res) => {
    try {
        const newOrg = await organizationService.createOrganization(req.body, req.user.id)

        res.status(201).json({
            status: 'success',
            message: 'Organisation created successfully',
            data: newOrg
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
})

module.exports = orgRouter