import Component from '@ember/component';
import Money from "../objects/money";
import {computed} from '@ember/object';

export default Component.extend({
  summary: null,
  isFilteringByCategory: false,

  totalAmounts: computed('summary.amounts', function() {
    let amounts = this.get('summary.amounts').sortBy('currency');
    return amounts && amounts.length ? amounts : NO_AMOUNTS;
  }),

  actions: {}
});

let NO_AMOUNTS = [Money.create({
  currency: 'NONE',
  amount: 0
})];
