var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// server/config/config.ts
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
var env = ".env";
dotenv.config({ path: env });
var SERVER = {
  SERVER_HOSTNAME: process.env.SERVER_HOSTNAME || "localhost",
  SERVER_PORT: process.env.PORT || 8e3
};
var Client_Connect = () => __async(void 0, null, function* () {
  try {
    const client = yield MongoClient.connect(
      process.env.MONGO_URI,
      {
        ssl: true,
        connectTimeoutMS: 3e4,
        socketTimeoutMS: 45e3
      }
    );
    console.log("Client database connection was successful.");
    return client;
  } catch (err) {
    console.error("Failed to connect to Client:", err);
    process.exit(1);
  }
});
export {
  Client_Connect,
  SERVER
};
