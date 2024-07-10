const express = require('express')
const organizationService = require('./services')

const { validOrganizationCreation } = require('./middleware')
const { authenticate } = require('../user/middleware')

const orgRouter = express.Router()

orgRouter.use(authenticate)

orgRouter.post('/', validOrganizationCreation, async (req, res) => {
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

orgRouter.get('', async (req, res) => {
    try {
        const organizations = await organizationService.getOrganizations(req.user.id)

        res.status(200).json({
            status: 'success',
            message: "Organisations retrieved successfully",
            data: { organisations:organizations }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
})

orgRouter.get('/:id', async (req, res) => {
    try {
        const organization = await organizationService.getOrganization(req.params.id)

        res.status(200).json({
            status: 'success',
            message: "Organisation retrieved successfully",
            data: organization
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
})

orgRouter.post('/:id/users', async (req, res) => {
    try {
        const { userId } = req.body
        if (!userId) {
            throw new Error('userId is required')
        }
        const orgId = req.params.id
        const result = await organizationService.addUser(orgId, userId)
        return res.status(200).json({
            status: 'success',
            message: 'User added to organisation successfully',
            data: result
        })

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
})


module.exports = orgRouter
