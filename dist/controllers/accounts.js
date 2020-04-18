"use strict";

var _customers = _interopRequireDefault(require("../models/customers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create and Save a new Customer
exports.createAccount = function (req, res) {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  } // Create a Customer


  var customer = new _customers["default"]({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    product: req.body.product,
    vatno: req.body.vatno,
    card: req.body.card
  }); // Save Customer in the database

  _customers["default"].create(customer, function (err, data) {
    if (err) res.status(500).send({
      message: err.message || "Some error occurred while creating the Customer."
    });else res.send(data);
  });
}; // Retrieve all Customers from the database.


exports.findAllAccount = function (req, res) {
  _customers["default"].getAll(function (err, data) {
    if (err) res.status(500).send({
      message: err.message || "Some error occurred while retrieving customers."
    });else res.send(data);
  });
}; // Find a single Customer with a customerId


exports.findOneAccount = function (req, res) {
  _customers["default"].findById(req.params.accountId, function (err, data) {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found Customer with id ".concat(req.params.accountId, ".")
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.accountId
        });
      }
    } else res.send(data);
  });
}; // Update a Customer identified by the customerId in the request


exports.updateAccount = function (req, res) {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  _customers["default"].updateById(req.params.accountId, new _customers["default"](req.body), function (err, data) {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found Customer with id ".concat(req.params.accountId, ".")
        });
      } else {
        res.status(500).send({
          message: "Error updating Customer with id " + req.params.accountId
        });
      }
    } else res.send(data);
  });
};
/*
// Delete a Customer with the specified customerId in the request
exports.deleteAccount = (req, res) => {
    AccountsSchema.remove(req.params.accountId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.accountId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.accountId
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};

// Delete all Customers from the database.
exports.deleteAllAccount = (req, res) => {
    AccountsSchema.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all customers."
            });
        else res.send({ message: `All Customers were deleted successfully!` });
    });
};

*/