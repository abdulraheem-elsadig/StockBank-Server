import http from "http";
import { app } from "./app";
import { AppDataSource } from "./data-source";
import AdminJS from "adminjs";
import { options, buildAdminRouter } from "./admin.config";

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

async function startServer() {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  const admin = new AdminJS(options);

  const adminRouter = buildAdminRouter(admin);
  app.use(admin.options.rootPath, adminRouter);
  app.listen(PORT, () => {
    console.log(`🎧 listening on port ${PORT} ✅`);
  });
}

startServer();
