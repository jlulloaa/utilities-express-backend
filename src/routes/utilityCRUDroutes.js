import { Router } from 'express';
import { welcome } from '../controllers/welcome.js';
import * as utilityController from '../controllers/utilityController.js';

const utilityRouter = Router();

// Just the welcome message to test the API connection
 /** WELCOME
 * @swagger 
 * /api:
 *  get: 
 *      summary: (callback function is dal.welcome(req, res))
 *      tags:
 *          - welcome
 *      description: Simple "Welcome message" to test the endpoint is up and running
 *      basePath: routes/routes.js
 *      produces:
 *          - application/json
 *      responses:
 *          '200':
 *              description: OK
 *  
 */
 utilityRouter.get('/',welcome);
 
 // Utility routes (Sequelize)
 utilityRouter.get('/:tableName', utilityController.getRecords);
 utilityRouter.post('/:tableName', utilityController.createBill);


// // Create a new record in a table
// utilityRouter.post('/bills', utilityController.createRecord('Bills'));
// utilityRouter.post('/utilities', utilityController.createRecord('Utilities'));
// utilityRouter.post('/customers', utilityController.createRecord('Customers'));
// utilityRouter.post('/meters', utilityController.createRecord('Meters'));
// utilityRouter.post('/providers', utilityController.createRecord('Providers'));
// utilityRouter.post('/customer_provider_utility', utilityController.createRecord('CustomerProviderUtility'));

// // Retrieve (Fetch) all record for a specific table:
// utilityRouter.get('/bills', utilityController.getAllRecords('Bills'));
// utilityRouter.get('/utilities', utilityController.getAllRecords('Utilities'));
// utilityRouter.get('/customers', utilityController.getAllRecords('Customers'));
// utilityRouter.get('/meters', utilityController.getAllRecords('Meters'));
// utilityRouter.get('/providers', utilityController.getAllRecords('Providers'));
// utilityRouter.get('/customer_provider_utility', utilityController.getAllRecords('CustomerProviderUtility'));

// // Retrieve (Fetch) record by ID for specific tables
// utilityRouter.get('/bills/:id', utilityController.getRecordById('Bills'));
// utilityRouter.get('/utilities/:id', utilityController.getRecordById('Utilities'));
// utilityRouter.get('/customers/:id', utilityController.getRecordById('Customers'));
// utilityRouter.get('/meters/:id', utilityController.getRecordById('Meters'));
// utilityRouter.get('/providers/:id', utilityController.getRecordById('Providers'));
// utilityRouter.get('/customer_provider_utility/:id', utilityController.getRecordById('CustomerProviderUtility'));

// // Update a record in table "tableName"
// // utilityRouter.put('/bills/:billid', utilityController.updateBill);
// utilityRouter.put('/bills/:id', utilityController.updateRecordById('Bills'));
// utilityRouter.put('/utilities/:id', utilityController.updateRecordById('Utilities'));
// utilityRouter.put('/customers/:id', utilityController.updateRecordById('Customers'));
// utilityRouter.put('/meters/:id', utilityController.updateRecordById('Meters'));
// utilityRouter.put('/providers/:id', utilityController.updateRecordById('Providers'));
// utilityRouter.put('/customer_provider_utility/:id', utilityController.updateRecordById('CustomerProviderUtility'));

// // Delete a record in table "tableName"
// // utilityRouter.delete('/bills/:billid', utilityController.deleteBill);
// utilityRouter.delete('/bills/:id', utilityController.deleteRecordById('Bills'));
// utilityRouter.delete('/utilities/:id', utilityController.deleteRecordById('Utilities'));
// utilityRouter.delete('/customers/:id', utilityController.deleteRecordById('Customers'));
// utilityRouter.delete('/meters/:id', utilityController.deleteRecordById('Meters'));
// utilityRouter.delete('/providers/:id', utilityController.deleteRecordById('Providers'));
// utilityRouter.delete('/customer_provider_utility/:id', utilityController.deleteRecordById('CustomerProviderUtility'));


export default utilityRouter;