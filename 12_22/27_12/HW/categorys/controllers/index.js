const response = require("../../helper/responses");
const dayjs = require('dayjs')
const max = 10000, min=100;

const data = [
  {id: 1, category: "Emlak", updated_at: "2022-12-27 21:51:14", created_at: "2022-12-27 21:51:14"},
  {id: 2, category: "Vasıta", updated_at: "2022-12-27 21:51:14", created_at: "2022-12-27 21:51:14"},
  {id: 3, category: "Yedek Parça, Aksesuar", updated_at: "2022-12-27 21:51:14", created_at: "2022-12-27 21:51:14"},
  {id: 4, category: "İkinci El ve Sıfır Alışveriş", updated_at: "2022-12-27 21:51:14", created_at: "2022-12-27 21:51:14"},
]
const randomNum = () =>{
  return Math.floor(Math.random() * (max - min) + min)
}

const getALlCategorys = (req, res) => {
  return response.success(res, "you get all categorys", data);
}

const createCategory = (req, res) => {
  const {category} = req.body;
  const newId = () => {
    const num = randomNum();
    const durum = true;
    if (data.find((category) => category.id == num)){
      durum = false;
    }
    return (durum ? num : newId())
  }
  var timeNow = dayjs().format("YYYY-MM-DD HH:mm:ss");
  
  if(data.find((catg) => catg.category == category)) {
    return response.failedWithMessage(res, "this category has been used before, please enter a new category.");
  }
  const newCategory = {
    category,
    updated_at: timeNow,
    created_at: timeNow,
    id: newId()
  }
  data.push(newCategory);
  return response.success(res, "registered it !", newCategory);
  
}

module.exports = {
  getALlCategorys,
  createCategory
}