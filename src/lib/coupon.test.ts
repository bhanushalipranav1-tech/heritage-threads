import { describe, expect, it } from "vitest";
import { applyCoupon } from "./coupon";

describe("coupon", () => {
  it("MAYA10 gives 10% off", () => expect(applyCoupon(1000, "maya10")).toBe(900));
  it("invalid code gives no discount", () => expect(applyCoupon(1000, "NOPE")).toBe(1000));
});
