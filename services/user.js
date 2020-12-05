const bcrypt = require("bcrypt");

const { user } = global.db;

module.exports = {
  getUserList() {
    return user.findAll();
  },

  addUser(userData) {
    const { username } = userData;
    return user
      .findOne({ where: { username } })
      .then((response) => {
        if (response) {
          const error = {
            status: 400,
            message: "User with same username exists",
          };
          return Promise.reject(error);
        }
        return bcrypt.hash(userData.password, 10).then((response) => {
          userData.password = response;
          return user.create(userData);
        });
      })
      .then(() => {
        return Promise.resolve({
          message: "User created",
        });
      });
  },
};
