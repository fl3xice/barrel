import { Player } from "@entities";
import { container, getSprite } from "@game";
import { UIInventory, UISelectedItem } from "@game/ui";

export const NAME_ATTR_COUNT = "data-count";

export class UIInventorySlot {
  public readonly index: number;
  public draggable: boolean = false;
  private player: Player;

  constructor(private ref: HTMLElement) {
    this.index = Number(ref.getAttribute("data-index"));

    this.player = container.get(Player);

    ref.addEventListener("click", (ev) => this.click(ev));
    ref.addEventListener("dragstart", (ev) => this.dragStart(ev));
    ref.addEventListener("dragover", (ev) => this.dragOver(ev));
    ref.addEventListener("dragleave", (ev) => this.dragLeave(ev));
    ref.addEventListener("drop", (ev) => this.drop(ev));
  }

  private click(ev: MouseEvent) {
    ev.preventDefault();

    if (this.player.selectedSlot == this.index) return;

    let slot: UIInventorySlot | undefined;

    if (this.player.selectedSlot != null) {
      slot = container
        .get(UIInventory)
        .slots.find((slot) => slot.index == this.player.selectedSlot);
    }

    this.player.selectedSlot = this.index;

    // Update selected item place
    container.get(UISelectedItem).render();

    this.render();
    slot?.render();
  }

  private dragStart(ev: DragEvent) {
    if (ev instanceof DragEvent) {
      const item = this.player.inventory.getItems()[this.index];

      if (item) {
        const previewSprite = getSprite(item.material);
        previewSprite.width = 40;
        previewSprite.height = 40;
        ev.dataTransfer?.setDragImage(previewSprite, 10, 10);
      }

      ev.dataTransfer?.setData(
        "application/json",
        JSON.stringify({
          index: this.index,
        })
      );
    }
  }

  private dragOver(ev: DragEvent) {
    ev.preventDefault();
    (ev.target as HTMLElement).classList.remove("slot-drag-over");
  }

  private dragLeave(ev: DragEvent) {
    ev.preventDefault();
    (ev.target as HTMLElement).classList.remove("slot-drag-over");
  }

  private drop(ev: DragEvent) {
    ev.preventDefault();
    const data = ev.dataTransfer?.getData("application/json");
    if (data != null) {
      const resultData = JSON.parse(data) as { index: number };
      const toIndex = Number(
        (ev.target as HTMLElement).getAttribute("data-index")
      );

      if (ev.shiftKey) {
        this.player.inventory.changePlaceItemStack(
          resultData.index,
          toIndex,
          1
        );
      } else if (ev.ctrlKey) {
        const itemCount =
          this.player.inventory.getItems()[resultData.index]?.count;

        if (itemCount != undefined) {
          let count = Math.floor(itemCount / 2);

          if (count == 0) {
            count = 1;
          }

          this.player.inventory.changePlaceItemStack(
            resultData.index,
            toIndex,
            count
          );
        }
      } else {
        this.player.inventory.changePlace(resultData.index, toIndex);
      }

      const slot = container
        .get(UIInventory)
        .slots.find((s) => s.index == resultData.index);

      // Update selected item place
      container.get(UISelectedItem).render();

      slot?.render(true);
      this.render(true);
    }

    (ev.target as HTMLElement).classList.remove("slot-drag-over");
  }

  get item() {
    return this.player.inventory.getItems()[this.index];
  }

  render(updateSprite: boolean = false) {
    if (this.player.selectedSlot == this.index) {
      this.ref.classList.add("slot-selected");
    } else {
      this.ref.classList.remove("slot-selected");
    }

    this.draggable = this.item != null;
    this.ref.draggable = this.draggable;

    if (this.item && this.item.count > 1) {
      this.ref.classList.add("count");
      this.ref.setAttribute(NAME_ATTR_COUNT, this.item.count.toString());
    } else {
      this.ref.classList.remove("count");
      this.ref.removeAttribute(NAME_ATTR_COUNT);
    }

    if (updateSprite) {
      this.ref.innerHTML = "";

      if (this.item) {
        this.ref.appendChild(getSprite(this.item.material));
      }
    }
  }
}
