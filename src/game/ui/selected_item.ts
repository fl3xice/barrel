import { getSprite } from "@game";
import { Player } from "@entities";
import { inject, injectable } from "inversify";
import { DIV_SELECTED_ITEM_ID, getElement } from "@game/ui";

@injectable("Singleton")
export class UISelectedItem {
  private ref: HTMLElement;

  constructor(@inject(Player) private player: Player) {
    this.ref = getElement<HTMLElement>(DIV_SELECTED_ITEM_ID);
  }

  render() {
    const { selectedSlot, inventory } = this.player;

    this.ref.innerHTML = "";

    if (selectedSlot == null) return;

    const item = inventory.getItems()[selectedSlot];

    if (item != null) {
      const image = getSprite(item.material);
      image.width = 64;
      image.height = 64;
      this.ref.appendChild(image);
    }
  }
}
