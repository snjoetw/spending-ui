import Controller from '@ember/controller';
import moment from 'moment';
import {getOwner} from '@ember/application';
import {bind} from '@ember/runloop';
import {computed} from '@ember/object';

export default Controller.extend({
  transaction: null,
  categories: null,
  calendarDatum: null,

  doSaveTransaction: computed(function() {
    let self = this;
    return bind(this, function(transaction, isDirty) {
      if (isDirty) {
        self.persistTransaction(transaction);
      } else {
        self.transitionToRoute('spending');
      }
    });
  }),

  doDeleteTransaction: computed(function() {
    let self = this;
    return bind(this, function(transaction) {
      transaction.set('deleted', true);
      self.persistTransaction(transaction);
    });
  }),

  doCancelTransaction: computed(function() {
    let self = this;
    return bind(this, function(transaction, isDirty) {
      if (!isDirty) {
        self.transitionToRoute('spending');
        return;
      }

      if (confirm("This transaction was modified, are you sure you want to discard the change?")) {
        transaction.rollbackAttributes();
        self.transitionToRoute('spending');
      }
    });
  }),

  persistTransaction: function(transaction) {
    let self = this;
    transaction.save().then(function() {
      getOwner(self).lookup('route:spending').refresh();

      let transactionDate = moment(transaction.transactionDate),
        yearMonth = self.get('calendarDatum').moment;

      if (!yearMonth.isSame(transactionDate, 'month')) {
        self.transitionToRoute('spending', transactionDate.format('YYYY-M'));
      } else {
        self.transitionToRoute('spending');
      }
    });
  },

  actions: {},
});
