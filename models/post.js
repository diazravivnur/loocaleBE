'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsToMany(models.Media, {
        through: 'PostMedia',
        as: 'medias',
        foreignKey: 'postId',
      });
      Post.hasMany(models.Comments, {
        foreignKey: 'postId',
      });
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Post.belongsToMany(models.Connect, {
        through: 'PostCategories',
        as: 'Categories',
        foreignKey: 'postId',
      });
      Post.hasMany(models.Likes, {
        foreignKey: 'postId',
      });
    }
  };
  Post.init({
    postText: DataTypes.STRING,
    location: DataTypes.STRING,
    location_detail: DataTypes.STRING,
    liked: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};