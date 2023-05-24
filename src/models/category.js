"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        set(name) {
          this.setDataValue(
            "name",
            name.charAt(0).toUpperCase() + name.slice(1)
          );
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
