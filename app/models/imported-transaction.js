import DS from 'ember-data';
import {computed} from '@ember/object';

export default DS.Model.extend({
  importedTransactionId: DS.attr('number'),
  category: DS.belongsTo('category'),
  sourceCategoryName: DS.attr('string'),
  transactionType: DS.attr('string'),
  transactionDate: DS.attr('string'),
  description: DS.attr('string'),
  account: DS.attr('string'),
  amount: DS.attr('money'),
  state: DS.attr('string'),
  importSource: DS.attr('string'),

  isImportable: computed('state', function() {
    return this.get('state') === 'PENDING';
  }),
});
