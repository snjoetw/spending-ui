import {helper} from '@ember/component/helper';

export function formatMoney([money, ...rest]) {
  if (!money) return '';

  switch (money.currency) {
    case 'CAD':
    case 'USD':
      return '$' + money.amount.toFixed(2);
    case 'TWD':
      return '$' + money.amount.toFixed(0);
    default:
      return '$' + money.amount.toFixed(2);
  }
}

export default helper(formatMoney);
