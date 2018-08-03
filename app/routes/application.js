import Route from '@ember/routing/route';
import {makeArray} from '@ember/array'

export default Route.extend({
  title: function(tokens) {
    tokens = makeArray(tokens);
    tokens.unshift('Spending');
    return tokens.reverse().join(' - ');
  }
});
