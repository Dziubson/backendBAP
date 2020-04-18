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

var AccountsSchema = function AccountsSchema(account) {
  this.id = account.id;
  this.firstName = account.firstName;
  this.lastName = account.lastName;
  this.address = account.address;
  this.product = account.product;
  this.vatno = account.vatno;
  this.card = account.card;
};

AccountsSchema.create = function (newAccount, result) {
  var params = [[newAccount.id, OUT, INT], [newAccount.firstName, IN, CHAR], [newAccount.lastName, IN, CHAR], [newAccount.address, IN, CHAR], [newAccount.product, IN, CHAR], [newAccount.vatno, IN, CHAR], [newAccount.card, IN, CHAR]];
  db.executecall('call DZIUP1.CRTACC(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params).then(function (res, err) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", _objectSpread({
      id: res.insertId
    }, newAccount));
    result(null, _objectSpread({
      id: res.insertId
    }, newAccount));
  });
};

AccountsSchema.findById = function (accountId, result) {
  db.execute('SELECT * FROM dziup1.CUSDB WHERE CUSTNO = ?', accountId).then(function (res, err) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found account: ", res[0]);
      result(null, res[0]);
      return;
    } // not found Customer with the id


    result({
      kind: "not_found"
    }, null);
  });
};

AccountsSchema.getAll = function (result) {
  db.execute('SELECT * FROM dziup1.CUSDB ').then(function (res, err) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("account: ", res);
    result(null, res);
  });
};

AccountsSchema.updateById = function (id, account, result) {
  var params = [[id, IN, INT], [account.firstName, IN, CHAR], [account.lastName, IN, CHAR], [account.address, IN, CHAR], [account.product, IN, CHAR], [account.vatno, IN, CHAR], [account.card, IN, CHAR]];
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

    console.log("updated account: ", _objectSpread({
      id: id
    }, account));
    result(null, _objectSpread({
      id: id
    }, account));
  });
};

AccountsSchema.remove = function (id, result) {
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

    console.log("deleted account with id: ", id);
    result(null, res);
  });
};

AccountsSchema.removeAll = function (result) {
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

module.exports = AccountsSchema;