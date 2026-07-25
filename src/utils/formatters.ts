import { CartItem } from '../types';

export const formatVND = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateCartSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

export const calculateCartSavings = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    if (item.product.originalPrice && item.product.originalPrice > item.product.price) {
      return total + (item.product.originalPrice - item.product.price) * item.quantity;
    }
    return total;
  }, 0);
};
