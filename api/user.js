const _ = require('lodash');

const userService = require('../services/user');

module.exports = (app) => {
    app.get('/userList', (req, res) => {
        return userService.getUserList()
            .then((response) => {
                res.status(200)
                    .send(response);
            })
    });

    app.post('/addUser', (req, res) => {
        const addUserData = req.body;
        return userService.addUser(addUserData)
            .then((response) => {
                console.log(response);
                res.status(200)
                    .send(addUserData);
            })
            .catch((error) => {
                console.log(error);
                return res.status(error.status || 500)
                    .send(_.omit(error, 'status'));
            })
    });
}
