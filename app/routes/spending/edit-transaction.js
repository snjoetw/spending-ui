import Route from '@ember/routing/route';
import {hash} from 'rsvp';
import CalendarDatum from '../../objects/calendar-datum'

export default Route.extend({
  model(params) {
    let yearMonth = this.paramsFor('spending').year_month.split('-');
    return hash({
      transaction: this.get('store').findRecord('transaction', params.transaction_id),
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
