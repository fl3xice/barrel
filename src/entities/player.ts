import { injectable } from "inversify";
import { Inventory, ItemFactory, ItemMaterial } from "@entities";

@injectable("Singleton")
export class Player {
  public readonly inventory: Inventory;

  private _selectedSlot: number | null = null;

  constructor() {
    this.inventory = new Inventory(23);
    this.inventory.setItem(0, ItemFactory.create(ItemMaterial.IRON_PICKAXE));
  }

  set selectedSlot(index: number) {
    this._selectedSlot = Math.min(index, this.inventory.slots);
  }

  get selectedSlot(): number | null {
    return this._selectedSlot;
  }
}
