import { AppLogger } from "./models/Logger";
import { ServerSocket } from "./models/serverSocket";

const run = async () => {
  const serverSocekt = new ServerSocket();
  serverSocekt.listen();
};

run().catch((err) => {
  AppLogger.getLogger().error(err.message);
});
