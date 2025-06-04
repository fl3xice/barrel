import chalk from "chalk";
import * as esbuild from "esbuild";
import { Container, injectable } from "inversify";

@injectable("Singleton")
export class Application {
  async start() {
    const ctx = await esbuild.context({
      entryPoints: ["src/game/index.ts"],
      bundle: true,
      outdir: "/game",
      platform: "neutral",
    });

    await ctx.serve({
      port: 8005,
      servedir: "game",
      host: "127.0.0.1",
    });

    console.info(`${chalk.bgBlack.red("[◊]")} : http://localhost:8005`);

    await ctx.watch();
    console.info(`${chalk.bgBlack.red("[◊]")} : Watching...`);
  }
}

export const container = new Container({
  autobind: true,
});
