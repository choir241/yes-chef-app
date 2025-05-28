import dotenv from 'dotenv';
import { MongoClient } from "mongodb";

const env = '../.env';

dotenv.config({ path: env });

export const SERVER = {
	SERVER_HOSTNAME: process.env.SERVER_HOSTNAME || 'localhost',
	SERVER_PORT: process.env.PORT || 8000,	
};

export const Client_Connect = async () => {
    try{
    const client: MongoClient = await MongoClient.connect(
        process.env.MONGODB_URI!,
        {
          ssl: true,
          connectTimeoutMS: 30000,
          socketTimeoutMS: 45000,
        }
      );
  
    console.log(`Client database connection was successful at ${SERVER.SERVER_HOSTNAME}:${SERVER.SERVER_PORT}.`);
    return client;

    }catch(err){
        console.error('Failed to connect to Client:', err);
        process.exit(1);
    }
};