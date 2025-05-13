import { envs } from "./config/envs";
import { AppRutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async()=>{
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        routes: AppRutes.routes,
    });

    server.start();
    console.log("Server started");
}