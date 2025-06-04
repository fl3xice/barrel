export enum ItemMaterial {
  // Ore
  METAL_ORE = "METAL_ORE",
  COPPER_ORE = "COPPER_ORE",
  GOLD_ORE = "GOLD_ORE",
  IRON_ORE = "IRON_ORE",

  // Pieces
  COPPER_PIECES = "COPPER_PIECES",
  GOLD_PIECES = "GOLD_PIECES",
  IRON_PIECES = "IRON_PIECES",

  // TOOLS
  IRON_PICKAXE = "IRON_PICKAXE",

  // Misc
  CRUSHER_MACHINE = "CRUSHER_MACHINE",
  FENCE = "FENCE",
  AIR = "AIR",
}

export abstract class ItemStack {
  private _count: number = 1;
  public readonly maxStack: number = 16;

  set count(value: number) {
    this._count = Math.min(value, this.maxStack);
  }

  get count() {
    return this._count;
  }
}

export abstract class Item extends ItemStack {
  public readonly material: ItemMaterial = ItemMaterial.AIR;
  public readonly description: string = "No description";
}

export abstract class ItemTool extends Item {
  public maxStack: number = 1;
  public durability: number = 1;
}

export class ItemIronOre extends Item {
  public material: ItemMaterial = ItemMaterial.IRON_ORE;
}

export class ItemIronPieces extends Item {
  public material: ItemMaterial = ItemMaterial.IRON_PIECES;
  public maxStack: number = 120;
}

export class ItemMetalOre extends Item {
  public material: ItemMaterial = ItemMaterial.METAL_ORE;
}

export class ItemCopperOre extends Item {
  public material: ItemMaterial = ItemMaterial.COPPER_ORE;
}

export class ItemCopperPieces extends Item {
  public material: ItemMaterial = ItemMaterial.COPPER_PIECES;
}

export class ItemGoldPieces extends Item {
  public material: ItemMaterial = ItemMaterial.GOLD_PIECES;
}

export class ItemGoldOre extends Item {
  public material: ItemMaterial = ItemMaterial.GOLD_ORE;
}

// TOOLS

export class ItemIronPickaxe extends ItemTool {
  public material: ItemMaterial = ItemMaterial.IRON_PICKAXE;
}

export class ItemCrusherMachine extends ItemTool {
  public material: ItemMaterial = ItemMaterial.CRUSHER_MACHINE;

  public readonly allowedMaterials: ItemMaterial[] = [
    ItemMaterial.METAL_ORE,
    ItemMaterial.GOLD_ORE,
    ItemMaterial.IRON_ORE,
    ItemMaterial.COPPER_ORE,
  ];
}

export class ItemFence extends ItemTool {
  public material: ItemMaterial = ItemMaterial.FENCE;
}

export class ItemAir extends ItemTool {}

export class ItemFactory {
  static create(material: ItemMaterial): Item {
    switch (material) {
      case ItemMaterial.AIR:
        return new ItemAir();
      case ItemMaterial.CRUSHER_MACHINE:
        return new ItemCrusherMachine();
      case ItemMaterial.GOLD_ORE:
        return new ItemGoldOre();
      case ItemMaterial.GOLD_PIECES:
        return new ItemGoldPieces();
      case ItemMaterial.COPPER_PIECES:
        return new ItemCopperPieces();
      case ItemMaterial.COPPER_ORE:
        return new ItemCopperOre();
      case ItemMaterial.METAL_ORE:
        return new ItemMetalOre();
      case ItemMaterial.IRON_PICKAXE:
        return new ItemIronPickaxe();
      case ItemMaterial.IRON_ORE:
        return new ItemIronOre();
      case ItemMaterial.IRON_PIECES:
        return new ItemIronPieces();
      case ItemMaterial.FENCE:
        return new ItemFence();
    }
  }

  static createWithCount(material: ItemMaterial, count: number = 1): Item {
    const temp = ItemFactory.create(material);
    temp.count = count;
    return temp;
  }
}
