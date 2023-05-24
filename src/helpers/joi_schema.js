const Joi = require("joi");

//Auth
exports.email = Joi.string().pattern(new RegExp("gmail.com$")).required();
exports.password = Joi.string().min(6).required();

// Book
exports.title = Joi.string().required();
exports.description = Joi.string();
exports.price = Joi.number().required();
exports.available = Joi.number().required();
exports.categoryId = Joi.number().required();
exports.id = Joi.number().required();
exports.ids = Joi.array().required();
exports.fileName = Joi.array();
exports.refreshToken = Joi.string();
