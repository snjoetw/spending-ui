import Route from '@ember/routing/route';
import {hash} from 'rsvp';
import {inject as service} from '@ember/service';
import Money from "../../objects/money";
import moment from 'moment';

export default Route.extend({
  transactionHolder: service('transaction-holder'),

  model(params) {
    let transaction = this.get('transactionHolder').pop();

    if (!transaction) {
      let now = moment();
      transaction = this.get('store').createRecord('transaction', {
        transactionDate: now.format('YYYY-MM-DD'),
        transactionType: 'DEBIT',
        amount: Money.create({
          currency: 'CAD',
        }),
      });
    }

    return hash({
      transaction: transaction,
      categories: this.get('store').findAll('category'),
      importedTransaction: this.get('store').findRecord('importedTransaction', params.imported_transaction_id),
    });
  },
  setupController(controller, model) {
    controller.set('categories', model.categories);
    controller.set('transaction', model.transaction);
    controller.set('importedTransaction', model.importedTransaction);
  },
});
