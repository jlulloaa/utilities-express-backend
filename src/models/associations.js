import Customers from './customers.js';
import Utilities from './utilities.js';
import Providers from './providers.js';
import Meters from './meters.js';
import Bills from './bills.js';
import CustomerProviderUtility from './customerproviderutility.js';

// Associations
Utilities.hasMany(Providers, { foreignKey: 'UtilityID' });
Providers.belongsTo(Utilities, { foreignKey: 'UtilityID' });

Utilities.hasMany(Meters, { foreignKey: 'UtilityID' });
Meters.belongsTo(Utilities, { foreignKey: 'UtilityID' });

Customers.hasMany(CustomerProviderUtility, { foreignKey: 'CustomerID' });
CustomerProviderUtility.belongsTo(Customers, { foreignKey: 'CustomerID' });

Providers.hasMany(CustomerProviderUtility, { foreignKey: 'ProviderID' });
CustomerProviderUtility.belongsTo(Providers, { foreignKey: 'ProviderID' });

Utilities.hasMany(CustomerProviderUtility, { foreignKey: 'UtilityID' });
CustomerProviderUtility.belongsTo(Utilities, { foreignKey: 'UtilityID' });

Meters.hasMany(CustomerProviderUtility, { foreignKey: 'MeterID' });
CustomerProviderUtility.belongsTo(Meters, { foreignKey: 'MeterID' });

CustomerProviderUtility.hasMany(Bills, { foreignKey: 'CustomerProviderUtilityID' });
Bills.belongsTo(CustomerProviderUtility, { foreignKey: 'CustomerProviderUtilityID' });
