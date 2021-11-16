'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    //association
    static associate(models) {
      models.Article.belongsTo(models.User, {
        foreignKey: { allowNull: false }
      });

      models.Article.hasMany(models.Comment, { 
        onDelete: 'cascade' 
      });

    }
  };
  Article.init({
    //ajout userId
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};