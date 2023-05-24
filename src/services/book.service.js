const { Op } = require("sequelize");
const db = require("../models");
const cloudinary = require("cloudinary").v2;


exports.getBooksService = async ({
  page,
  limit,
  order,
  title,
  available,
  ...query
}) => {
  try {
    const queries = { raw: true, nest: true };
    const offset = !page || +page <= 1 ? 0 : +page - 1;
    const fLimit = +limit || +process.env.LIMIT;
    queries.offset = +offset * +fLimit;
    queries.limit = +fLimit;

    order && (queries.order = [order]);

    if (title) {
      query.title = { [Op.substring]: title };
    }

    if (available) {
      query.available = { [Op.between]: available };
    }

    const response = await db.Book.findAndCountAll({
      where: query,
      ...queries,
      attributes: {
        exclude: ["categoryId", "description"],
      },
      include: [
        {
          model: db.Category,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          as: "categoryData",
        },
      ],
    });

    return {
      err: response ? 0 : 1,
      msg: response ? "Got" : "Can not found books",
      bookData: response,
    };
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

// CREATE
exports.createBookService = async (data, filename) => {
  try {
    console.log(data);
    const response = await db.Book.findOrCreate({
      where: { title: data?.title },
      defaults: data,
    });
    !response[1] && filename && cloudinary.uploader.destroy(filename);
    return {
      err: response[1] ? 0 : 1,
      msg: response[1] ? "Created" : "Sach da ton tai",
    };
  } catch (error) {
    throw error;
  }
};

// UPDATE
exports.updateBookService = async ({ id, ...data }, fileData) => {
  try {
    // console.log(data);
    if (fileData?.filename) body.image = fileData?.path;

    const response = await db.Book.update(data, {
      where: { id },
    });

    // console.log(response);

    !response[0] &&
      fileData?.filename &&
      cloudinary.uploader.destroy(fileData?.filename);
    return {
      err: response[0] ? 0 : 1,
      msg: `${response[0]} book updated`,
    };
  } catch (error) {
    throw error;
  }
};

// DELETE
exports.deleteBooksService = async ({ ids, fileName }) => {
  try {
    // console.log(data);
    // if (fileData?.filename) body.image = fileData?.path;

    const response = await db.Book.destroy({
      where: { id: ids },
    });

    if(response > 0){
      cloudinary.api.delete_resources(fileName)
    }
    return {
      err: response > 0 ? 0 : 1,
      msg: `${response} book deleted`,
    };
  } catch (error) {
    throw error;
  }
};
