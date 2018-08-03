import Component from '@ember/component';
import {computed} from '@ember/object';
import moment from 'moment';

export default Component.extend({
  day: null,
  transactions: null,

  show: computed('day', function() {
    return this.get('day') !== null;
  }),

  popOriginId: computed('day', function() {
    let d = this.get('day');
    if (d === null) {
      return null;
    }

    return '#day-' + this.get('day').date.format('MM-DD');
  }),

  transactionsInDate: computed('transactions', 'day.date', function() {
    let transactions = this.get('transactions'),
      date = this.get('day.date');

    return transactions.filter(function(transaction) {
      if (!transaction || transaction.deleted) return false;

      let transactionDate = moment(transaction.transactionDate);
      return date.isSame(transactionDate, 'day');
    }).sort(function(a, b) {
      if (a.description < b.description) return -1;
      if (a.description > b.description) return 1;
      return 0;
    });
  }),

  actions: {
    close: function() {
      this.set('day', null);
    }
  }
});
