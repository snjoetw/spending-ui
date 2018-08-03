import DS from 'ember-data';

export default DS.Model.extend({
  transactionType: DS.attr('string'),
  summaryItems: DS.attr(),
  amounts: DS.attr(),
});
