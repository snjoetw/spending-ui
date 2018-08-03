import Component from '@ember/component';
import {computed, observer} from '@ember/object';
import moment from 'moment';
import {compare} from '@ember/utils';
import config from '../config/environment';

export default Component.extend({
  transactionTypes: config.APP.SUPPORTED_TRANSACTION_TYPES,
  currencies: config.APP.SUPPORTED_CURRENCIES,

  transaction: null,
  categories: null,
  originalSnapshot: null,
  doSaveTransaction: null,
  doDeleteTransaction: null,
  doCancelTransaction: null,

  init: function() {
    this._super(...arguments);

    this.set('originalSnapshot', this.createSnapshot(this.get('transaction')));
  },

  transactionTypeChanged: observer('transaction.transactionType', function() {
    let transaction = this.get('transaction');

    if (transaction.transactionType !== transaction.category.get('transactionType')) {
      transaction.set('category', null);
    }
  }),

  transactionDate: computed('transaction.transactionDate', function() {
    let d = moment(this.get('transaction.transactionDate'));
    return d.toDate();
  }),

  categoryOptions: computed('categories', 'transaction.transactionType', function() {
    let transactionType = this.get('transaction.transactionType'),
      options = [];
    this.get('categories').forEach(function(category) {
      if (category.deleted) {
        return;
      } else if (category.transactionType !== transactionType) {
        return;
      }
      options.push(category);
    });

    return options.sortBy('completeName');
  }),

  categoryValidation: [{
    message: 'Please select a category',
    validate: (selected) => {
      return selected.content !== null;
    }
  }],

  createSnapshot: function(transaction) {
    if (!transaction) return null;

    let currency = transaction.amount ? transaction.amount.currency : null,
      amount = transaction.amount ? transaction.amount.amount : null;

    return JSON.stringify([
      transaction.account,
      amount,
      transaction.get('category.categoryId'),
      currency,
      transaction.deleted,
      transaction.description,
      transaction.importedTransactionId,
      transaction.notes,
      transaction.transactionId,
      transaction.transactionDate,
      transaction.transactionType,
    ]);
  },

  actions: {
    updateTransactionDate: function(date) {
      if (!date) return;
      this.set('transaction.transactionDate', moment(date).format('YYYY-MM-DD'));
    },
    doCancelTransaction: function(transaction) {
      let snapshot = this.createSnapshot(this.get('transaction')),
        isDirty = compare(this.originalSnapshot, snapshot) !== 0;

      this.get('doCancelTransaction')(transaction, isDirty);
    },
    doSaveTransaction: function(transaction) {
      let snapshot = this.createSnapshot(this.get('transaction')),
        isDirty = compare(this.originalSnapshot, snapshot) !== 0;

      this.get('doSaveTransaction')(transaction, isDirty);
    },
    doDeleteTransaction: function(transaction) {
      this.get('doDeleteTransaction')(transaction);
    }
  },

});
