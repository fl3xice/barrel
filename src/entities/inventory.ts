import { clone } from "@core/engine";
import { Item, ItemStack } from "@entities";

export class Inventory {
  private items: (Item | null)[] = [];

  /**
   * @param slots limit slots (MAX LIMIT: 4000)
   */
  constructor(public readonly slots: number) {
    for (let i = 0; i <= Math.min(slots, 4000); i++) {
      this.items.push(null);
    }
  }

  public getItems(): (Item | null)[] {
    return this.items;
  }

  public setItem(index: number, item: Item | null): void {
    this.items[Math.min(index, this.slots)] = item;
  }

  /**
   *
   * @param from index slot
   * @param to index slot
   */
  public changePlace(from: number, to: number) {
    const fromIndex = Math.min(from, this.slots);
    const toIndex = Math.min(to, this.slots);

    if (fromIndex === toIndex) return;

    const fromSlotItem = this.items[fromIndex];
    const toSlotItem = this.items[toIndex];

    if (fromSlotItem?.material == toSlotItem?.material) {
      this.changePlaceItemStack(fromIndex, toIndex, fromSlotItem!.count);
    } else {
      this.items[fromIndex] = toSlotItem;
      this.items[toIndex] = fromSlotItem;
    }
  }

  public changePlaceItemStack(from: number, to: number, count: number) {
    const fromIndex = Math.min(from, this.slots);
    const toIndex = Math.min(to, this.slots);

    if (fromIndex === toIndex) return;

    const fromSlotItem = this.items[fromIndex];
    const toSlotItem = this.items[toIndex];

    if (
      fromSlotItem != null &&
      toSlotItem != null &&
      fromSlotItem.material != toSlotItem.material
    ) {
      return;
    }

    if (fromSlotItem instanceof ItemStack) {
      let outItem: Item | null = toSlotItem;

      fromSlotItem.count -= count;

      if (fromSlotItem.count == 0) {
        this.setItem(fromIndex, null);
      }

      if (
        outItem instanceof Item &&
        outItem.material == fromSlotItem.material
      ) {
        outItem.count += count;
      } else {
        outItem = clone(fromSlotItem);
        outItem.count = count;
      }

      this.setItem(toIndex, outItem);
    }
  }
}
