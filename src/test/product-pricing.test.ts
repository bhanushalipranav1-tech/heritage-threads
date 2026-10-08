import { describe, expect, it } from "vitest";
import { products } from "@/lib/products";

describe("Mrida product pricing", () => {
  it("keeps every listed product between INR 500 and INR 1000", () => {
    expect(products.length).toBeGreaterThan(0);
    for (const product of products) {
      expect(product.price).toBeGreaterThanOrEqual(500);
      expect(product.price).toBeLessThanOrEqual(1000);
    }
  });
});