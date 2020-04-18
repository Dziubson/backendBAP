"use strict";

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("./controllers/auth"));

var _users = _interopRequireDefault(require("./controllers/users"));

var _customers = _interopRequireDefault(require("./controllers/customers"));

var _accounts = _interopRequireDefault(require("./controllers/accounts"));

var _transaction = _interopRequireDefault(require("./controllers/transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router({
  mergeParams: true
});

router.post('/login', _auth["default"].loginUser);
router.post('/refresh', _auth["default"].refreshTokenVerify); // secure router
// customers post

router.post('/register_customer', _auth["default"].accessTokenVerify, _customers["default"].createCustomer); // account post

router.post('/register_account', _auth["default"].accessTokenVerify, _accounts["default"].createAccount); // transaction post

router.post('/register_transaction', _auth["default"].accessTokenVerify, _transaction["default"].createTransaction); // users post

router.post('/register', _auth["default"].accessTokenVerify, _auth["default"].createUser); // customers get

router.get('/customers', _auth["default"].accessTokenVerify, _customers["default"].findAllCustomer);
router.get('/customers/:customerId', _auth["default"].accessTokenVerify, _customers["default"].findOneCustomer); // customers put

router.put('/customers/:customerId', _auth["default"].accessTokenVerify, _customers["default"].updateCustomer); // customers delete

/*
router.delete('/customers/:customerId', authController.accessTokenVerify, customersController.deleteCustomer());
router.delete('/customers', authController.accessTokenVerify, customersController.deleteAllCustomer());
*/
// accounts get

router.get('/account', _auth["default"].accessTokenVerify, _accounts["default"].findAllAccount);
router.get('/account/:accountId', _auth["default"].accessTokenVerify, _accounts["default"].findOneAccount); // account put

router.put('/account/:accountId', _auth["default"].accessTokenVerify, _accounts["default"].updateAccount); // account delete

/*
router.delete('/account/:accountId', authController.accessTokenVerify, accountController.deleteAccount());
router.delete('/account', authController.accessTokenVerify, accountController.deleteAllAccount());
*/
// transaction get

router.get('/transaction', _auth["default"].accessTokenVerify, _transaction["default"].findAllTransaction);
router.get('/transaction/:transactionID', _auth["default"].accessTokenVerify, _transaction["default"].findOneTransaction); // transaction put

router.put('/transaction/:transactionID', _auth["default"].accessTokenVerify, _transaction["default"].updateTransaction); // transaction delete

/*
router.delete('/transaction/:transactionID', authController.accessTokenVerify, transactionController.deleteTransaction());
router.delete('/transaction', authController.accessTokenVerify, transactionController.deleteAllTransaction());
*/
// users get

router.get('/users', _auth["default"].accessTokenVerify, _users["default"].getUserList);
module.exports = router;