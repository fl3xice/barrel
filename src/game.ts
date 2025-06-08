import { TextUI } from "@engine/ui";
import { Engine, container } from "@engine";

const engine = container.get(Engine);
const renderer = engine.setup("canvas");

renderer.on("beforeRender", ({ fps, alpha }) => {
  const debugFPS = new TextUI(`FPS: ${fps.toString()}`, {
    x: 25,
    y: 45,
    color: "white",
    font: "20px Libre Franklin",
  });

  const alphaUI = new TextUI(`Interpolation: ${alpha.toString()}`, {
    x: 25,
    y: 80,
    color: "white",
    font: "20px Libre Franklin",
  });

  renderer.schedule(debugFPS);
  renderer.schedule(alphaUI);
});
