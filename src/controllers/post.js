const { Op } = require('sequelize');
const { Post, User, Comments, Media, PostMedia } = require('../../models');
const fs = require('fs');
const Boom = require('boom');
const validationHelper = require('../helpers/validationHelper');
require('dotenv').config();
const baseUrlFile = 'http://localhost:5000/';
const defaultProfilePicture = '1670037246598-istockphoto-522855255-612x612';

exports.postText = async (request, res) => {
  try {
    const { error } = validationHelper.createPostTextValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }

    const { postText, location } = request.body;
    const userId = request.userId

    const postedMedia = await __postMediaToDB(request)
    const idPostedMedia = postedMedia.map(item=>(item.id))

    const createProfile = await Post.create({
      userId,
      postText,
      location,
      liked: 0
    });
    const idPostedPost = createProfile.id
    const dataPostedToMediaProduct = [ 
      {
        "postId" : idPostedPost,
        "mediaId" : idPostedMedia[0]
      },
      {
        "postId" : idPostedPost,
        "mediaId" : idPostedMedia[1]
      }
    ]

    const response = await PostMedia.bulkCreate(dataPostedToMediaProduct);


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

exports.getAllPosts = async (request, res) => {
  try {
    const { postText, location } = request.body;
    const userId = request.userId

    const getPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes : {
            exclude : ['createdAt', 'updatedAt', 'isActive', 'OTP', 'password', 'id']
          }
        },
        {
          model: Comments,
          include: [
            {
              model: User,
              attributes : {
                exclude : ['createdAt', 'updatedAt', 'isActive', 'OTP', 'password', 'id']
              }
            },
          ],
          attributes : {
            exclude : ['createdAt', 'updatedAt', 'idUserComment', 'postId', 'id']
          }
        },
        {
          model: Media,
          as : 'medias',
          attributes : {
            exclude : ['createdAt', 'updatedAt', 'id']
          }
        },
      ],
    });

    res.status(200).send({
      statusCode: '200',
      status: 'success input data',
      data: getPosts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.likePost = async (request, res) => {
  try {
    const { error } = validationHelper.likePostValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }
    const { postId } = request.body;
    console.log(postId)
    const a = await Post.increment('liked', {
      by: 1, 
      where: {
        id: postId,
      },
     }
    );
console.log(a)
    res.status(200).send({
      statusCode: '200',
      status: 'success liked',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

const __postMediaToDB = async (request) => {
  try {
    const media = request.files.media_files;
    const arr = media.map((item) => {
      return { media_url: item.filename}
    });
    // add to db
    const inputData = await Media.bulkCreate(arr, 
    {
        fields:["media_url"] 
    } );
  return inputData
  } catch (error) {
    console.log(error)
  }
};