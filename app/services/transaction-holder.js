import Service from '@ember/service';

export default Service.extend({

  transaction: null,

  pop() {
    let transaction = this.get('transaction');
    this.set('transaction', null);
    return transaction;
  },

  hold(transaction) {
    this.set('transaction', transaction);
  },

});
