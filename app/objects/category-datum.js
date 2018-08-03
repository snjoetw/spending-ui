import EmberObject, {computed} from '@ember/object';

export default EmberObject.extend({
  category: null,
  children: null,
  summary: null,

  sortedChildren: computed('children', function() {
    return this.get('children').sortBy('name');
  }),

  amounts: computed('summary.amounts', function() {
    return this.get('summary.amounts').sortBy('currency');
  }),

  childCategoryIds: computed('children', function() {
    return this.get('children').map(c => c.category.categoryId);
  }),

});
