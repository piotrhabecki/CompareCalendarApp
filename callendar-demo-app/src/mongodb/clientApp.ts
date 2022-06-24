import { MongoClient } from "mongodb";


const mongoClient = async () => {

    const clientCredentials = {
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
        cluster: process.env.MONGODB_CLUSTER,
        database: process.env.MONGODB_DATABASE,
        config: process.env.MONGODB_CONFIG,
    }

  const client = await MongoClient.connect(
    `mongodb+srv://${clientCredentials.username}:${clientCredentials.password}@${clientCredentials.cluster}/${clientCredentials.database}${clientCredentials.config}`
  );

  return client;
};

export default mongoClient;