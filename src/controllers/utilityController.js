import Utilities from '../models/utilities.js';
import Bills from '../models/bills.js';
import Providers from '../models/providers.js';
import Meters from '../models/meters.js';
import CustomerProviderUtility from '../models/customerproviderutility.js';
import Customers from '../models/customers.js';

const modelMapping = {
    utilities: Utilities,
    bills: Bills,
    providers: Providers,
    meters: Meters,
    customerproviderutility: CustomerProviderUtility,
    customers: Customers,
};

export const getRecords = async (req, res) => {
    const userId = req.user.uid;
    console.log('UserID: ' + userId);
    const customer = await Customers.findOne({ where: { firebaseUserId: userId } });
    if (customer) {
        res.json(customer);
        const tableName = req.params.tableName.toLowerCase();
        console.log('Table: '+tableName);
        const model = modelMapping[tableName];
    
        if (!model) {
            return res.status(400).send('Invalid table name');
        }

        const filters = req.query; // Capture the query parameters from the request

        try {
            const records = await model.findAll({ where: filters }); // Apply the filters to the query
            res.json(records);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }  else {
        res.status(404).send('Customer not found');
    }
    
};

export const createBill = async (req, res) => {
    console.log("New Record: " + req.body);
    try {
        const newBill = await Bills.create(req.body);
        res.status(201).json(newBill);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};


// // Centralized handler to get all records from table "tableName"
// export function getAllRecords(tableName) {
//     return (req, res) => {

//         // Construct the SQL query
//         const sql = `SELECT * FROM ${tableName}`;

//         // Execute the query
//         _query.query(sql, (err, results) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).send('Server error');
//             }
//             res.status(200).json(results);
//         });
//     };
// }

// // Centralized handler to get record by ID from table "tableName"
// export function getRecordById(tableName) {
//     return (req, res) => {
//         const { id } = req.params;

//         // Construct the SQL query
//         const sql = `SELECT * FROM ${tableName} WHERE id = ?`;

//         // Execute the query
//         _query.query(sql, [id], (err, results) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).send('Server error');
//             }

//             if (results.length === 0) {
//                 return res.status(404).send('Record not found');
//             }

//             res.json(results[0]);
//         });
//     };
// }


// // Controller to add a record in table "tableName"
// // requires a dictionary with the fields on each table that has to be added manually:
// const tableHeaders = {
//     "Customers": ["FirstName", "LastName", "StreetName", "StreetNumber", "Unit", "Town", "City", "State", "Country", "PostalCode"],
//     "Utilities": ["UtilityName", "UtilityUnits"],
//     "Providers": ["UtilityID", "ProviderName"],
//     "Meters": ["UtilityID", "SerialNro"],
//     "CustomerProviderUtility": ["CustomerID", "ProviderID", "UtilityID", "MeterID", "CustomerNumber"],
//     "Bills": ["CustomerProviderUtilityID", "IssueDate", "AmountBilled", "AmountConsumed", "PaymentDeadline", "PaymentDate", "Status", "StartPeriod", "EndPeriod" ],
// }

// export function createRecord(tableName) {
//     return (req, res) => {
//         console.log(tableName);
//         var sql = '';
//         var sql_values = '';
//         if (tableName === "Customers") {
//             const {FirstName, LastName, StreetName, StreetNumber, Unit, Town, City, State, Country, PostalCode} = req.body;
//             // Construct the SQL query
//             sql = `INSERT INTO ${tableName} (FirstName, LastName, StreetName, StreetNumber, Unit, Town, City, State, Country, PostalCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//             sql_values = [FirstName, LastName, StreetName, StreetNumber, Unit, Town, City, State, Country, PostalCode];

//         } else if (tableName === "Utilities") {
//             // Retrieve the values to add
//             const {UtilityName, UtilityUnits} = req.body;
//             // Construct the SQL query
//             sql = `INSERT INTO ${tableName} (UtilityName, UtilityUnits) VALUES (?, ?)`;
//             sql_values = [UtilityName, UtilityUnits];

//         } else if (tableName === "Providers") {
//             const {UtilityID, ProviderName} = req.body;
//             // Construct the SQL query
//             sql = `INSERT INTO ${tableName} (UtilityID, ProviderName) VALUES (?, ?)`;
//             sql_values = [UtilityID, ProviderName];

//         } else if (tableName === "Meters") {
//             const {UtilityID, SerialNro} = req.body;
//             // Construct the SQL query
//             sql = `INSERT INTO ${tableName} (UtilityID, SerialNro) VALUES (?, ?)`;
//             sql_values = [UtilityID, SerialNro];

//         } else if (tableName === "CustomerProviderUtility") {
//             const {CustomerID, ProviderID, UtilityID, MeterID, CustomerNumber} = req.body;
//             // Construct the SQL query
//             sql = `INSERT INTO ${tableName} (CustomerID, ProviderID, UtilityID, MeterID, CustomerNumber) VALUES (?, ?, ?, ?, ?)`;
//             sql_values = [CustomerID, ProviderID, UtilityID, MeterID, CustomerNumber];

//         } else if (tableName === "Bills") {
//             const { CustomerProviderUtilityID, IssueDate, AmountBilled, AmountConsumed, PaymentDeadline, PaymentDate, Status, StartPeriod, EndPeriod } = req.body;
//             // Construct the SQL query
//             sql = `INSERT INTO ${tableName} (CustomerProviderUtilityID, IssueDate, AmountBilled, AmountConsumed, PaymentDeadline, PaymentDate, Status, StartPeriod, EndPeriod) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//             sql_values = [CustomerProviderUtilityID, IssueDate, AmountBilled, AmountConsumed, PaymentDeadline, PaymentDate, Status, StartPeriod, EndPeriod];
//         }
//         _query.query(sql, sql_values, (err, results) => {
//             if (err) {
//                 return res.status(500).send(err);
//             }
//             res.status(201).json({ id: results.insertId, ...req.body });
//         });
//     };
// }
    
// // // Update a record in table "tableName"
// // export function updateRecord(tableName) {
// //     return (req, res) => {
// //         console.log(tableName);
// //         var sql = '';
// //         var sql_values = '';
// //         if (tableName === "Customers") {

// // Update an existing bill
// export function updateBill(req, res) {
//     const BillID = req.params.BillID;
//     const { UtilityID, IssueDate, AmountBilled, AmountConsumed, PaymentDeadline, PaymentDate } = req.body;
//     const updatedBill = { UtilityID, IssueDate, AmountBilled, AmountConsumed, PaymentDeadline, PaymentDate };
//     const query = 'UPDATE Bills SET ? WHERE BillID = ?';
//     _query.query(query, [updatedBill, BillID], (err, results) => {
//             console.log(`Query: ${query} - cannot be run`);
//         if (err) {
//             console.log(`Query: ${query} - cannot be run`);
//             return res.status(500).send(err);
//         }
//         console.log(`Query: ${query} - successfully run`);
//         res.status(200).json({ BillID: BillID, ...updatedBill });
//     });
// }

// // Delete a bill
// export function deleteBill(req, res) {
//     const BillID = req.params.id;
//     const query = 'DELETE FROM Bills WHERE BillID = ?';
//     _query.query(query, [BillID], (err, results) => {
//         if (err) {
//             console.log(`Query: ${query} - cannot be run`);
//             return res.status(500).send(err);
//         }
//         console.log(`Query: ${query} - successfully run`);
//         res.status(204).send();
//     });
// }

// // With StartPeriod and EndPeriod in place, you can calculate the cost per day as follows:
// const calculateProRata = (amountBilled, startPeriod, endPeriod) => {
//   const startDate = new Date(startPeriod);
//   const endDate = new Date(endPeriod);
//   const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
//   const costPerDay = amountBilled / days;
//   return costPerDay;
// };

// // Example usage:
// const amountBilled = 100.00;
// const startPeriod = '2024-06-01';
// const endPeriod = '2024-06-30';
// const costPerDay = calculateProRata(amountBilled, startPeriod, endPeriod);
// console.log(`Cost per day: $${costPerDay.toFixed(2)}`);