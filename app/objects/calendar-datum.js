import EmberObject, {computed} from '@ember/object';
import moment from 'moment';

export default EmberObject.extend({
  year: null,
  month: null,

  days: computed('moment', function() {
    let now = moment();
    return [{
      name: 'Sun',
      isToday: now.day() === 0
    }, {
      name: 'Mon',
      isToday: now.day() === 1
    }, {
      name: 'Tue',
      isToday: now.day() === 2
    }, {
      name: 'Wed',
      isToday: now.day() === 3
    }, {
      name: 'Thu',
      isToday: now.day() === 4
    }, {
      name: 'Fri',
      isToday: now.day() === 5
    }, {
      name: 'Sat',
      isToday: now.day() === 6
    }];
  }),

  moment: computed('year', 'month', function() {
    return moment({
      'year': this.get('year'),
      'month': this.get('month') - 1,
    }).local();
  }),

  weeks: computed('moment', function() {
    let yearMonth = this.get('moment'),
      startOfMonth = yearMonth.clone().startOf('month'),
      endOfMonth = yearMonth.clone().endOf('month'),
      start = startOfMonth.clone().startOf('week'),
      end = endOfMonth.clone().endOf('week'),
      weeks = [],
      now = moment();

    for (let current = start; current.isBefore(end); current.add(1, 'days')) {
      if (current.day() === 0) {
        weeks.push([]);
      }

      let week = weeks[weeks.length - 1];
      week.push({
        isToday: current.isSame(now, 'day'),
        date: current.clone(),
        isCurrentMonth: current.isSame(yearMonth, 'month'),
        isWeekend: current.day() === 0 || current.day() === 6,
      });
    }

    return weeks;
  }),

  numberOfWeeks: computed('weeks', function() {
    return this.get('weeks').length;
  })

});
