import mongoose from "mongoose";
import {Server} from 'http'
import { envVars } from "./app/config";
import { app } from "./app";


let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("conneced successful to DB");

    // listening
    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening on ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();


// unhandle rejection 
process.on("unhandledRejection", () => {
  if(server) {
    server.close(() => {
      process.exit(1);
    });
  };
  process.exit(1)
});

// uncaught acception
process.on("uncaughtException", () => {
    if(server) {
      server.close(() => {
        process.exit(1);
      });
    };
    process.exit(1);
});

// sigterm 
process.on("SIGTERM", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  };
  process.exit(1);
});