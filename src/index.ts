import "reflect-metadata";
import { Application, container } from "@app";

const application = container.get(Application);

application
  .start()
  .then(() => {})
  .catch((err) => {
    console.error(err);
  });
