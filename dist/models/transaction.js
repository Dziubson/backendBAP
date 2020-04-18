"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('idb-connector'),
    IN = _require.IN,
    OUT = _require.OUT,
    CHAR = _require.CHAR,
    INT = _require.INT;

var db = require('../controllers/db');

var TransactionSchema = function TransactionSchema(transaction) {
  this.id = transaction.id;
  this.firstName = transaction.firstName;
  this.lastName = transaction.lastName;
  this.address = transaction.address;
  this.product = transaction.product;
  this.vatno = transaction.vatno;
  this.card = transaction.card;
};

TransactionSchema.create = function (newTransaction, result) {
  var params = [[newTransaction.id, OUT, INT], [newTransaction.firstName, IN, CHAR], [newTransaction.lastName, IN, CHAR], [newTransaction.address, IN, CHAR], [newTransaction.product, IN, CHAR], [newTransaction.vatno, IN, CHAR], [newTransaction.card, IN, CHAR]];
  db.executecall('call DZIUP1.CRTACC(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params).then(function (res, err) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", _objectSpread({
      id: res.insertId
    }, newTransaction));
    result(null, _objectSpread({
      id: res.insertId
    }, newTransaction));
  });
};

TransactionSchema.findById = function (transactionId, result) {
  db.execute('SELECT * FROM dziup1.CUSDB WHERE CUSTNO = ?', transactionId).then(function (res, err) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found transaction: ", res[0]);
      result(null, res[0]);
      return;
    } // not found Customer with the id


    result({
      kind: "not_found"
    }, null);
  });
};

TransactionSchema.getAll = function (result) {
  db.execute('SELECT * FROM dziup1.CUSDB ').then(function (res, err) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("transaction: ", res);
    result(null, res);
  });
};

TransactionSchema.updateById = function (id, transaction, result) {
  var params = [[id, IN, INT], [transaction.firstName, IN, CHAR], [transaction.lastName, IN, CHAR], [transaction.address, IN, CHAR], [transaction.product, IN, CHAR], [transaction.vatno, IN, CHAR], [transaction.card, IN, CHAR]];
  db.executecall('call DZIUP1.CRTACC(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params).then(function (res, err) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res === 0) {
      // not found Customer with the id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("updated transaction: ", _objectSpread({
      id: id
    }, transaction));
    result(null, _objectSpread({
      id: id
    }, transaction));
  });
};

TransactionSchema.remove = function (id, result) {
  db.execute('DELETE FROM dziup1.CUSDB WHERE id = ?', id).then(function (res, err) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res === 0) {
      // not found account with the id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("deleted transaction with id: ", id);
    result(null, res);
  });
};

TransactionSchema.removeAll = function (result) {
  db.execute('DELETE FROM dziup1.CUSDB ').then(function (res, err) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deleted ".concat(res, " transaction"));
    result(null, res);
  });
};

module.exports = TransactionSchema;