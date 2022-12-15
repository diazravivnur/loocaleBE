const { Op } = require('sequelize');
const { Profiles, ProfileCommunities } = require('../../models');
const fs = require('fs');
const Boom = require('boom');
const validationHelper = require('../helpers/validationHelper');
require('dotenv').config();
const baseUrlFile = 'http://localhost:5000/';
const defaultProfilePicture = '1670037246598-istockphoto-522855255-612x612';

exports.postUserProfileData = async (request, res) => {
  try {
    const { error } = validationHelper.postUserProfileData(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }
    let image;
    if (request.files.profileImage == null) {
      image = defaultProfilePicture;
    } else {
      image = request.files.profileImage[0].filename;
    }

    const { province, city, connectId } = request.body;
    const userId = request.userId

    const createProfile = await Profiles.create({
      userId,
      avatar: baseUrlFile + image,
      province,
      city,
    });
    const response = await ProfileCommunities.create({
      profileId: createProfile.id,
      connectId,
    });
    res.status(200).send({
      statusCode: '200',
      status: 'success input data',
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};
