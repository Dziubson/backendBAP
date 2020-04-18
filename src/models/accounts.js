
const {IN, OUT, CHAR, INT,} = require('idb-connector');
const db = require('../controllers/db');

   const AccountsSchema = function(account) {
        this.id = account.id;
        this.firstName = account.firstName;
        this.lastName = account.lastName;
        this.address = account.address;
        this.product = account.product;
        this.vatno = account.vatno;
        this.card = account.card;
    };

AccountsSchema.create = (newAccount, result) => {

    const params = [
        [newAccount.id, OUT, INT],
        [newAccount.firstName, IN, CHAR],
        [newAccount.lastName, IN, CHAR],
        [newAccount.address, IN, CHAR],
        [newAccount.product, IN, CHAR],
        [newAccount.vatno, IN, CHAR],
        [newAccount.card, IN, CHAR ]
    ];
    db.executecall('call DZIUP1.CRTACC(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params)
        .then(function (res, err) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created customer: ", { id: res.insertId, ...newAccount });
            result(null, { id: res.insertId, ...newAccount });
        })
};

AccountsSchema.findById = (accountId, result) => {
    db.execute('SELECT * FROM dziup1.CUSDB WHERE CUSTNO = ?', accountId)
        .then(function (res, err) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found account: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found Customer with the id
            result({ kind: "not_found" }, null);
        });

};

AccountsSchema.getAll = result => {
    db.execute('SELECT * FROM dziup1.CUSDB ')
        .then(function (res, err) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("account: ", res);
            result(null, res);
        });

};

AccountsSchema.updateById = (id, account, result) => {
    const params = [
        [id, IN, INT],
        [account.firstName, IN, CHAR],
        [account.lastName, IN, CHAR],
        [account.address, IN, CHAR],
        [account.product, IN, CHAR],
        [account.vatno, IN, CHAR],
        [account.card, IN, CHAR]
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

            console.log("updated account: ", { id: id, ...account });
            result(null, { id: id, ...account });
        })

};

AccountsSchema.remove = (id, result) => {
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

            console.log("deleted account with id: ", id);
            result(null, res);
        });

};

AccountsSchema.removeAll = result => {
    db.execute('DELETE FROM dziup1.CUSDB ')
        .then(function (res, err) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res} customers`);
            result(null, res);
        });
};



module.exports = AccountsSchema;