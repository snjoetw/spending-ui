import Route from '@ember/routing/route';
import CalendarDatum from '../objects/calendar-datum'
import {hash} from 'rsvp';
import moment from 'moment';

export default Route.extend({
  titleToken: function(model) {
    return model.moment.format('YYYY MMMM');
  },
  model(params) {
    let yearMonth = params.year_month.split('-');
    let ym = moment({
      'year': Number(yearMonth[0]),
      'month': Number(yearMonth[1]) - 1,
    }).local();
    return hash({
      moment: ym,
      transactions: this.get('store').query('transaction', {ym: ym.format('YYYY-MM')}),
      transactionSummaries: this.get('store').query('transaction-summary', {ym: ym.format('YYYY-MM')}),
      categories: this.get('store').findAll('category')
    });
  },
  setupController(controller, model) {
    let calendarDatum = CalendarDatum.create({
      moment: model.moment
    });

    controller.set('calendarDatum', calendarDatum);
    controller.set('categories', model.categories);
    controller.set('transactions', model.transactions);
    controller.set('transactionSummaries', model.transactionSummaries);
  },
});
