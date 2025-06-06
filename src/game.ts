import { RectUI, TextUI } from "@engine/ui";
import { Engine, container } from "@engine";

const engine = container.get(Engine);

const renderer = engine.setup("canvas");

renderer.on("beforeRender", ({ fps }) => {
  const debugFPS = new TextUI(`FPS: ${fps.toString()}`, {
    x: 25,
    y: 45,
    color: "white",
    font: "20px Libre Franklin",
  });

  const rect = new RectUI({
    background: "#0E0A0E",
    x: 20,
    y: 25,
    width: 200,
    height: 25,
  });

  renderer.schedule(rect);
  renderer.schedule(debugFPS);
});
