import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', {path: '/'});
  this.route('spending', {path: '/:year_month'}, function() {
    this.route('edit-transaction', {path: '/transactions/:transaction_id'});
    this.route('add-transaction', {path: '/transactions/create'});
  });
  this.route('import-transactions', {path: '/transactions/import'}, function() {
    this.route('add-transaction', {path: '/:imported_transaction_id'});
  });
});

export default Router;
