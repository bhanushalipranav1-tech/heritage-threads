import blackBagAsset from "@/assets/maya-black-delivery-bag.asset.json";
import drawstringBagAsset from "@/assets/maya-drawstring-delivery-bag.asset.json";

export const deliveryBags = [
  { id: "black-mailer", name: "Black Maya bag", image: blackBagAsset.url },
  { id: "fabric-drawstring", name: "Maya drawstring bag", image: drawstringBagAsset.url },
] as const;

export type DeliveryBagId = (typeof deliveryBags)[number]["id"];

export function getDeliveryBag(id: string | null) {
  return deliveryBags.find((bag) => bag.id === id);
}