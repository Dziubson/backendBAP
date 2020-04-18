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

//import {IN,OUT,CHAR,INT} from 'idb-connector'
//const {IN, OUT, CHAR, INT} = require('idb-connector');
var db = require('../controllers/db');

var CustomersSchema = function CustomersSchema(customer) {
  this.id = customer.id;
  this.firstName = customer.firstName;
  this.lastName = customer.lastName;
  this.address = customer.address;
  this.product = customer.product;
  this.vatno = customer.vatno;
  this.card = customer.card;
};

CustomersSchema.create = function (newCustomer, result) {
  var params = [[newCustomer.id, OUT, INT], [newCustomer.firstName, IN, CHAR], [newCustomer.lastName, IN, CHAR], [newCustomer.address, IN, CHAR], [newCustomer.product, IN, CHAR], [newCustomer.vatno, IN, CHAR], [newCustomer.card, IN, CHAR]];
  db.executecall('call DZIUP1.CRTACC(?, ?, ?, ?, ?, ?, ?)', params).then(function (res, err) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", _objectSpread({
      id: res.insertId
    }, newCustomer));
    result(null, _objectSpread({
      id: res.insertId
    }, newCustomer));
  });
};

CustomersSchema.findById = function (customerId, result) {
  db.execute('SELECT * FROM dziup1.CUSDB WHERE CUSTNO = ' + customerId).then(function (res, err) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    } // not found Customer with the id


    result({
      kind: "not_found"
    }, null);
  });
};

CustomersSchema.getAll = function (result) {
  db.execute('SELECT * FROM dziup1.CUSDB ').then(function (res, err) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

CustomersSchema.updateById = function (id, customer, result) {
  var params = [[id, IN, INT], [customer.firstName, IN, CHAR], [customer.lastName, IN, CHAR], [customer.address, IN, CHAR], [customer.product, IN, CHAR], [customer.vatno, IN, CHAR], [customer.card, IN, CHAR]];
  db.executecall('call DZIUP1.CRTACC(?, ?, ?, ?, ?, ?, ?)', params).then(function (res, err) {
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

    console.log("updated customer: ", _objectSpread({
      id: id
    }, customer));
    result(null, _objectSpread({
      id: id
    }, customer));
  });
};

CustomersSchema.remove = function (id, result) {
  db.execute('DELETE FROM dziup1.CUSDB WHERE id = ' + id).then(function (res, err) {
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

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

CustomersSchema.removeAll = function (result) {
  db.execute('DELETE FROM dziup1.CUSDB ').then(function (res, err) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deleted ".concat(res, " customers"));
    result(null, res);
  });
};

module.exports = CustomersSchema;