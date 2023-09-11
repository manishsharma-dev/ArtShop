const UserType = require("../models/userType");

const get_userType = (req, res) => {
  UserType.find()
    .sort({ createdAt: -1 })
    .then((response) => {
      res.send({ data: response, message: null, err: null });
    })
    .catch((err) => {
      res.status(500).send({ data: null, message: err.message, err: err });
    });
};

const post_userType = (req, res) => {
  const userType = new UserType(req.body);
  userType
    .save()
    .then((response) => {
      res.send({
        data: response,
        message: "User Type created successfully",
        err: null,
      });
    })
    .catch((err) => {
      res.status(500).send({ data: null, message: err.message, err: err });
    });
};

module.exports = {
  get_userType,
  post_userType
};
