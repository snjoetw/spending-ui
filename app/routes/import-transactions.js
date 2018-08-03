import Route from '@ember/routing/route';
import {hash} from 'rsvp';

export default Route.extend({
  titleToken: function() {
    return 'Import Transactions';
  },

  model() {
    return hash({
      importedTransactions: this.get('store').findAll('imported-transaction'),
      categories: this.get('store').findAll('category')
    });
  },
  setupController(controller, model) {
    controller.set('categories', model.categories);
    controller.set('importedTransactions', model.importedTransactions);
  },
});
