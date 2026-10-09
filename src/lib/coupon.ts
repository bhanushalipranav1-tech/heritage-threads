export const COUPON_CODE = "MAYA10";
export const COUPON_PERCENT = 10;

export function isValidCoupon(code: string) {
  return code.trim().toUpperCase() === COUPON_CODE;
}

export function applyCoupon(total: number, code: string) {
  return isValidCoupon(code) ? Math.round(total * (1 - COUPON_PERCENT / 100)) : total;
}
