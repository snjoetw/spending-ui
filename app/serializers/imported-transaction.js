import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  primaryKey: 'importedTransactionId',
  attrs: {
    category: 'categoryId',
  },
});
