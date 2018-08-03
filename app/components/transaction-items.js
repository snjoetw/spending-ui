import Component from '@ember/component';
import {computed} from '@ember/object';
import moment from 'moment';

export default Component.extend({
  resizeTimer: null,

  init() {
    this._super(...arguments);
    $(window).on('resize', this.handleResize.bind(this)).trigger('resize');
  },
  handleResize() {
    let self = this;

    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(function() {
      let $items = self.$('.container-body-item'),
        itemCount = $items.length,
        itemHeight = $items.outerHeight(true),
        containerHeight = self.$().innerHeight(),
        offsetHeight = itemHeight / 4,
        hasMoreItems = (itemCount * itemHeight - offsetHeight) > containerHeight,
        $hasMoreItems = self.$('.more-items-text').detach(),
        numOfVisibleItems = Math.floor(containerHeight / itemHeight) - 1,
        hasMoreItemText = $hasMoreItems.data('text-template').replace('{0}', itemCount - numOfVisibleItems);

      self.$().toggleClass('has-more-item', hasMoreItems);
      $items.eq(numOfVisibleItems - 1).parents('a').after($hasMoreItems);
      $hasMoreItems.text(hasMoreItemText);
    }, 250);
  },

  transactionsInDate: computed('transactions', 'day.date', 'filterCategoryIds', function() {
    console.log('transactionsInDate 1');
    let transactions = this.get('transactions'),
      date = this.get('day.date'),
      filterCategoryIds = this.get('filterCategoryIds') || [];
    console.log('transactionsInDate 2');
    return transactions.filter(function(transaction) {
      if (!transaction || transaction.deleted) return false;

      let transactionDate = moment(transaction.transactionDate);
      if (!date.isSame(transactionDate, 'day')) {
        return false;
      }

      return !filterCategoryIds.length || filterCategoryIds.indexOf(transaction.get('category.categoryId')) >= 0;
    }).sort(function(a, b) {
      if (a.description < b.description) return -1;
      if (a.description > b.description) return 1;
      return 0;
    });
  })
});
