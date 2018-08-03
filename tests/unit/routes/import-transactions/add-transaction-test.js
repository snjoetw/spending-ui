import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | import-transactions/add-transaction', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:import-transactions/add-transaction');
    assert.ok(route);
  });
});
