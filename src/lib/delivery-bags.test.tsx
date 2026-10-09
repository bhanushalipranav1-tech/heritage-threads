import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CartProvider, useCart } from "@/lib/cart";
import { deliveryBags, getDeliveryBag } from "@/lib/delivery-bags";

describe("Delivery bag choice", () => {
  it("offers exactly the two supplied bag options", () => {
    expect(deliveryBags.map((bag) => bag.id)).toEqual(["black-mailer", "fabric-drawstring"]);
    expect(getDeliveryBag("unknown")).toBeUndefined();
  });

  it("keeps only one bag choice and resets it when the order is cleared", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    expect(result.current.deliveryBag).toBeNull();
    act(() => result.current.setDeliveryBag("black-mailer"));
    expect(result.current.deliveryBag).toBe("black-mailer");
    act(() => result.current.setDeliveryBag("fabric-drawstring"));
    expect(result.current.deliveryBag).toBe("fabric-drawstring");
    act(() => result.current.clear());
    expect(result.current.deliveryBag).toBeNull();
  });
});