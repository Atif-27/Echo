import { initServer } from "./app";

export async function startServer() {
  const app = await initServer();
  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
  });
}

startServer();
