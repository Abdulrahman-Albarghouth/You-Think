const response = require("../../helper/responses");

const createUser = (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  const passwordConfirmation = req.body.password_confirmation;
  const email = req.body.email;
  const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (name?.length < 3)
    return response.failedWithMessage(res, "name is invaild !");
  if (
    !String(email)
      .toLowerCase()
      .match(
        /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+.)+([.])+[a-zA-Z0-9.-]{2,4}$/
      )
  )
    return response.failedWithMessage(res, "email is invaild !");

  if (!password_regex.test(password))
    return response.failedWithMessage(res, "password is invaild !");

  if (password.localeCompare(passwordConfirmation))
    return response.failedWithMessage(
      res,
      "password  and  passwordConfirmation are not  matched !"
    );

  return response.success(res, "registered it !");
};

module.exports = {
  createUser,
};
