import { EntityType } from "@engine";
import { RenderLayer, RenderObject } from "@engine/renderer";

export abstract class Entity extends RenderObject {
  public layer: RenderLayer = RenderLayer.DEFAULT;
  public readonly type: EntityType = EntityType.UNKNOWN;
}
