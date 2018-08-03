import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('transform:money', 'Unit | Transform | money', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let transform = this.owner.lookup('transform:money');
    assert.ok(transform);
  });
});
