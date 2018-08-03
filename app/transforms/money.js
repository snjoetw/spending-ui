import DS from 'ember-data';
import {typeOf} from '@ember/utils';
import $ from 'jquery';
import Money from '../objects/money'

export default DS.Transform.extend({
  deserialize: function(value) {
    if (typeOf(value) === 'instance') {
      return value;
    } else if ($.isPlainObject(value)) {
      return Money.create({
        currency: value.currency,
        amount: value.amount,
      });
    } else {
      return null;
    }
  },
  serialize: function(value) {
    if (typeOf(value) === 'instance') {
      return {
        'currency': value.currency,
        'amount': value.amount,
      };
    } else {
      return null;
    }
  }
});
