const db = require('../config/db.config');


// Get all bills
exports.getAllBills = (req, res) => {
    const query = 'SELECT * FROM Bill';
    db.query(query, (err, results) => {
        if (err) {
            console.log(`Query: $${query} - cannot be run`);
            return res.status(500).send(err);
        }
        console.log(`Query: ${query} - successfully run`);
        res.status(200).json(results);
    });
};

// Get a bill by ID
exports.getBillById = (req, res) => {
    const billId = req.params.BillID;
    const query = 'SELECT * FROM Bill WHERE BillID = ?'
    db.query(query, [billId], (err, results) => {
        if (err) {
            console.log(`Query: ${query} - cannot be run`);
            return res.status(500).send(err);
        }
        console.log(`Query: ${query} - successfully run`);
        res.status(200).json(results[0]);
    });
};

// Create a new bill
exports.createBill = (req, res) => {
    const { UtilityID, IssueDate, AmountBilled, AmountConsumed, PaymentDeadline, PaymentDate } = req.body;
    const newBill = { UtilityID, IssueDate, AmountBilled, AmountConsumed, PaymentDeadline, PaymentDate };
    const query = 'INSERT INTO Bill SET ?';
    db.query(query, newBill, (err, results) => {
        if (err) {
            console.log(`Query: ${query} - cannot be run`);
            return res.status(500).send(err);
        }
        console.log(`Query: ${query} - successfully run`);
        res.status(201).json({ id: results.insertId, ...newBill });
    });
};

// Update an existing bill
exports.updateBill = (req, res) => {
    const BillID = req.params.BillID;
    const { UtilityID, IssueDate, AmountBilled, AmountConsumed, PaymentDeadline, PaymentDate } = req.body;
    const updatedBill = { UtilityID, IssueDate, AmountBilled, AmountConsumed, PaymentDeadline, PaymentDate };
    const query = 'UPDATE Bill SET ? WHERE BillID = ?';
    db.query(query, [updatedBill, BillID], (err, results) => {
            console.log(`Query: ${query} - cannot be run`);
        if (err) {
            console.log(`Query: ${query} - cannot be run`);
            return res.status(500).send(err);
        }
        console.log(`Query: ${query} - successfully run`);
        res.status(200).json({ BillID: BillID, ...updatedBill });
    });
};

// Delete a bill
exports.deleteBill = (req, res) => {
    const BillID = req.params.id;
    const query = 'DELETE FROM Bill WHERE BillID = ?';
    db.query(query, [BillID], (err, results) => {
        if (err) {
            console.log(`Query: ${query} - cannot be run`);
            return res.status(500).send(err);
        }
        console.log(`Query: ${query} - successfully run`);
        res.status(204).send();
    });
};

// Controller to get all utilities
exports.getAllUtilities = (req, res) => {
    const query = 'SELECT * FROM Utility';
    db.query(query, (err, results) => {
      if (err) {
        console.log(`Query: ${query} - cannot be run`);
        return res.status(500).send(err);
      }
      console.log(`Query: ${query} - successfully run`);
      res.status(200).json(results);
    });
  };
  
  // Controller to add a new utility
  exports.addUtility = (req, res) => {
    const { UtilityName } = req.body;
    console.log(UtilityName)
    const newUtility = { UtilityName };
    const query = 'INSERT INTO Utility SET ?';
    db.query(query, newUtility, (err, results) => {
      if (err) {
        console.log(`Query: ${query} - cannot be run`);
        return res.status(500).send(err);
      }
      console.log(`Query: ${query} - successfully run`);
      res.status(201).json({ id: results.insertId, ...newUtility});
    });
  };

