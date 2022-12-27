const response = require("../../helper/responses");
const dayjs = require('dayjs')
const max = 10000, min=100;
const email_regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+.)+([.])+[a-zA-Z0-9.-]{2,4}$/;
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const data = [
  { id: 1, name: "abd1", email: "abd1@std.izu.edu.tr", password: "Abd$0000", updated_at: "2022-12-27 21:51:14", created_at: "2022-12-27 21:51:14"},
  { id: 2, name: "abd2", email: "abd2@std.izu.edu.tr", password: "Abd$0000", updated_at: "2022-12-27 21:51:14", created_at: "2022-12-27 21:51:14"},
  { id: 3, name: "abd3", email: "abd3@std.izu.edu.tr", password: "Abd$0000", updated_at: "2022-12-27 21:51:14", created_at: "2022-12-27 21:51:14"},
  { id: 4, name: "abd4", email: "abd4@std.izu.edu.tr", password: "Abd$0000", updated_at: "2022-12-27 21:51:14", created_at: "2022-12-27 21:51:14"},
  { id: 5, name: "abd5", email: "abd5@std.izu.edu.tr", password: "Abd$0000", updated_at: "2022-12-27 21:51:14", created_at: "2022-12-27 21:51:14"},
];

const randomNum = () =>{
  return Math.floor(Math.random() * (max - min) + min)
}

const createUser = (req, res, next) => {
  
  const name = req.body.name;
  const password = req.body.password;
  const passwordConfirmation = req.body.password_confirmation;
  const email = req.body.email;

  const newId = () => {
    const num = randomNum();
    const durum = true;
    if (data.find((user) => user.id == num)){
      durum = false;
    }
    return (durum ? num : newId())
  }
  var timeNow = dayjs().format("YYYY-MM-DD HH:mm:ss");

  if (name?.length < 3)
    return response.failedWithMessage(res, "name is invaild !");
  
  if (data.find((user) => user.name == name)) 
    return response.failedWithMessage(res, "This name has been used before !");

  if (
    !String(email)
      .toLowerCase()
      .match(email_regex)
  )
    return response.failedWithMessage(res, "email is invaild !");

  if (data.find((user) => user.email == email)) 
    return response.failedWithMessage(res, "This email has been used before !");

  if (!password_regex.test(password))
    return response.failedWithMessage(res, "password is invaild !, (Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.)");

  if (password.localeCompare(passwordConfirmation))
    return response.failedWithMessage(
      res,
      "password  and  passwordConfirmation are not  matched !"
    );
  
  
  const newUser = {
    name,
    email,
    updated_at: timeNow,
    created_at: timeNow,
    id: newId()
  }
  data.push({...newUser, password});
  return response.success(res, "registered it !", newUser);
};
const FindUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (
    !String(email)
      .toLowerCase()
      .match(email_regex)
  )
    return response.failedWithMessage(res, "email is invaild !");

  if (!password_regex.test(password))
    return response.failedWithMessage(res, "password is invaild !");

  const userData = data.find((user) => user.email == email)
  if (!userData) {
    return response.failedWithMessage(res, "this email is not registered !");
  }
  if (userData.password !== password) {
    return response.failedWithMessage(res, "password entered incorrectly !");
  }

  return response.success(res, "logged in !", userData);

}
const getUserData = (req, res, next) => {
  return response.success(res, "you get data !", data[0]);
}
module.exports = {
  createUser,
  FindUser,
  getUserData,
};
