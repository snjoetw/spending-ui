import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  primaryKey: 'transactionId',
  attrs: {
    category: 'categoryId',
  },
});
