import DS from 'ember-data';

export default DS.Model.extend({
  transactionId: DS.attr('number'),
  category: DS.belongsTo('category'),
  transactionType: DS.attr('string'),
  description: DS.attr('string'),
  amount: DS.attr('money'),
  transactionDate: DS.attr('string'),
  notes: DS.attr('string'),
  deleted: DS.attr('boolean'),
  account: DS.attr('string'),
  importedTransactionId: DS.attr('number'),
});
