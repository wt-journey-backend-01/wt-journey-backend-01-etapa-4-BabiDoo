const express = require ('express');
const controller = require('../controllers/authController');
const authRouter = express.Router();



authRouter.post('/register', controller.createUser);
authRouter.post('/login', controller.logUser);
// authRouter.delete('/users/:id', controller.deleteUser);
authRouter.post('/refresh', controller.refreshToken);
authRouter.post('/logout', controller.logout);


module.exports = authRouter