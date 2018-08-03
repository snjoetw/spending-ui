import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | spending', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:spending');
    assert.ok(route);
  });
});
