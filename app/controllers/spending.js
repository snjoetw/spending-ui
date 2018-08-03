import Controller from '@ember/controller';
import {computed} from '@ember/object';
import CategoryDatum from "../objects/category-datum";
import TransactionSummaryDatum from "../objects/transaction-summary-datum";
import moment from 'moment';
import Money from "../objects/money";
import {inject as service} from '@ember/service';
import {bind} from '@ember/runloop';

export default Controller.extend({
  transactionHolder: service('transaction-holder'),

  transactionItemsPopupDay: null,
  filterCategoryIds: null,

  isFilteringCategory: computed('filterCategoryIds', function() {
    let filterCategoryIds = this.get('filterCategoryIds') || [];
    return filterCategoryIds.length > 0;
  }),

  transactionSummaryData: computed('categories', 'transactionSummaries', function() {
    let summaryByTransactionType = {
        'DEBIT': createTransactionSummaryDatum('DEBIT'),
        'CREDIT': createTransactionSummaryDatum('CREDIT'),
      },
      categories = this.get('categories'),
      transactionSummaries = this.get('transactionSummaries');

    categories.sortBy('parentCategoryId').forEach((category) => {
      let summary = summaryByTransactionType[category.transactionType],
        categoryData = summary.get('categoryData');

      if (!category.parentCategoryId) {
        let data = createCategoryDatum(category, transactionSummaries);
        if (data) {
          categoryData.push(data);
        }
        return;
      }

      let parent = categoryData.find((c) => {
        return c.get('category.categoryId') === category.parentCategoryId;
      }), data = createCategoryDatum(category, transactionSummaries);
      if (data) {
        parent.children.push(data);
      }
    });

    transactionSummaries.forEach(s => {
      let summary = summaryByTransactionType[s.transactionType];
      summary.set('amounts', s.amounts.sortBy('currency'));
      summary.set('categoryData', summary.categoryData.sortBy('category.name'))
    });

    return [
      summaryByTransactionType['DEBIT'],
      summaryByTransactionType['CREDIT'],
    ];
  }),

  doFilterTransaction: computed(function() {
    let self = this;
    return bind(this, function(categoryIds) {
      self.set('filterCategoryIds', categoryIds);
    });
  }),

  actions: {
    nextMonth: function() {
      let m = this.get('calendarDatum').moment.clone().add(1, 'months');
      this.send('goToMonth', m.year(), m.month() + 1);
    },
    previousMonth: function() {
      let m = this.get('calendarDatum').moment.clone().subtract(1, 'months');
      this.send('goToMonth', m.year(), m.month() + 1);
    },
    goToToday: function() {
      let now = moment();
      this.send('goToMonth', now.year(), now.month() + 1);
    },
    goToMonth: function(year, month) {
      this.set('filterCategoryIds', []);
      this.transitionToRoute('spending', year + '-' + month);
    },
    addTransaction: function(date) {
      let transaction = this.get('store').createRecord('transaction', {
        transactionDate: date.format('YYYY-MM-DD'),
        transactionType: 'DEBIT',
        amount: Money.create({
          currency: 'CAD',
        }),
      });

      this.get('transactionHolder').hold(transaction);
      this.transitionToRoute('spending.add-transaction');
    },
    openTransactionItemsPopup: function(day) {
      this.set('transactionItemsPopupDay', day);
    },
    closeTransactionItemsPopup: function() {
      this.set('transactionItemsPopupDay', null);
    },
  },
});

function createCategoryDatum(category, transactionSummaries) {
  let summary = transactionSummaries.find(s => s.transactionType === category.transactionType),
    summaryItem = summary.get('summaryItems').find(i => i.categoryId === category.categoryId);

  if (summaryItem && summaryItem.amounts.length > 0) {
    return CategoryDatum.create({
      category: category,
      summary: summaryItem,
      children: [],
    });
  }

  return null;
}

function createTransactionSummaryDatum(transactionType) {
  return TransactionSummaryDatum.create({
    transactionType: transactionType,
    categoryData: [],
    amounts: []
  });
}
