import DS from 'ember-data';

export default DS.Model.extend({
  categoryId: DS.attr('number'),
  parentCategoryId: DS.attr('number'),
  transactionType: DS.attr('string'),
  name: DS.attr('string'),
  completeName: DS.attr('string'),
  deleted: DS.attr('boolean')
});
