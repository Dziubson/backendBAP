
import express from 'express'
import authController from './controllers/auth'
import usersController from './controllers/users'
import customersController from './controllers/customers'
import accountController from './controllers/accounts'
import transactionController from './controllers/transaction'


const router = express.Router({mergeParams: true});

router.post('/login', authController.loginUser);
router.post('/refresh', authController.refreshTokenVerify);

// secure router
// customers post
router.post('/register_customer', authController.accessTokenVerify, customersController.createCustomer);
// account post
router.post('/register_account', authController.accessTokenVerify, accountController.createAccount);
// transaction post
router.post('/register_transaction', authController.accessTokenVerify, transactionController.createTransaction);
// users post
router.post('/register', authController.accessTokenVerify, authController.createUser);




// customers get
router.get('/customers', authController.accessTokenVerify, customersController.findAllCustomer);
router.get('/customers/:customerId', authController.accessTokenVerify, customersController.findOneCustomer);
// customers put
router.put('/customers/:customerId', authController.accessTokenVerify, customersController.updateCustomer);
// customers delete
/*
router.delete('/customers/:customerId', authController.accessTokenVerify, customersController.deleteCustomer());
router.delete('/customers', authController.accessTokenVerify, customersController.deleteAllCustomer());
*/



// accounts get
router.get('/account', authController.accessTokenVerify, accountController.findAllAccount);
router.get('/account/:accountId', authController.accessTokenVerify, accountController.findOneAccount);
// account put
router.put('/account/:accountId', authController.accessTokenVerify, accountController.updateAccount);
// account delete
/*
router.delete('/account/:accountId', authController.accessTokenVerify, accountController.deleteAccount());
router.delete('/account', authController.accessTokenVerify, accountController.deleteAllAccount());
*/



// transaction get
router.get('/transaction', authController.accessTokenVerify, transactionController.findAllTransaction);
router.get('/transaction/:transactionID', authController.accessTokenVerify, transactionController.findOneTransaction);
// transaction put
router.put('/transaction/:transactionID', authController.accessTokenVerify, transactionController.updateTransaction);
// transaction delete
/*
router.delete('/transaction/:transactionID', authController.accessTokenVerify, transactionController.deleteTransaction());
router.delete('/transaction', authController.accessTokenVerify, transactionController.deleteAllTransaction());
*/



// users get
router.get('/users', authController.accessTokenVerify, usersController.getUserList);






module.exports = router;