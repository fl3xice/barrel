import { createImage } from "@game";

export enum TileTypes {
  GRASS,
  STONE,
}

export const TileSet: {
  [key in TileTypes]: HTMLImageElement;
} = {
  [TileTypes.GRASS]: createImage("sprites/tiles/grass_tile.png")(),
  [TileTypes.STONE]: createImage("sprites/tiles/stone_tile.png")(),
};
