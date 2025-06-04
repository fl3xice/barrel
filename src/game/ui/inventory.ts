import { Player } from "@entities";
import { inject, injectable } from "inversify";
import { DIV_INVENTORY_ID, getElement, UIInventorySlot } from "@game/ui";

@injectable("Singleton")
export class UIInventory {
  private elements: HTMLElement[];
  public slots: UIInventorySlot[];

  constructor(@inject(Player) private player: Player) {
    this.elements = this.renderInventory();

    this.slots = this.elements.map((e) => {
      return new UIInventorySlot(e);
    });

    document.addEventListener("DOMContentLoaded", () => {
      this.render();
    });
  }

  renderInventory() {
    const inventoryHTML = getElement(DIV_INVENTORY_ID);

    inventoryHTML.innerHTML = this.player.inventory
      .getItems()
      .map((_i, index) => {
        return `<div class="slot" data-index="${index}"></div>`;
      })
      .join("");

    const elements = Array.from(document.getElementsByClassName("slot"));

    return elements
      .filter((e) => e instanceof HTMLDivElement)
      .filter((e) => e.hasAttribute("data-index"));
  }

  render() {
    this.slots.forEach((slot) => {
      slot.render(true);
    });
  }
}
