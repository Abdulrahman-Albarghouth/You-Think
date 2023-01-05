const response = require("../../helper/responses");
const data = require("../../db");

const getALlPosts = (req, res) => {
  data.query(
    `SELECT * FROM posts`,
    (err, result) => {
      if (err) {
        return response.failedWithMessage(res, err.message);
      }
      return response.success(res, "you get all items", result);
    }
    );
};

const getSinglePost = (req, res) => {
  const itemId = req.params.id;
  const item = data.find((item) => item.id == itemId);
  if (!item) return response.failedWithMessage(res, "item not found !");

  return response.success(res, "you get item !", item);
};

const getPostsByTag = (req, res) => {
  const categoryeId = req.params.id;
  const items = data.filter((item) => item.category_id == categoryeId);
  if (items.length <= 0)
    return response.failedWithMessage(
      res,
      "There is no item related to by category !"
    );

  return response.success(res, "you get item !", items);
};

const deletePost = (req, res) => {
  const { id } = req.params;
  const index = data.findIndex((item) => item.id == id);
  if (index == -1) return response.failedWithMessage(res, "item not found !");

  data.splice(index, 1);
  return response.success(res, "item has been deleted !");
};

const createPost = (req, res) => {
  const { name, title, price, category_id } = req.body;
  const newId = () => {
    const num = randomNum();
    const durum = true;
    if (data.find((category) => category.id == num)) {
      durum = false;
    }
    return durum ? num : newId();
  };
  var timeNow = dayjs().format("YYYY-MM-DD HH:mm:ss");

  if (name.length < 10)
    return response.failedWithMessage(
      res,
      "The number of name characters must be at least 10 !"
    );
  if (title.length < 25)
    return response.failedWithMessage(
      res,
      "The number of name characters must be at least 25 !"
    );

  const newItem = {
    id: newId(),
    name,
    title,
    price,
    category_id,
    updated_at: timeNow,
    created_at: timeNow,
  };
  data.push(newItem);
  return response.success(res, "registered it !", newItem);
};

const updatePost = (req, res) => {
  const { id } = req.params;
  const { name, title, price, category_id } = req.body;
  var item = data.find((item) => item.id == id);
  var index = data.findIndex((item) => item.id == id);

  var timeNow = dayjs().format("YYYY-MM-DD HH:mm:ss");

  if (item) {
    if (name.length < 10)
      return response.failedWithMessage(
        res,
        "The number of name characters must be at least 10 !"
      );
    if (title.length < 25)
      return response.failedWithMessage(
        res,
        "The number of name characters must be at least 25 !"
      );
    data[index] = {
      ...item,
      name,
      title,
      price,
      category_id,
      updated_at: timeNow,
    };
    return response.success(res, "registered it !", item);
  }
  return response.failedWithMessage(res, "Item net found !");
};

module.exports = {
  getALlPosts,
  getSinglePost,
  getPostsByTag,
  deletePost,
  createPost,
  updatePost,
};