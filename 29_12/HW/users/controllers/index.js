const response = require("../../helper/responses");
const { json } = require("body-parser");
const data = require("../../db");

const email_regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+.)+([.])+[a-zA-Z0-9.-]{2,4}$/;
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const createUser = (req, res, next) => {
  
  const name = req.body.name;
  const password = req.body.password;
  const passwordConfirmation = req.body.password_confirmation;
  const email = req.body.email;
  

  if (name?.length < 3)
    return response.failedWithMessage(res, "name is invaild !");
  
  if (
    !String(email)
      .toLowerCase()
      .match(email_regex)
  )
    return response.failedWithMessage(res, "email is invaild !");

  if (!password_regex.test(password))
    return response.failedWithMessage(res, "password is invaild !, (Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.)");

  if (password.localeCompare(passwordConfirmation))
    return response.failedWithMessage(
      res,
      "password  and  passwordConfirmation are not  matched !"
    );
  
    data.query(
      `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`,
      (err, result) => {
        if (err) {
          return response.failedWithMessage(res, err.message);
        }
        return response.success(res, "your account has been created!");
      }
    );
};
const FindUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email && !password) 
    return response.failedWithMessage(res, "email and password cant be empty !");

  if (
    !String(email)
      .toLowerCase()
      .match(email_regex)
  )
    return response.failedWithMessage(res, "email is invaild !");

  if (!password_regex.test(password))
    return response.failedWithMessage(res, "password is invaild !");


  data.query(
    `SELECT * FROM users WHERE (email='${email}') AND (password='${password}')`,
    (err, result) => {
      if (err) 
        return response.failedWithMessage(res, "check from you account email or account username and password !", 201);
      
      if (result?.length > 0) {
        const token = {
          id: result[0]?.id,
          name: result[0]?.name,
          email: result[0]?.email
        }
        return response.token_success(res, "you are in !", token);
      }
      return response.failedWithMessage(res, "check from you account email or account username and password !", 401);
    }
  );

}


module.exports = {
  createUser,
  FindUser,
};

