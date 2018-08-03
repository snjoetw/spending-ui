import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  beforeModel() {
    let now = moment(),
      yearMonth = now.year() + '-' + (now.month() + 1);
    this.transitionTo('spending', yearMonth);
  }
});
