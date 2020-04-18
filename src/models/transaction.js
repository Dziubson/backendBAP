
const {IN, OUT, CHAR, INT,} = require('idb-connector');
const db = require('../controllers/db');

   const TransactionSchema = function(transaction) {
        this.id = transaction.id;
        this.firstName = transaction.firstName;
        this.lastName = transaction.lastName;
        this.address = transaction.address;
        this.product = transaction.product;
        this.vatno = transaction.vatno;
        this.card = transaction.card;
    };

TransactionSchema.create = (newTransaction, result) => {

    const params = [
        [newTransaction.id, OUT, INT],
        [newTransaction.firstName, IN, CHAR],
        [newTransaction.lastName, IN, CHAR],
        [newTransaction.address, IN, CHAR],
        [newTransaction.product, IN, CHAR],
        [newTransaction.vatno, IN, CHAR],
        [newTransaction.card, IN, CHAR ]
    ];
    db.executecall('call DZIUP1.CRTACC(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params)
        .then(function (res, err) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created customer: ", { id: res.insertId, ...newTransaction });
            result(null, { id: res.insertId, ...newTransaction });
        })
};

TransactionSchema.findById = (transactionId, result) => {
    db.execute('SELECT * FROM dziup1.CUSDB WHERE CUSTNO = ?', transactionId)
        .then(function (res, err) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found transaction: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found Customer with the id
            result({ kind: "not_found" }, null);
        });

};

TransactionSchema.getAll = result => {
    db.execute('SELECT * FROM dziup1.CUSDB ')
        .then(function (res, err) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("transaction: ", res);
            result(null, res);
        });

};

TransactionSchema.updateById = (id, transaction, result) => {
    const params = [
        [id, IN, INT],
        [transaction.firstName, IN, CHAR],
        [transaction.lastName, IN, CHAR],
        [transaction.address, IN, CHAR],
        [transaction.product, IN, CHAR],
        [transaction.vatno, IN, CHAR],
        [transaction.card, IN, CHAR]
    ];
    db.executecall('call DZIUP1.CRTACC(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params)
        .then(function (res, err) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res === 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated transaction: ", { id: id, ...transaction });
            result(null, { id: id, ...transaction });
        })

};

TransactionSchema.remove = (id, result) => {
    db.execute('DELETE FROM dziup1.CUSDB WHERE id = ?', id)
        .then(function (res, err) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res === 0) {
                // not found account with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted transaction with id: ", id);
            result(null, res);
        });

};

TransactionSchema.removeAll = result => {
    db.execute('DELETE FROM dziup1.CUSDB ')
        .then(function (res, err) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res} transaction`);
            result(null, res);
        });
};


module.exports = TransactionSchema;