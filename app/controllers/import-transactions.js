import Controller from '@ember/controller';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Controller.extend({
  transactionHolder: service('transaction-holder'),

  pendingTransactions: computed('importedTransactions', function() {
    return this.get('importedTransactions').filter(t => t.state === 'PENDING');
  }),

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
      importedTransaction.save().then(function() {
        self.set('importedTransactions', self.get('store').peekAll('importedTransactions'));
      });
    },

  }
});
