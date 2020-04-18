
const {IN, OUT, CHAR, INT} = require('idb-connector');
const db = require('../controllers/db');




   const CustomersSchema = function(customer) {
        this.id = customer.id;
        this.firstName = customer.firstName;
        this.lastName = customer.lastName;
        this.address = customer.address;
        this.product = customer.product;
        this.vatno = customer.vatno;
        this.card = customer.card;
    };

CustomersSchema.create = (newCustomer, result) => {

    const params = [
        [newCustomer.firstName, IN, CHAR],
        [newCustomer.lastName, IN, CHAR],
        [newCustomer.address, IN, CHAR],
        [newCustomer.product, IN, CHAR],
        [newCustomer.vatno, IN, CHAR],
        [newCustomer.card, IN, CHAR ]
    ];
    db.executecall('call DZIUP1.CRTACC( ?, ?, ?, ?, ?, ?)', params)
        .then(function (res, err) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created customer: ", { id: res.insertId, ...newCustomer });
            result(null, { id: res.insertId, ...newCustomer });
        })
};

CustomersSchema.findById = (customerId, result) => {
    db.execute('SELECT * FROM dziup1.CUSDB WHERE CUSTNO = '+ customerId)
        .then(function (res, err) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found customer: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found Customer with the id
            result({ kind: "not_found" }, null);
        });

};

CustomersSchema.getAll = result => {
    db.execute('SELECT * FROM dziup1.CUSDB ')
        .then(function (res, err) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("customers: ", res);
            result(null, res);
        });

};

CustomersSchema.updateById = (id, customer, result) => {
    const params = [
        [id, IN, INT],
        [customer.firstName, IN, CHAR],
        [customer.lastName, IN, CHAR],
        [customer.address, IN, CHAR],
        [customer.product, IN, CHAR],
        [customer.vatno, IN, CHAR],
        [customer.card, IN, CHAR]
    ];
    db.executecall('call DZIUP1.CRTACC(?, ?, ?, ?, ?, ?, ?)', params)
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

            console.log("updated customer: ", { id: id, ...customer });
            result(null, { id: id, ...customer });
        })

};

CustomersSchema.remove = (id, result) => {
    db.execute('DELETE FROM dziup1.CUSDB WHERE id = '+ id)
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

            console.log("deleted customer with id: ", id);
            result(null, res);
        });

};

CustomersSchema.removeAll = result => {
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


module.exports = CustomersSchema;