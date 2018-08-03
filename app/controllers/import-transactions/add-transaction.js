import Controller from '@ember/controller';
import {getOwner} from '@ember/application';
import {bind} from '@ember/runloop';
import {computed} from '@ember/object';

export default Controller.extend({
  transaction: null,
  categories: null,
  importedTransaction: null,

  doSaveTransaction: computed(function() {
    let self = this;
    return bind(this, function(transaction, isDirty) {
      transaction.save().then(function() {
        self.importedTransaction.set('state', 'IMPORTED');
        self.importedTransaction.save().then(function() {
          getOwner(self).lookup('route:import-transactions').refresh();
          self.transitionToRoute('import-transactions');
        });
      });
    });
  }),

  doCancelTransaction: computed(function() {
    let self = this;
    return bind(this, function(transaction, isDirty) {
      self.transitionToRoute('import-transactions');
    });
  }),

  actions: {},
});
