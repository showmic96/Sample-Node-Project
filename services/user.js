const bcrypt = require("bcrypt");

const { user } = global.db;

module.exports = {
  getUserList: () => {
    return user.findAll();
  },

  addUser: (userData) => {
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

  getUser: async ({ username, password }) => {
    return user.findOne({
      where: {
        username
      }
    })
      .then(async (userData) => {
        if (!userData) {
          const error = {
            status: 404,
            message: 'User not found!'
          };

          return Promise.reject(error);
        }

        const comparedValue = await bcrypt.compare(password, userData.password);

        if (!comparedValue) {
          const error = {
            status: 400,
            message: 'Invalid username or password'
          };

          return Promise.reject(error);
        };

        return userData.get({ plain: true });
      });
  }
};
