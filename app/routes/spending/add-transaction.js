import Route from '@ember/routing/route';
import {hash} from 'rsvp';
import CalendarDatum from '../../objects/calendar-datum'
import {inject as service} from '@ember/service';
import Money from "../../objects/money";
import moment from 'moment';

export default Route.extend({
  transactionHolder: service('transaction-holder'),

  model() {
    let yearMonth = this.paramsFor('spending').year_month.split('-'),
      transaction = this.get('transactionHolder').pop();

    if (!transaction) {
      let now = moment();
      transaction = this.get('store').createRecord('transaction', {
        transactionDate: now.format('YYYY-MM-DD'),
        transactionType: 'DEBIT',
        amount: Money.create({
          currency: 'CAD',
        }),
      });
    }

    return hash({
      transaction: transaction,
      categories: this.get('store').findAll('category'),
      calendarDatum: CalendarDatum.create({
        year: Number(yearMonth[0]),
        month: Number(yearMonth[1])
      }),
    });
  },
  setupController(controller, model) {
    controller.set('calendarDatum', model.calendarDatum);
    controller.set('categories', model.categories);
    controller.set('transaction', model.transaction);
  },
});
