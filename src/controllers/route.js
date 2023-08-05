const express = require('express');
const router = express.Router();
const authController = require('./authController'); // Assurez-vous que le chemin est correct
const {RequireAuth} = require('./authController')
router.post('/signup', (req, res) => {
  authController.signup_post(req, res);
});

router.post('/login', (req, res) => {
  authController.login_post(req, res);
});
router.get('/signup', (req, res) => {
  authController.signup_get(req, res);
});
router.get('/login', (req, res) => {
  authController.login_get(req, res);
});

router.get('/logout', (req, res) => {
  authController.logout_get(req, res);
});
router.get('/products', authController.RequireAuth, (req, res) => {
  authController.products_get(req, res);
});
module.exports = router;
