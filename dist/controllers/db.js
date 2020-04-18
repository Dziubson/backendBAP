"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var db2i = require('idb-connector');

module.exports = {
  execute: execute,
  executecall: executecall
};

function execute(_x) {
  return _execute.apply(this, arguments);
}

function _execute() {
  _execute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var dbconn = new db2i.dbconn(); // Create a connection object.

              dbconn.conn('*LOCAL'); // Connect to a database.

              var stm = new db2i.dbstmt(dbconn); // Create a statement object of the connection.

              var sql = query;
              stm.exec(sql, function (result, error) {
                if (error) {
                  console.log("Result Set: ".concat(JSON.stringify(error)));
                  throw error;
                  reject(error);
                }

                console.log("Result Set: ".concat(JSON.stringify(result)));
                resolve(result);
                stm.close(); // Clean up the statement object.

                dbconn.disconn(); // Disconnect from the database.

                dbconn.close(); // Clean up the connection object.
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _execute.apply(this, arguments);
}

function executecall(_x2, _x3) {
  return _executecall.apply(this, arguments);
}

function _executecall() {
  _executecall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query, params) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              var dbconn = new db2i.dbconn(); // Create a connection object.

              dbconn.conn('*LOCAL'); // Connect to a database.

              var stm = new db2i.dbstmt(dbconn);
              var sql = query;
              stm.prepare(sql, function (error) {
                if (error) {
                  reject(error);
                }

                stm.bindParam(params, function (error) {
                  if (error) {
                    reject(error);
                  }

                  stm.exec(sql, function (out, error) {
                    if (error) {
                      reject(error);
                    }

                    resolve(out);
                    stm.close(); // Clean up the statement object.

                    dbconn.disconn(); // Disconnect from the database.

                    dbconn.close(); // Clean up the connection object.
                  });
                });
              });
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _executecall.apply(this, arguments);
}