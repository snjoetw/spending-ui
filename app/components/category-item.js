import Component from '@ember/component';
import {computed} from '@ember/object';

export default Component.extend({
  isExpanded: false,
  categoryDatum: null,
  filterCategoryIds: null,

  isFiltered: computed('filterCategoryIds', function() {
    let categoryId = this.get('categoryDatum.category.categoryId'),
      filterCategoryIds = this.get('filterCategoryIds') || [];
    return filterCategoryIds.indexOf(categoryId) >= 0;
  }),

  actions: {
    toggleNestedCategory: function() {
      let expanded = this.get('isExpanded');
      this.set('isExpanded', !expanded)
    },

    doFilterTransaction: function(categoryDatum) {
      let existing = (this.get('filterCategoryIds') || []).reduce((a, b) => a + b, 0),
        toFilter = [categoryDatum.category.categoryId].concat(categoryDatum.childCategoryIds),
        newSum = toFilter.reduce((a, b) => a + b, 0);

      if (existing === newSum) {
        this.set('filterCategoryIds', []);
        this.get('doFilterTransaction')([]);
      } else {
        this.set('filterCategoryIds', toFilter);
        this.get('doFilterTransaction')(toFilter);
      }
    },
  }
});
