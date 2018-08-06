import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  transactionHolder: service('transaction-holder'),

  categories: null,
  importedTransactions: null,

  actions: {
    goToSpending: function() {
      this.transitionToRoute('/');
    },

    doCreateTransaction: function(importedTransaction) {
      let transaction = this.get('store').createRecord('transaction', {
        transactionDate: importedTransaction.transactionDate,
        transactionType: importedTransaction.transactionType,
        description: importedTransaction.description,
        amount: importedTransaction.amount,
        category: importedTransaction.category,
        account: importedTransaction.account,
        importedTransactionId: importedTransaction.importedTransactionId,
      });

      this.get('transactionHolder').hold(transaction);
      this.transitionToRoute('import-transactions.add-transaction', importedTransaction.importedTransactionId);
    },

    doDeleteTransaction: function(importedTransaction) {
      let self = this;
      importedTransaction.set('state', 'IGNORE');
      importedTransaction.save().then(function(saved) {
        self.store.push(self.store.normalize('imported-transaction', saved));
      });
    },

  }
});
