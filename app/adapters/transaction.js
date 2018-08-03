import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  namespace: config.APP.TRANSACTION_API_BASE_PATH,
  host: config.APP.SPENDING_API_HOST,
});
