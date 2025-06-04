import chalk from "chalk";
import * as esbuild from "esbuild";
import { Container, injectable } from "inversify";

// @injectable("Singleton")
// export class Application {
//   rl: Interface;

//   private iron = 0;
//   private gold = 0;
//   private diamond = 0;

//   constructor(
//     @inject(Engine) private engine: Engine,
//     @inject(Player) private player: Player
//   ) {
//     this.rl = createInterface({
//       input: stdin,
//       output: stdout,
//       prompt: `${chalk.red.bgBlack(" Barrel ")} ${chalk.red(">")} `,
//       completer: (line) => {
//         const completions = ["resources", "exit"];
//         const hits = completions.filter((c) => c.startsWith(line));
//         return [hits.length ? hits : completions, line];
//       },
//     });
//   }

//   async start() {
//     this.rl.prompt(true);

//     this.engine.on("tickAfter", (tick) => {
//       if (tick > 5) {
//         if (Math.random() > 0.5) {
//           this.iron++;
//         }
//       }

//       if (tick % 10 == 0) {
//         if (Math.random() > 0.7) {
//           this.diamond++;
//         }
//       }

//       if (tick % 4 == 0) {
//         if (Math.random() > 0.3) {
//           this.gold++;
//         }
//       }
//     });

//     this.rl.on("line", () => {
//       this.rl.prompt(true);
//     });
//   }

//   async stop() {}
// }

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
