'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comments.belongsTo(models.User, {
        foreignKey: 'idUserComment',
      });
      Comments.belongsTo(models.Post, {
        foreignKey: 'postId',
      });
    }
  };
  Comments.init({
    postId: DataTypes.INTEGER,
    idUserComment: DataTypes.INTEGER,
    commentText: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};