import { RenderLayer, RenderObject } from "@engine/renderer";

export abstract class BaseUI extends RenderObject {
  public layer: RenderLayer = RenderLayer.UI;
}
