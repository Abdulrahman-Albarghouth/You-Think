const responseMessage = require("./responseMessage");

const serverError = (res) => {
  return res.status(500).send(responseMessage.errorResponse("sever Error !"));
};

const success = (res, msg, data = []) => {
  return res.status(200).send(responseMessage.successResponse(msg, data));
};

const token_success = (res, msg, token = {}, data = []) => {
  return res.status(200).send(responseMessage.successResponse(msg, data, {token}));
};

const failedWithMessage = (res, msg, err = 200) => {
  return res.status(err).send(responseMessage.errorResponse(msg));
};



module.exports = {
  serverError,
  success,
  failedWithMessage,
  token_success
};