const Joi = require("joi");
const {
  internalServerError,
  badRequest,
} = require("../middlewares/handleErrors");
const {
  getBooksService,
  createBookService,
  updateBookService,
  deleteBooksService,
} = require("../services/book.service");

const {
  id,
  ids,
  title,
  price,
  available,
  categoryId,
  fileName,
  description
} = require("../helpers/joi_schema");

const cloudinary = require("cloudinary").v2;

exports.getBooks = async (req, res) => {
  try {
    const response = await getBooksService(req.query);
    return res.status(200).json(response);
  } catch (error) {
    // console.log(error.message);
    return internalServerError(res);
  }
};

// CREATE
exports.createBook = async (req, res) => {
  try {
    const fileData = req.file;
    console.log(req.file);

    const { error } = Joi.object({
      title,
      price,
      available,
      categoryId,
      description
    }).validate(req.body);

    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return badRequest(error.message, res);
    }

    const response = await createBookService(
      {
        ...req.body,
        image: fileData?.path,
        fileName: fileData?.filename,
      },
      fileData
    );
    return res.status(200).json(response);
  } catch (error) {
    // console.log(error.message);
    return internalServerError(res);
  }
};

// UPDATE
exports.updateBook = async (req, res) => {
  try {
    const fileData = req.file;
    // console.log(req.file);

    const { error } = Joi.object({ id }).validate({ id: req.body.id });

    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return badRequest(error.message, res);
    }

    const response = await updateBookService(req.body, fileData);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    return internalServerError(res);
  }
};

// DELETE
exports.deleteBooks = async (req, res) => {
  try {
    const { error } = Joi.object({ ids, fileName }).validate(req.body);

    if (error) {
      return badRequest(error.message, res);
    }

    const response = await deleteBooksService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    return internalServerError(res);
  }
};
