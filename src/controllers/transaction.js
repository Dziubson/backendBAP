import TransactionSchema from '../models/transaction'

// Create and Save a new Customer
exports.createTransaction = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const transaction = new TransactionSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        product: req.body.product,
        vatno: req.body.vatno,
        card: req.body.card
    });

    // Save Customer in the database
    TransactionSchema.create(transaction, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        else res.send(data);
    });
};

// Retrieve all Customers from the database.
exports.findAllTransaction = (req, res) => {
    TransactionSchema.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// Find a single Customer with a customerId
exports.findOneTransaction = (req, res) => {
    TransactionSchema.findById(req.params.transactionID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.transactionID}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.transactionID
                });
            }
        } else res.send(data);
    });
};

// Update a Customer identified by the customerId in the request
exports.updateTransaction = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    TransactionSchema.updateById(
        req.params.transactionID,
        new TransactionSchema(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.transactionID}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.transactionID
                    });
                }
            } else res.send(data);
        }
    );
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





























