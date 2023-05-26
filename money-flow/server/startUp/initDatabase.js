const Bill = require("../models/Bill");
const Category = require("../models/Category");

const billsMock = require("../mock/bills.json");
const categoriesMock = require("../mock/categories.json");

module.exports = async () => {
  const bills = await Bill.find();
  if (bills.length !== billsMock.length) {
    await createItitalEntity(Bill, billsMock);
  }
  const categories = await Category.find();
  if (categories.length !== categoriesMock.length) {
    await createItitalEntity(Category, categoriesMock);
  }
};

const createItitalEntity = async (Model, data) => {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
};
