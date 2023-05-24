const db = require("../models");
const data = require("../../data/data.json");
exports.insertService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Insert category
      // const categories = Object.keys(data);
      // let response;
      // categories.forEach(async (item) => {
      //   response = await db.Category.create({
      //     name: item,
      //   });
      // });

      data.poetry.forEach(async (item) => {
        await db.Book.create({
          title: item.bookTitle,
          price: item.bookPrice,
          available: item.available,
          image: item.imageUrl,
          description: item.bookDescription,
          categoryId: 9,
        });
      });

      resolve("ok");
    } catch (error) {
      reject(error);
    }
  });
};
