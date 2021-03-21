const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');

const userService = require('../services/user');

module.exports = (app) => {
    app.get('/list-user', (req, res) => {
        return userService.getUserList()
            .then((response) => {
                res.status(200)
                    .send(response);
            })
            .catch((error) => {
                res.status(error.status || 500)
                    .send(_.omit(error, 'status'));
            });
    });

    app.post('/add-user', (req, res) => {
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
            });
    });

    app.post('/login', (req, res) => {
        const { username, password } = req.body;

        return userService.getUser({ username, password })
            .then((response) => {
                const { username, password } = response;

                const secretKey = config.jwt.secretKey;

                const jwtToken = jwt.sign({ username, password }, secretKey, {
                    expiresIn: '1h'
                });

                res.cookie('token', jwtToken, {
                    maxAge: 1 * 60 * 60 * 1000,
                    httpOnly: true
                });

                res.status(200)
                    .send({ message: 'Login Successful' });
            })
            .catch((error) => {
                console.log(error);
                return res.status(error.status || 500)
                    .send(_.omit(error, 'status'));
            });
    });
}
