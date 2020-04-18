"use strict";

var _transaction = _interopRequireDefault(require("../models/transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create and Save a new Customer
exports.createTransaction = function (req, res) {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  } // Create a Customer


  var transaction = new _transaction["default"]({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    product: req.body.product,
    vatno: req.body.vatno,
    card: req.body.card
  }); // Save Customer in the database

  _transaction["default"].create(transaction, function (err, data) {
    if (err) res.status(500).send({
      message: err.message || "Some error occurred while creating the Customer."
    });else res.send(data);
  });
}; // Retrieve all Customers from the database.


exports.findAllTransaction = function (req, res) {
  _transaction["default"].getAll(function (err, data) {
    if (err) res.status(500).send({
      message: err.message || "Some error occurred while retrieving customers."
    });else res.send(data);
  });
}; // Find a single Customer with a customerId


exports.findOneTransaction = function (req, res) {
  _transaction["default"].findById(req.params.transactionID, function (err, data) {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found Customer with id ".concat(req.params.transactionID, ".")
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.transactionID
        });
      }
    } else res.send(data);
  });
}; // Update a Customer identified by the customerId in the request


exports.updateTransaction = function (req, res) {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  _transaction["default"].updateById(req.params.transactionID, new _transaction["default"](req.body), function (err, data) {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found Customer with id ".concat(req.params.transactionID, ".")
        });
      } else {
        res.status(500).send({
          message: "Error updating Customer with id " + req.params.transactionID
        });
      }
    } else res.send(data);
  });
};
/*
// Delete a Customer with the specified customerId in the request
exports.deleteTransaction = (req, res) => {
    TransactionSchema.remove(req.params.transactionID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.transactionID}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.transactionID
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};

// Delete all Customers from the database.
exports.deleteAllTransaction = (req, res) => {
    TransactionSchema.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all customers."
            });
        else res.send({ message: `All Customers were deleted successfully!` });
    });
};


*/