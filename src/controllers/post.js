const { Op } = require('sequelize');
const { Post, User, Comments, Media, PostMedia, PostCategories, Connect, Likes } = require('../../models');
const fs = require('fs');
const Boom = require('boom');
const validationHelper = require('../helpers/validationHelper');
require('dotenv').config();
const baseUrlFile = 'http://localhost:5000/';
const defaultProfilePicture = '1670037246598-istockphoto-522855255-612x612';

exports.postText = async (request, res) => {
  const { error } = validationHelper.createPostTextValidation(request.body);
  if (error) {
    return res.status(400).send(Boom.badRequest(error.details[0].message));
  }
  try {
    const { postText, location, categories } = request.body;
    const userId = request.userId
    let tmpArr = []
    let tmpArr2 = []

    const postedMedia = await __postMediaToDB(request)
    const idPostedMedia = postedMedia.map(item=>(item.id))

    const createProfile = await Post.create({
      userId,
      postText,
      location,
      liked: 0
    });

    categories.reduce(async (result, item) => {
      let tmpData;
        tmpData = {connectId:item, postId: createProfile.id}
        tmpArr2.push(tmpData)
      return Promise.resolve(result);
      }, Promise.resolve([]));

    await PostCategories.bulkCreate(tmpArr2);

    idPostedMedia.reduce(async (result, item) => {
      let tmpData;
        tmpData = {mediaId:item, postId: createProfile.id}
        tmpArr.push(tmpData)
      return Promise.resolve(result);
      }, Promise.resolve([]));
    const response =  await PostMedia.bulkCreate(tmpArr);


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
          model: Connect,
          as : 'Categories',
          attributes : {
            exclude : ['createdAt', 'updatedAt']
          }
        },
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
            exclude : [ 'postId', 'updatedAt', ]
          }
        },
        {
          model: Media,
          as : 'medias',
          attributes : {
            exclude : ['createdAt', 'updatedAt', 'id']
          }
        },
        {
          model: Likes,
          attributes : {
            exclude : ['createdAt', 'updatedAt']
          }
        }
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
    const { postId  } = request.body;
    const userId = request.userId

    const checkUserAlreadyLikes = await Likes.findOne({
      where: {
        likedById: userId,
      },
    });
    let response 
    if ( checkUserAlreadyLikes ) {
      await Likes.destroy({
        where: {
          likedById: userId,
        },
      });
      res.status(200).send({
        statusCode: '200',
        status: 'success Unliked',
      });
    } else {
        await Likes.create({
        likedById: userId,
        postId : postId
      });
      res.status(200).send({
        statusCode: '200',
        status: 'success liked',
      });
    }

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
      return { media_url: baseUrlFile + "post-media/" + item.filename}
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