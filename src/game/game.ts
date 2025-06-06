import { Container } from "inversify";
import { ItemMaterial } from "@entities";

export const container = new Container({
  autobind: true,
});

// SPRITES

export const createImage = (uri: string) => {
  return () => {
    const image = new Image();
    image.src = uri;
    image.width = 40;
    image.width = 40;
    image.classList.add("pixel-art");

    image.onload = () => {
      hooks.forEach((fn) => {
        fn();
      });
    };

    return image;
  };
};

const hooks: (() => void)[] = [];

export function hookSpriteLoaded(fn: () => void) {
  hooks.push(fn);
}

export const SPRITES: SpriteList = {
  [ItemMaterial.IRON_PICKAXE]: createImage("sprites/iron_pickaxe.png"),
  [ItemMaterial.METAL_ORE]: createImage("sprites/metal_ore.png"),
  [ItemMaterial.COPPER_ORE]: createImage("sprites/copper_ore.png"),
  [ItemMaterial.GOLD_ORE]: createImage("sprites/gold_ore.png"),
  [ItemMaterial.IRON_ORE]: createImage("sprites/iron_ore.png"),
  [ItemMaterial.COPPER_PIECES]: createImage("sprites/copper_pieces.png"),
  [ItemMaterial.GOLD_PIECES]: createImage("sprites/gold_pieces.png"),
  [ItemMaterial.IRON_PIECES]: createImage("sprites/iron_pieces.png"),
  [ItemMaterial.AIR]: createImage("sprites/air.png"),
  [ItemMaterial.CRUSHER_MACHINE]: createImage("sprites/crusher_machine.png"),

  [ItemMaterial.FENCE]: createImage("sprites/animated/fence/fence_item.png"),

  // Tiles
};

export function getSprite(sprite: keyof SpriteList) {
  return SPRITES[sprite]();
}

export type SpriteList = {
  [key in ItemMaterial]: () => HTMLImageElement;
};
