import { EntityType } from "@engine";
import { Entity } from "@engine/entities";

export class Player extends Entity {
  public type: EntityType = EntityType.PLAYER;
}
