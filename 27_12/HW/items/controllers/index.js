const response = require("../../helper/responses");
const dayjs = require("dayjs");
const max = 10000,
  min = 100;

const data = [
  {
    id: 1,
    name: "GÖKBEY SİTESİDEN SATILIK DAİRE",
    title: "YARI KAPALI OTOPARK VE ÇOCUK OYUN ALANLARI",
    price: "1500000",
    category_id: 1,
    updated_at: "2022-12-27 21:51:14",
    created_at: "2022-12-27 21:51:14",
  },
  {
    id: 2,
    name: "SATILIK İş Yeri",
    title:
      "Ata sanayi bölgesinde, işlek bir konumda çift cepheli 70 M² 0 yaşında WC ve lavabosu bulunan dükkanım satılıktır.",
    price: "2750000",
    category_id: 1,
    updated_at: "2022-12-27 21:51:14",
    created_at: "2022-12-27 21:51:14",
  },
  {
    id: 3,
    name: "SATILIK Müstakil Ev",
    title: "MÜSTAKİL LÜX VİLLA DENİZE YÜRÜME MESAFESİNDE OLUP ",
    price: "5000000",
    category_id: 1,
    updated_at: "2022-12-27 21:51:14",
    created_at: "2022-12-27 21:51:14",
  },
  {
    id: 4,
    name: "SATILIK Otomobil",
    title: "KAZASIZ - DEĞİŞENSİZ - BOYASIZ - OTOMATİK",
    price: "500000",
    category_id: 2,
    updated_at: "2022-12-27 21:51:14",
    created_at: "2022-12-27 21:51:14",
  },
  {
    id: 5,
    name: "SATILIK SUV Araç",
    title: "2018 MODEL FULL SERVİS BAKKMLI OLUP HATASIZ VE BOYASIZ BİR ARAÇTIR",
    price: "8500000",
    category_id: 2,
    updated_at: "2022-12-27 21:51:14",
    created_at: "2022-12-27 21:51:14",
  },
];
const randomNum = () => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getALlItems = (req, res) => {
  return response.success(res, "you get all items", data);
};

const getSingleItem = (req, res) => {
  const itemId = req.params.id;
  const item = data.find((item) => item.id == itemId);
  if (!item) return response.failedWithMessage(res, "item not found !");

  return response.success(res, "you get item !", item);
};

const getItemsByCategorye = (req, res) => {
  const categoryeId = req.params.id;
  const items = data.filter((item) => item.category_id == categoryeId);
  if (items.length <= 0)
    return response.failedWithMessage(
      res,
      "There is no item related to by category !"
    );

  return response.success(res, "you get item !", items);
};

const deleteItem = (req, res) => {
  const { id } = req.params;
  const index = data.findIndex((item) => item.id == id);
  if (index == -1) return response.failedWithMessage(res, "item not found !");

  data.splice(index, 1);
  return response.success(res, "item has been deleted !");
};

const createItem = (req, res) => {
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

const updateItem = (req, res) => {
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
  getALlItems,
  getSingleItem,
  getItemsByCategorye,
  deleteItem,
  createItem,
  updateItem,
};