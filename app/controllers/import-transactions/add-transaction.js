import Controller from '@ember/controller';
import {bind} from '@ember/runloop';
import {computed} from '@ember/object';

export default Controller.extend({
  transaction: null,
  categories: null,
  importedTransaction: null,

  doSaveTransaction: computed(function() {
    let self = this;
    return bind(this, function(transaction) {
      transaction.save().then(function() {
        self.importedTransaction.set('state', 'IMPORTED');
        self.importedTransaction.save().then(function(saved) {
          let store = self.store;
          store.push(store.normalize('imported-transaction', saved));
          self.transitionToRoute('import-transactions');
        });
      });
    });
  }),

  doCancelTransaction: computed(function() {
    let self = this;
    return bind(this, function() {
      self.transitionToRoute('import-transactions');
    });
  }),

  actions: {},
});
