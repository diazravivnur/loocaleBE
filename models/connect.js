'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Connect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Connect.belongsToMany(models.Profiles, {
        through: 'ProfileCommunities',
        as: 'communities',
        foreignKey: 'connectId',
      });
      Connect.belongsToMany(models.Post, {
        through: 'PostCategories',
        as: 'Posts',
        foreignKey: 'connectId',
      });
    }
  }
  Connect.init(
    {
      background: DataTypes.STRING,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Connect',
    }
  );
  return Connect;
};
