export * from "./inventory";
export * from "./inventory_slot";
export * from "./selected_item";

export const DIV_INVENTORY_ID = "inventory";
export const _DIV_CONTROLLERS_ID = "controllers";
export const DIV_SELECTED_ITEM_ID = "selected-item-place";

export type ElementID =
  | typeof DIV_INVENTORY_ID
  | typeof DIV_SELECTED_ITEM_ID
  | typeof _DIV_CONTROLLERS_ID;

export function getElement<T extends HTMLElement>(id: ElementID) {
  return document.getElementById(id) as T;
}
