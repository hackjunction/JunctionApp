const _ = require('lodash')
const { ObjectID } = require('mongodb')
const Promise = require('bluebird')
const mongoose = require('mongoose')
const yup = require('yup')
const Referral = require('./model')
const { NotFoundError, ForbiddenError } = require('../../common/errors/errors')

const controller = {}

controller.createReferral = async registrationId => {
    const referral = new Referral({
        registrationId: registrationId.toString(),
        score: 0,
        minted: '',
    })
    return referral.save()
}

controller.getReferralById = async regId => {
    return Referral.findOne({
        registrationId: regId,
    }).then(referral => {
        if (!referral) {
            throw new NotFoundError('Referral not found')
        }
        return referral
    })
}

controller.addScore = async regId => {
    return Referral.findOne({
        registrationId: regId,
    }).then(referral => {
        if (!referral) {
            throw new NotFoundError('Referral not found')
        }
        referral.score += 1
        referral.save()
    })
}

controller.addMint = async (regId, mintId) => {
    return Referral.findOne({
        registrationId: regId,
    }).then(referral => {
        if (!referral) {
            throw new NotFoundError('Referral not found')
        }
        referral.minted = mintId
        referral.save()
    })
}

module.exports = controller
